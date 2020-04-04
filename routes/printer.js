import Printer, { printClientFactory } from "../modules/printer";
var express = require("express");
var router = express.Router();
const axios = require("axios");

let getPrintClient = (req) =>
  printClientFactory(req.session.access_token, req.session.refresh_token);

/* GET users listing. */
router.get("/", function (req, res, next) {
  const redirect_uri = "http%3A%2F%2Flocalhost%3A3000%2Fprinter%2Faccess";
  const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloudprint&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${redirect_uri}&client_id=490603597473-929r9nb463lub02oshjerlt80qsqocdl.apps.googleusercontent.com`;
  res.redirect(url);
});

router.get("/access", async (req, res, next) => {
  // res.send(req.query.code);
  let result = "...";
  res.send(req.query.code);
  return;
  try {
    const { data } = await axios({
      url: "https://www.googleapis.com/oauth2/v3/token",
      method: "post",
      data: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: "http://localhost:3000/printer/access",
        grant_type: "authorization_code",
        code: req.query.code,
      },
    });
    result = data;
    req.session.code = req.query.code;
    req.session.access_token = result.access_token;
    req.session.refresh_token = result.refresh_token;
    console.log(result.access_token, result.refresh_token);
    res.redirect("/printer/print/sp");
  } catch (error) {
    result = error;
    console.log(error);
    res.send(result);
  }
  // res.send("result");
});

//프린터 목록 보이기
router.get("/list", async (req, res, next) => {
  isNull(req);
  Printer.getPrinters(getPrintClient(req), (printers) => {
    res.send(JSON.stringify(printers));
  });
  // res.send("Your request has been sent!");
});

router.get("/print/test", function (req, res, next) {
  Printer.printDefault(getPrintClient(req));
  res.send("Your request has been sent!");
});

router.get("/print/sp", async (req, res, next) => {
  console.log("Your request has been sent!");
  Printer.print(getPrintClient(req));
  res.send("data");
});

router.get("/jobs", (req, res, next) => {
  Printer.getQueuedJobs(getPrintClient(req), (data) => {
    res.send(data);
  });
});

module.exports = router;

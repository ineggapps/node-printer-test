import { printDefault, printText } from "../modules/printer";
var express = require("express");
var router = express.Router();
/* GET users listing. */
// router.get("/", function (req, res, next) {
//   const redirect_uri = "http%3A%2F%2Flocalhost%3A3000%2Fprinter%2Faccess";
//   const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloudprint&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${redirect_uri}&client_id=490603597473-929r9nb463lub02oshjerlt80qsqocdl.apps.googleusercontent.com`;
//   res.redirect(url);
// });

// router.get("/access", function (req, res, next) {
//   res.send(req.body);
// });

// router.get("/token", function (req, res, next) {
//   res.send(req.body);
// });

//프린터 목록 보이기
router.get("/list", function (req, res, next) {
  printClient.getPrinters().then(function (printers) {
    console.log(printers);
  });
});

router.get("/print/test", function (req, res, next) {
  printDefault();
  res.send("Your request has been sent!");
});

router.get("/print/text", async (req, res, next) => {
  printText();
  res.send("Your request has been sent!");
});

module.exports = router;

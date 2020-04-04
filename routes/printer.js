require("dotenv").config();
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

router.get("/print", function (req, res, next) {
  const code = process.env.CODE;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  var CloudPrint = require("node-gcp");
  var printClient = new CloudPrint({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    refreshToken: process.env.REFRESH_TOKEN,
  });

  printClient.getPrinters().then(function (printers) {
    console.log(printers);
  });
  printClient.print(process.env.MY_PRINTER1, "print me! " + new Date(), "text/plain");
  res.send("done!");
});
module.exports = router;

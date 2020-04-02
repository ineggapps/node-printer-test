var express = require("express");
var router = express.Router();
var printer = require("../lib");
var util = require("util");

/* GET users listing. */
router.get("/", function(req, res, next) {
  const content =
    "installed printers:\n" + util.inspect(printer.getPrinters(), { colors: true, depth: 10 });
  res.send(content);
});

module.exports = router;

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index", { title: "Express" });
  req.method = "get";
  res.redirect("/printer");
});

module.exports = router;

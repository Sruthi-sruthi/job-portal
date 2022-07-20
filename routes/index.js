var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "node", name: "sruthi", marks: { cs: 96 } });
});
// router.get("/login", function (req, res) {
//   res.render("login", { companyname: "zion it" });
// });
router.get("/signup", function (req, res) {
  res.render("viewers/signup", { name: "sruthi" });
});
router.get("/login", function (req, res) {
  res.render("viewers/login", { name: "sruthi" });
});
router.get("/profile", function (req, res) {
  res.render("viewers/user-profile", { name: "sruthi" });
});

module.exports = router;

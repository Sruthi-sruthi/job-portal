var express = require("express");
var router = express.Router();

let {
  getSignupPage,
  getLoginPage,
  getHomePage,
  createCompany,
  getProfilePage,
  addJobPage,
  getUpdatePage,
  doLogin,
  addjob,
  companyHomePage,
} = require("../controllers/company-controller");
const checkCompany = require("../middlewares/check-company");
// const { doLogin } = require("../controllers/user-controller");

/* GET users listing. */
router.get("/", getHomePage);

router.get("/compsignup", getSignupPage);

router.post("/compsignup", createCompany);

router.get("/complogin", getLoginPage);

router.post("/complogin", doLogin);

router.get("/compprofile", getProfilePage);

router.get("/addjob", checkCompany, addJobPage);
router.post("/addjob", checkCompany, addjob);

router.get("/updatecompany", getUpdatePage);

router.get("/companyhome", checkCompany, companyHomePage);

module.exports = router;

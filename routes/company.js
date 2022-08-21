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
  updateCompanyPage,
  jobApplicationPage,
  viewJob,
  acceptjob,
} = require("../controllers/company-controller");
const checkCompany = require("../middlewares/check-company");
// const { doLogin } = require("../controllers/user-controller");

/* GET users listing. */
router.get("/", getHomePage);

router.get("/compsignup", getSignupPage);

router.post("/compsignup", createCompany);

router.get("/complogin", getLoginPage);

router.post("/complogin", doLogin);

router.get("/compprofile", checkCompany, getProfilePage);

router.get("/addjob", checkCompany, addJobPage);
router.post("/addjob", checkCompany, addjob);

router.get("/updatecompany", checkCompany, getUpdatePage);
router.post("/updatecompany", updateCompanyPage);

router.get("/companyhome", checkCompany, companyHomePage);

router.get("/jobapplications", checkCompany, jobApplicationPage);

router.get("/viewjob", checkCompany, viewJob);

router.get("/acceptjob/:id", acceptjob);

module.exports = router;

var express = require("express");
var router = express.Router();

let {
  getHomePage,
  getSignupPage,
  createUser,
  userLoginPage,
  userProfilepage,
  userUpdatePage,
  doLogin,
  userHomePage,
  viewJobsPage,
  updateUserPage,
  applyJob,
  jobApplicationPage,
} = require("../controllers/user-controller");
const checkUser = require("../middlewares/check-user");

/* GET home page. */
router.get("/", getHomePage);
// router.get("/login", function (req, res) {
//   res.render("login", { companyname: "zion it" });
// });

// router.get("/signup", getSignupPage);

// router.post("/signup", createUser);

router.route("/signup").get(getSignupPage).post(createUser);

router.route("/login").get(userLoginPage).post(doLogin);

router.get("/profile", checkUser, userProfilepage);

router.get("/update", checkUser, userUpdatePage);
router.post("/update", updateUserPage);

router.get("/home", checkUser, userHomePage);

router.get("/viewjobs", checkUser, viewJobsPage);

router.post("/applyjob", applyJob);

router.get("/jobapplications", checkUser, jobApplicationPage);

module.exports = router;

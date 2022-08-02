const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const JobModel = require("../models/job-model");
const jobModel = require("../models/job-model");
const userModel = require("../models/user-model");
const createUser = async function (req, res) {
  const hash = await bcrypt.hash(req.body.password, 10);
  req.body.password = hash;
  console.log(req.body);
  await UserModel.create(req.body);
  res.send("hi");
};

const getHomePage = function (req, res, next) {
  res.render("index", { title: "node", name: "sruthi", marks: { cs: 96 } });
};

const getSignupPage = function (req, res) {
  res.render("viewers/signup", { name: "sruthi" });
};

const userLoginPage = function (req, res) {
  if (req.session.errormsg) {
    console.log(req.session.errormsg);
  }
  res.render("viewers/login", {
    name: "sruthi",
    errormsg: req.session.errormsg,
  });
  req.session.errormsg = false;
};
const doLogin = async function (req, res) {
  console.log(req.body);
  let user = await UserModel.findOne({ email: req.body.email });
  console.log(user);
  if (user) {
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(validPassword);
    if (validPassword) {
      req.session.user = user;
      // res.send("successfully login");
      res.redirect("/home");
    } else {
      req.session.errormsg = "invalid password";
      res.redirect("/login");
    }
    // res.send("login failed");
  } else {
    req.session.errormsg = "invalid email";
    res.redirect("/login");
  }
};

const userProfilepage = function (req, res) {
  console.log(req.session.user);
  res.render("viewers/user-profile", { name: "sruthi" });
};

const userUpdatePage = async function (req, res) {
  console.log(req.session.user);
  res.render("viewers/user-update");
};

const userHomePage = function (req, res) {
  console.log(req.session.user.user);
  res.render("viewers/home");
};

const viewJobsPage = async function (req, res) {
  let allJobs = await jobModel.find({});
  console.log(allJobs);
  res.render("viewers/view-jobs", { allJobs });
};

module.exports = {
  getHomePage,
  getSignupPage,
  createUser,
  userLoginPage,
  userProfilepage,
  userUpdatePage,
  doLogin,
  userHomePage,
  viewJobsPage,
};

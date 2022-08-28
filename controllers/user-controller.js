const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const JobModel = require("../models/job-model");
const JobApplication = require("../models/jobapplication-model");
const jobapplicationModel = require("../models/jobapplication-model");

const createUser = async function (req, res) {
  const hash = await bcrypt.hash(req.body.password, 10);
  req.body.password = hash;
  console.log(req.body);
  await UserModel.create(req.body);
  // res.send("hi");
  res.redirect("/login");
};

const getHomePage = function (req, res, next) {
  res.render("index", { title: "node", name: "sruthi", marks: { cs: 96 } });
};

const getSignupPage = function (req, res) {
  res.render("users/signup", { name: "sruthi" });
};

const userLoginPage = function (req, res) {
  if (req.session.errormsg) {
    console.log(req.session.errormsg);
  }
  res.render("users/login", {
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
  res.render("users/user-profile", { user: req.session.user });
};

const userUpdatePage = function (req, res) {
  console.log(req.session.user);
  res.render("users/user-update", { user: req.session.user });
};

const updateUserPage = async function (req, res) {
  console.log(req.body);
  console.log(req.files);
  let { _id } = req.session.user;
  let { resume, image } = req.files;
  await image.mv("./public/images/user/profile/" + _id + ".jpg");
  await resume.mv("./public/images/user/resume/" + _id + ".pdf");
  req.body.additionalInfo = true;
  let user = await UserModel.findOneAndUpdate(
    { _id: req.session.user._id },
    req.body,
    { new: true }
  );
  console.log(user);
  req.session.user = user;
  // req.session.user._id = user._conditions._id;
  console.log(req.session.user);
  // console.log(user._update);
  // req.session.user = user._id;
  res.redirect("/profile");
};

const userHomePage = function (req, res) {
  console.log(req.session.user.user);
  res.render("users/home");
};

const viewJobsPage = async function (req, res) {
  let allJobs = await JobModel.find({});
  console.log(allJobs);
  res.render("users/view-jobs", { allJobs });
};

const applyJob = async function (req, res) {
  console.log(req.body);
  let d = new Date().toLocaleString();
  console.log(d);
  console.log(req.session.user);
  let { jobId, companyName, companyId } = req.body;
  let { _id, username, email, number } = req.session.user;
  let applicationobj = await jobapplicationModel.create({
    jobId: jobId,
    userId: _id,
    username: username,
    email: email,
    number: number,
    companyId,
    companyName,
    applyDate: d,
  });
  console.log(applicationobj);
  res.render("users/home");
};

const jobApplicationPage = async function (req, res) {
  let jobapplications = await jobapplicationModel.find({
    userId: req.session.user._id,
  });
  console.log(jobapplications);
  res.render("users/viewjobapplications", { jobapplications });
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
  updateUserPage,
  applyJob,
  jobApplicationPage,
};

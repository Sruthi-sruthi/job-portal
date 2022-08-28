const CompanyModel = require("../models/company-model");
const JobModel = require("../models/job-model");
const bcrypt = require("bcrypt");
const jobModel = require("../models/job-model");
const jobapplicationModel = require("../models/jobapplication-model");
// const companyModel = require("../models/company-model");

const createCompany = async function (req, res) {
  const hash = await bcrypt.hash(req.body.password, 10);
  req.body.password = hash;
  console.log(req.body);
  await CompanyModel.create(req.body);
  // res.send("hi");
  res.redirect("/company/complogin");
};

const getHomePage = function (req, res, next) {
  res.send("respond with a resource");
};

const getSignupPage = function (req, res) {
  res.render("company/company-signup");
};

const getLoginPage = function (req, res) {
  if (req.session.errormsg) {
    console.log(req.session.errormsg);
  }
  res.render("company/company-login", {
    name: "sruthi",
    errormsg: req.session.errormsg,
  });
  req.session.errormsg = false;
};

const doLogin = async function (req, res) {
  console.log(req.body);
  let company = await CompanyModel.findOne({ email: req.body.email });
  console.log(company);
  if (company) {
    let validPassword = await bcrypt.compare(
      req.body.password,
      company.password
    );
    console.log(validPassword);
    if (validPassword) {
      req.session.company = company;
      // res.send("successfully login");
      res.redirect("/company/companyhome");
    } else {
      req.session.errormsg = "invalid password";
      res.redirect("/company/complogin");
    }
    // res.send("login failed");
  } else {
    req.session.errormsg = "invalid email";
    res.redirect("/company/complogin");
  }
};

const getProfilePage = function (req, res) {
  console.log(req.session.company);
  res.render("company/company-profile", { company: req.session.company });
};

const addJobPage = function (req, res) {
  res.render("company/add-job-form");
};

const addjob = async function (req, res) {
  console.log(req.body);
  req.body.companyName = req.session.company.companyname;
  req.body.companyId = req.session.company._id;
  await JobModel.create(req.body);
  // res.send("hy");
  res.redirect("/company/companyhome");
};

const getUpdatePage = function (req, res) {
  console.log(req.session.company);
  res.render("company/update-company-page", { company: req.session.company });
};

const updateCompanyPage = async function (req, res) {
  console.log(req.body);
  console.log(req.files);
  let { _id } = req.session.company;
  let { image } = req.files;
  await image.mv("./public/images/company/profile/" + _id + ".jpg");
  req.body.additionalInfo = true;
  let company = await CompanyModel.findOneAndUpdate(
    { _id: req.session.company._id },
    req.body,
    { new: true }
  );
  console.log(company);
  req.session.company = company;
  console.log(req.session.company);
  res.redirect("/company/compprofile");
};

const companyHomePage = function (req, res) {
  console.log(req.session.company.company);
  res.render("company/companyhome");
};

const jobApplicationPage = async function (req, res) {
  let { _id } = req.session.company;
  let jobapplications = await jobapplicationModel.find({
    companyId: _id,
    status: "applied",
  });
  console.log(jobapplications);
  res.render("company/job-applications", { jobapplications });
};

const acceptedapplications = async function (req, res) {
  let { _id } = req.session.company;
  let jobapplications = await jobapplicationModel.find({
    companyId: _id,
    status: "accepted",
  });
  console.log(jobapplications);
  res.render("company/acceptedapplications", { jobapplications });
};

const viewJob = async function (req, res) {
  let { _id } = req.session.company;
  let allJobs = await jobModel.find({
    companyId: _id,
  });
  console.log(allJobs);
  res.render("company/view-jobs", { allJobs });
};

const acceptjob = async function (req, res) {
  console.log("hy");
  await jobapplicationModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: "accepted" }
  );
  res.redirect("/company/jobapplications");
};

const rejectjob = async function (req, res) {
  console.log("hy");
  await jobapplicationModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: "rejected" }
  );
  res.redirect("/company/jobapplications");
};

module.exports = {
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
  rejectjob,
  acceptedapplications,
};

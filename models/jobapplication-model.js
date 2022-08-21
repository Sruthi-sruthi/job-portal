const mongoose = require("mongoose");
const JobApplication = mongoose.Schema({
  companyId: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
  companyName: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
  jobId: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
  applyDate: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
    default: "applied",
  },
  email: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
  number: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("jobapplication", JobApplication);

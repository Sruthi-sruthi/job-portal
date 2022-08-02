const mongoose = require("mongoose");
const JobSchema = mongoose.Schema({
  jobtitle: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
  vaccancy: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
  area: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
  publisheddate: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
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
  status: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
    default: "active",
  },
  salary: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("job", JobSchema);

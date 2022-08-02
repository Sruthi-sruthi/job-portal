const mongoose = require("mongoose");
const CompanySchema = mongoose.Schema({
  companyname: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    maxLength: 100,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    maxLength: 100,
    required: true,
    trim: true,
  },
  number: {
    type: String,
    maxLength: 100,
    required: true,
    trim: true,
  },
  personname: {
    type: String,
    maxLength: 100,
    required: true,
    trim: true,
  },
  industryType: {
    type: String,
    maxLength: 100,
    // required: true,
    // trim: true,
  },
});

module.exports = mongoose.model("company", CompanySchema);

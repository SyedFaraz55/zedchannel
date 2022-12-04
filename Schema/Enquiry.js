const mongoose = require('mongoose');

const EnquirySchema = mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  message:{
    type:String
  }
});

const Enquiry = mongoose.model('enquiry', EnquirySchema);
module.exports = Enquiry;

const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
  name: {
    type: String,
  },
  designation:{
    type:String
  },
  contact:{
    type:String
  },
  image:{
    type:String
  }
});

const Team = mongoose.model('team', TeamSchema);
module.exports = Team;

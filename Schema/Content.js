const mongoose = require('mongoose');

const VideosSchema = mongoose.Schema({
  name: {
    type: String,
  },
  link: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  category:{
    type:String
  }
});

const Videos = mongoose.model('videos', VideosSchema);
module.exports = Videos;

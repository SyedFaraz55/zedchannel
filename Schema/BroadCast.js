const mongoose = require("mongoose")

const BroadcastSchema = mongoose.Schema({
  link: {
    type: String,
  },
});

const BroadCast = mongoose.model('live', BroadcastSchema);
module.exports = BroadCast

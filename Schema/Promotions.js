const mongoose = require('mongoose');

const PromotionSchema = mongoose.Schema({
  link:{
    type:String
  }
});

const promo = mongoose.model('promotion', PromotionSchema);
module.exports = promo;

const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
}, {
    methods: {
        findSimilarTypes(cb) {
            return mongoose.model('Animal').find({ type: this.type }, cb);
        }
    },
    query:{
        byName(name) {
            return this.find({ name: name });
        }
    }
})

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
const { Schema, default: mongoose, get } = require("mongoose"); 


// define a schema
const personSchema = new Schema({
    name: {
      first: String,
      last: String,
    },
    email:{
        type:String, 
        set: v => v.toLowerCase(),
        get: obfuscate,
    }
  });
  

  // Mongoose passes the raw value in MongoDB `email` to the getter
function obfuscate(email) {
    const separatorIndex = email.indexOf('@');
    if (separatorIndex < 3) {
      // 'ab@gmail.com' -> '**@gmail.com'
      return email.slice(0, separatorIndex).replace(/./g, '*') +
        email.slice(separatorIndex);
    }
    // 'test42@gmail.com' -> 'te****@gmail.com'
    return email.slice(0, 2) +
      email.slice(2, separatorIndex).replace(/./g, '*') +
      email.slice(separatorIndex);
  }

  const Person = mongoose.model('Person', personSchema);


 
personSchema.virtual('fullName').get(function(){
    return this.name.first + ' ' + this.name.last;
}).set(function(value){
    this.name.first = `${value} - ${this.name.first}`
    this.name.last =this.name.last
})
module.exports = Person;
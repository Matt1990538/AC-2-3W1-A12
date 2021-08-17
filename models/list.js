const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String, 
    required: true 
  },
    category: {
    type: String, 
    required: true 
  },
    address: {
    type: String, 
    required: true 
  },
    telephone: {
    type: String, 
    required: true 
  },
    intro: {
    type: String, 
    required: true 
  },
    photo: {
    type: String, 
    required: true 
  }
})
module.exports = mongoose.model('list', todoSchema)
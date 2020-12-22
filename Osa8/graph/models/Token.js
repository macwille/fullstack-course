const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    value: String,
    required: true,
  }
})

module.exports = mongoose.model('Token', schema)
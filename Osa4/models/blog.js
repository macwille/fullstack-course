const mongoose = require('mongoose')
const config = require('./utils/config.js')



const blogSchema = mongoose.Schema({
   title: String,
   author: String,
   url: String,
   likes: Number
 })
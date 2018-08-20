const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itemSchema = new Schema({
  name: String,
  price: Number,
  stock: Number,
  tags: [String]
}, {
  timestamps: true
})

let Item = mongoose.model('Item', itemSchema)
module.exports = Item
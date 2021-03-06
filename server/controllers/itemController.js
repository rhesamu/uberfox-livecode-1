const Item = require('../models/Item')
const jwt = require('jsonwebtoken')

const create = function(req, res) {
  const { name, price, stock, tags } = req.body
  const token = req.headers.token
  let user
  if(token) {
    try {
      let decoded = jwt.verify(token, process.env.JWT_KEY)
      user = decoded._id
    } catch (error) {
      return res.status(400).json({
        error: "Invalid token"
      })
    }
  } else {
    return res.status(400).json({
      error: "You are not authorized to access this API"
    })
  }

  Item.create({ name, price, stock, tags })
  .then(item => {
    console.log('new item', item)
    res.status(201).json({
      _id: item._id,
      name: item.name,
      price: item.price,
      stock: item.stock,
      tags: item.tags,
      user: user
    })
  })
  .catch(err => {
    console.log('create item error', err)
    res.status(400).json({
      error: "Create item error"
    })
  })
}

const getAll = function(req, res) {
  let inputData = {}
  let { name, price, tags } = req.query

  // if (name || price_start || tags) {
  //   inputData = {
  //     $or: []
  //   }
  // } 
  // if (name || name !== '') inputData['$or'].push({ name: new RegExp(req.query.name, i)})
  // if (price_start || price_start !== '') inputData['$or'].push({ price_start: new RegExp(req.query.price_start, i)})
  // if (tags || tags !== '') inputData['$or'].push({ tags: new RegExp(req.query.tags, i)})
  if (name) inputData.name = name
  if (price) inputData.price = price
  if (tags) inputData.tags = tags

  console.log('input data-->',inputData)

  Item.find(inputData)
  .then(items => {
    console.log('retrieved items', items)
    res.status(200).json(items)
  })
  .catch(err => {
    console.log('retrieved items error', err)
    res.status(200).json({
      message: 'retrieve items error',
      error: err
    })
  })
}

module.exports = {
  create, getAll
}
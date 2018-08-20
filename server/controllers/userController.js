require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(8)

const register = function(req, res) {
  let { username, password } = req.body
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password minimum 6 characters'
    })
  }

  let hash = bcrypt.hashSync(password, salt)

  User.create({ username, password: hash })
  .then(user => {
    console.log('new user', user)
    res.status(201).json({
      success: true,
      message: `Account ${user.username} registered`
    })
  })
  .catch(err => {
    console.log('create user error', err)
    res.status(400).json({
      success: false,
      message: `create user error`,
      error: err
    })
  })
}

const request_token = function(req, res) {
  let { username, password } = req.body
  User.findOne({ username })
  .then(user => {
    let checkPass = bcrypt.compareSync(password, user.password)
    if (checkPass) {
      let token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_KEY)
      res.status(200).json({
        token
      })
    } else {
      res.status(400).json({
        message: 'username / password incorrect',
        success: false,
      })
    }
  })
  .catch(err => {
    console.log('login error', err)
    res.status(400).json({
      message: 'username / password incorrect',
      success: false,
      error: err
    })
  })
}

module.exports = {
  register, request_token
}
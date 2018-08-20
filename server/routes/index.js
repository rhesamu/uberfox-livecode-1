const express = require('express');
const router = express.Router();
const { register, request_token } = require('../controllers/userController')
const { create, getAll } = require('../controllers/itemController')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/register', register)
router.post('/request_token', request_token)
router.get('/', getAll)
router.post('/items', create)

module.exports = router;

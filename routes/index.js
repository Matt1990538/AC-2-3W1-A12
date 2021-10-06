const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')

router.use('/', home)
router.use('/restaurant', restaurant)
router.use('/search', search)

module.exports = router
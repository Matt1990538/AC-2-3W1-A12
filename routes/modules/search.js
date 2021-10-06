const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// search function, need to be updated with DB
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const keywordLowerCase = keyword.toLowerCase()

  Restaurant.find({$or:[{name: { "$regex": keywordLowerCase, "$options": "i" }}, {name_en: { "$regex": keywordLowerCase, "$options": "i" }}, {category: { "$regex": keywordLowerCase, "$options": "i" }}]})
  .lean()
  .then(searchedRestaurant => res.render('index', { restaurants:searchedRestaurant, keyword: keyword }))
  .catch(error => console.log(error))

})

module.exports = router
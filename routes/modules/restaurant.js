const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// create a new restaurant review, automatically giving a sequential ID
router.get('/new', (req, res) => {
  Restaurant.countDocuments({})
    .lean()
    .then(function(dbLength) {
      dbLength += 1
      res.render('new', {dbLength})
    })
    .catch(error => console.log(error))
})
// posting a new restaurant review to DB
router.post('/', (req, res) => {
  return Restaurant.create({ 
    id: req.body.id, 
    name: req.body.name, 
    name_en: req.body.name_en, 
    category: req.body.category, 
    image: req.body.image, 
    location: req.body.location, 
    phone: req.body.phone, 
    google_map: req.body.google_map, 
    rating: req.body.rating, 
    description: req.body.description
  })
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

// showing details of restaurant
router.get('/:restaurant_id', (req, res) => {
  const index = req.params.restaurant_id
  Restaurant.findOne({'id': index})
    .lean()
    .then(pickedRestaurant => res.render('show', { restaurants:pickedRestaurant }))
    .catch(error => console.log(error))
})

// editing details of a restaurant being picked by user
router.get('/:restaurant_id/edit', (req, res) => {
  const index = req.params.restaurant_id
  Restaurant.findOne({'id': index})
    .lean()
    .then(pickedRestaurant => res.render('edit', { restaurants:pickedRestaurant }))
    .catch(error => console.log(error))
})

router.put('/:restaurant_id/edit', (req, res) => {
  const index = req.params.restaurant_id
  Restaurant.findOne({'id': index})
    .then(updatedInfo => {
      [updatedInfo.name, updatedInfo.name_en, updatedInfo.category, updatedInfo.image, updatedInfo.location, updatedInfo.phone, updatedInfo.google_map, updatedInfo.rating, updatedInfo.description] = [req.body.name, req.body.name_en, req.body.category, req.body.image, req.body.location, req.body.phone, req.body.google_map, req.body.rating, req.body.description]
      return updatedInfo.save()
    })
    .then(() => res.redirect(`/${index}`))
    .catch(error => console.log(error))
})

// deleting a restaurant being picked by user
router.delete('/:restaurant_id/', (req, res) => {
  const index = req.params.restaurant_id
  Restaurant.findOne({'id': index})
    .then(pickedRestaurant => pickedRestaurant.remove())
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
}) 

module.exports = router
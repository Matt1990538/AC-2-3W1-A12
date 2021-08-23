const mongoose = require('mongoose')
const restaurant = require('../restaurant') 
const restaurantList = require('../../restaurant.json')

mongoose.connect('mongodb://localhost/Restaurant_List', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i <= restaurantList.results.length - 1; i++) {

    restaurant.create({ 
      id: restaurantList.results[i].id, 
      name: restaurantList.results[i].name, 
      name_en: restaurantList.results[i].name_en, 
      category: restaurantList.results[i].category, 
      image: restaurantList.results[i].image, 
      location: restaurantList.results[i].location, 
      phone: restaurantList.results[i].phone, 
      google_map: restaurantList.results[i].google_map, 
      rating: restaurantList.results[i].rating, 
      description: restaurantList.results[i].description
    })

  }
  console.log('done')
})

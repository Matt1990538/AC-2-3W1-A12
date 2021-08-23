const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

const Restaurant = require('./models/restaurant')

// database connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Restaurant_List', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static files location & body-parser
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


// routing
app.get('/', (req, res) => {
  Restaurant.find()
    .lean() //mongoose to array
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword

  const searchedCategory = restaurantList.results.filter(restaurant => {
    return restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })

  const searchedRestaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })

  const searchResult = searchedCategory.length === 0 ? searchedRestaurants : searchedCategory

  res.render('index', { restaurants:searchResult, keyword: keyword })
  
})

app.get('/restaurant/new', (req, res) => {
  Restaurant.countDocuments({})
    .lean()
    .then(function(dbLength) {
      dbLength += 1
      res.render('new', {dbLength})
    })
})

app.post('/restaurant', (req, res) => {
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


app.get('/restaurant/:restaurant_id', (req, res) => {
  const pickedRestaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurants: pickedRestaurant })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
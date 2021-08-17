const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// database connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Restaurant-List', { useNewUrlParser: true, useUnifiedTopology: true })

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

// static files location
app.use(express.static('public'))




// routing
app.get('/', (req, res ) => {
  res.render('index', { restaurants:restaurantList.results })
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



app.get('/restaurant/:restaurant_id', (req, res) => {
  const pickedRestaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurants: pickedRestaurant })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

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
  console.log(keyword.toLowerCase())
  const searchedRestaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants:searchedRestaurants, keyword: keyword })
})

app.get('/restaurant/:restaurant_id', (req, res) => {
  const pickedRestaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurants: pickedRestaurant })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
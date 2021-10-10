const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const methodOverride = require('method-override')

const port = process.env.port || 3000

const Restaurant = require('./models/restaurant')
const routes = require('./routes')

const db = require('./config/mongoose')

const app = express()

// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static files location. Body-parser and RESTful method override for express
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

// listening to port
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
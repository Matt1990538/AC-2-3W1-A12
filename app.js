const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const methodOverride = require('method-override')

const Restaurant = require('./models/restaurant')
const routes = require('./routes')

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


app.use(routes)

// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static files location. Body-parser and RESTful method override for express
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// listening to port
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
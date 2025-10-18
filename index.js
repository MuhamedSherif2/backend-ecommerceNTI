const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/db.config')

const app = express()
const port = process.env.PORT

connectDB()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, './uploads')))

// routes
app.use('/api/cart', require('./routers/cart.router'))
app.use('/api/category', require('./routers/category.router'))
app.use('/api/faq', require('./routers/faq.router'))
app.use('/api/filter', require('./routers/filter.router'))
app.use('/api/order', require('./routers/order.router'))
app.use('/api/products', require('./routers/product.router'))
app.use('/api/subcategory', require('./routers/subcategory.router'))
app.use('/api/testimonial', require('./routers/testimonial.router'))
app.use('/api/user', require('./routers/user.route'))


app.listen(port, _ => {
    console.log(`server run on http://localhost:${port}`)
})
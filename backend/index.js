const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
// const dotenv = require('dotenv');
const products = require('./data/products');

require('./models/userModel');
require('./services/passport');
const keys = require('./config/keys');

// dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth.route');
// const billingRoutes = require('./routes/billing.route');

app.use('/api/auth', authRoutes);
// app.use('/api/stripe', billingRoutes);


app.get('/api/products', (req, res) => {
  res.json(products)
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
});


if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'))
  
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}


mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server has start running on port ${PORT}`))
  })
  .catch(err => console.error(`Error: ${err.message}`))

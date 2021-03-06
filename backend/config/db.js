const mongoose = require('mongoose');
const keys = require('./keys');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)  // prevent event loop
  }
}

module.exports = connectDB
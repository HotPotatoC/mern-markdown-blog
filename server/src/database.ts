import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose
  .connect('mongodb://localhost:27017', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGODB_DBNAME,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB database!')
  })
  .catch(function (err) {
    console.log(err)
  })

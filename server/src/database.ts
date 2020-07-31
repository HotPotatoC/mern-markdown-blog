import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose
  .connect(process.env.MONGODB_URI as string, {
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

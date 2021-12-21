const express = require('express');
const app = express();
// const tasks = require('./routes/tasks');
const products = require('./routes/products');
const connectDB = require('./db/connect');
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// middleware
app.use(express.static('uploads'));
// app.use(express.static('public'));
app.use(express.json());

// routes

app.use(cors())
// app.use('/api/v1/tasks', tasks);
app.use('/api/v1/products', products);
app.use(notFound);
app.use(errorHandlerMiddleware);
app.use(morgan);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

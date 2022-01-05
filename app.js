const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

//Import Routes
// const tasks = require('./routes/tasks');
const products = require('./routes/products');
const categories = require('./routes/category');
const subcategories = require('./routes/subcategory');
// const users= require('./routes/userRouter');


//Db Connection
const connectDB = require('./db/connect');

//
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// middleware
app.use(express.static('uploads'));
// app.use(express.static('public'));
app.use(express.json());



app.use(cors())

// routes use
// app.use('/api/v1/tasks', tasks);
app.use('/api/v1/products', products);
// app.use('/api/v1/users',users);
app.use('/api/v1/categories', categories);
app.use('/api/v1/subcategories', subcategories);




app.use(notFound);
app.use(errorHandlerMiddleware);
app.use(morgan);
const port = process.env.PORT;

const start = async () => {
  try {
    
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    await connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

start();

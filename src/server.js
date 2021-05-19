'use strict';
// dependencies and configs
const express = require ('express');
require ('dotenv').config ();
const cors = require ('cors');
const morgan = require ('morgan');
const app = express();
// requirements
const errorHandler = require ('./error-handlers/500.js');
const notFoundError = require ('./error-handlers/404.js');
const logger = require ('./middleware/logger.js');

const foodRoutes = require ('./routes/food.js');
const clothesRoutes = require ('./routes/clothes.js');

// middleware
app.use (express.json());
app.use (morgan ('dev'));
app.use (logger);

app.use (cors());


app.use ('/api/v1/food', foodRoutes); 
app.use ('/api/v1/clothes', clothesRoutes); // edit

// homeRout // 
app.get ('/', homePageHandler);
function homePageHandler (req,res){
  res.send ('welcome to home page!');
}





// 500 error //
app.get ('/bad' , error500Handler);
function error500Handler (req,res){
  throw new Error ('Some thing went wrong');
}

// use errors 
app.use (errorHandler);
app.use ('*', notFoundError);

// app is listening 
function start (PORT){
  app.listen(PORT,()=>{
    console.log(`listening on PORT : ${PORT}`);
  });
}
module.exports={
  server:app,
  start:start,
};

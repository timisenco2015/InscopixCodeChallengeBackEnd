var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var routerLabel = require('route-label')
var app = express();
require('dotenv').config('./app');
var bodyParser = require('body-parser');
//const fileUpload = require('express-fileupload');

  


  let noteRoutes = require('./app/routes/api/timeSeriesNeuralRoute');

  // constant declarations
  const namedRouter = routerLabel(app);
  const getApiFolderName = process.env.API_FOLDER_NAME;
  const http = require('http');
  const {readdir,stat } = require('fs');
  const { promisify } = require('util');
  const {join} = require('path');
  _ = require("underscore");


  global.BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;

  const db = require('./app/config/database');


  db.authenticate()
  .then(() => 
  {
  
    console.log('Connection has been established successfully.');
  
  })
  .catch(err => 
  {
  
    console.error('Unable to connect to the database:', err);
  
  });

  require('./app/models/SynchronizedAllModels');
/*
  app.use(function(req, res, next){
    res.setTimeout(500000, function(){
        // call back function is called when request timed out.
    });
    next();
});

*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => 
{
    // backbutton prevent
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    // Inclide main view path
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next();
  });

app.use(noteRoutes);



  // Handler for 404 - Resource Not Found
app.use((req, res, next) => 
{
  res.status(404).send('We think you are lost!')
})

app.use((err, req, res, next) => 
{
  console.error(err.stack)
  res.send("testing");
})



        /******************* Service Launch *****************/
        try {

          const server = http.createServer(app);
          server.setTimeout(48*60*60*1000); // 10 * 60 seconds * 1000 msecs
          server.keepAliveTimeout=48*60*60*1000;
          server.listen(process.env.PORT, function () {
              
              console.log(`running on ${(global.BASE_URL && global.BASE_URL !== '') ? global.BASE_URL : `http://${process.env.HOST}:${getPort}`}`);
             
          });
          
        server.on('error', onError);
     
       
    } catch (error) {
        console.error(error);
    }


    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }
    
      var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    
      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    }
    


  module.exports = app;

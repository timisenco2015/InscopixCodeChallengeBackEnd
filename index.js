var createError = require('http-errors');

var express = require('express');

var logger = require('morgan');



require('dotenv').config('./app');

const fileUpload = require('express-fileupload');

const timeSeriesRoutes = require('./app/routes/api/timeSeriesNeuralRoute');

const allModels = require("./app/models/SynchronizedAllModels")

let expressAppSetUp = 
{
   

    setup:function()
    {
        

        var app = express();
       
        app.use(express.json());

        app.use(express.urlencoded({ extended: true }));

        app.use(fileUpload(
            {
                limits: { fileSize: 500 * 1024 * 1024 },
            }
        ));

        app.use((req, res, next) => 
        {
        
            // backbutton prevent
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.use(timeSeriesRoutes);

        
  
        // Handler for 404 - Resource Not Found
        app.use((req, res, next) => 
        {

            res.status(404).send('We think you are lost!')

        })
     
        return app;
    }


}


module.exports = expressAppSetUp;





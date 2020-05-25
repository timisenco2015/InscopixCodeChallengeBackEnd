// All models declaration

const fs = require('fs');
const Sequelize = require('sequelize');
const async = require('async');
const { Readable } = require('stream');
const sequelize = require('../../app/config/database');
const Sessions = require('../models/Sessions');

var moment = require('moment');
const Cells = require('../models/Cells');
const GPIOs = require('../models/GPIOs');


// All Entities Declaration
var Container = require('../entities/Container');
var Session = require('../entities/session');
var GPIO = require('../entities/gpio');
var Cell = require('../entities/cell');




let timeSeriesNeuralRoute =
{
  
    
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
        // Function name: importSessionJSON
        // accept argument: accept file location name through req.body or req.query
        // and return argument: return is in this format: {status: 200,statusDesc:"succesful",data:container,message: 'Unable to populate record into the destination table'};
        // What the method deos: this method accept file location address, fecths the file from location, validation the file
                                // and read through the file line by line. In the process reading lines, transform the line and it calls postgresql 
                                //insert query which insert data into the table (sessiontables)
    importDataFiles:  async function(req, res) 
    {
        
         //reading the cell_set1.csv
         var bufferedRead = Buffer.from(req.files.file3.data, "utf-8");
         var cellsArray = bufferedRead.toString().split("\n");
 
       
        //reading the gpio file
        var bufferedRead = Buffer.from(req.files.file1.data, "utf-8");
        var gPIOArray = bufferedRead.toString().split("\n");

       
        //reading the cell_set1.json
        var bufferedRead = Buffer.from(req.files.file2.data, "utf-8");
        var sessionObject =JSON.parse(bufferedRead.toString());

       
       
        let session = new Session();

        session.setAcquisitionSWVersion(sessionObject["Acquisition SW Version"]); 
    
        session.setAnimalDateOfBirth(sessionObject["Animal Date of Birth"]);

        session.setAnimalID(sessionObject["Animal ID"]); 
   
        session.setAnimalSex(sessionObject["Animal Sex"]);

        session.setAnimalSpecies(sessionObject["Animal Species"]); 

        session.setAnimalWeight(sessionObject["Animal Weight (g)"]); 

        session.setExperimenterName(sessionObject["Experimenter Name"]); 
  
        session.setMicroscopeEXLEDPower(sessionObject["Microscope EX LED Power (mw/mm^2)"]);

        session.setMicroscopeOGLEDPower(sessionObject["Microscope OG LED Power (mw/mm^2)"]); 

        session.setSamplingRate(sessionObject["Sampling rate (Hz)"]); 
   
        session.setSessionId(sessionObject["Session_ID"]); 
   
        session.setRecordingStartTime(sessionObject["Recording start time"]);

               
        //accept object created from lines or line values read and call sequelize model Sessions. the create method
        // of the model insert the object into sessiontables in postgresql
        let returnedSession= await Sessions.create(session).catch(Sequelize.ValidationError, function (err) 
        {
           
            return new Error()
           
        });

        
       
       if(returnedSession instanceof Error)
       {
        
            return {status: 200,statusDesc:"unsuccesful",data:returnedSession.message,message: 'Unable to populate record into the table Successfully'};
              
        }

       else
       {
        
           for (let index in gPIOArray)
           {
                var gpio = new GPIO();

                gpio.setSessionId(returnedSession.dataValues.session_id);

                gpio.setChannels(gPIOArray[index]); 

                gpio.setCellColumnId(index); 
     
               
                // accept object created from lines or line values read and call sequelize model GPIOS. the create method
                // of the model insert the object into gpiostables in postgresql

                let returnedGpio = await GPIOs.create(gpio).catch(Sequelize.ValidationError, function (err) 
                {
                  
                    return new Error(err)
                   
                });

                if(returnedGpio instanceof Error)
                {
                     return {status: 200,statusDesc:"unsuccesful",data:returnedGpio.message,message: 'Unable to populate record into the table Successfully'};
                }
           }
           

            var tempArray =[];
           
            for (let index in cellsArray) 
            {
                let j=0;
                let splittedCellArrayLine = cellsArray[index].split(',');
                async.each(splittedCellArrayLine, item=> 
                {
                    var cell = new Cell();

                    cell.setCellId(index);

                    cell.setSessionId("RS_49");

	                cell.seColumnId(j);

                    cell.setFrames(item);
                    tempArray.push(cell);
                    j++;

                })
           
            }

        
            for (let index in tempArray)
            {
               
              
                let returnedCells =   await Cells.create(tempArray[index]).catch(Sequelize.ValidationError, function (err) 
                {
                       
                   return new Error(err)
                       
                });

                if(returnedCells instanceof Error)
                {
                     return {status: 200,statusDesc:"unsuccesful",data:returnedCells.message,message: 'Unable to populate record into the table Successfully'};
                }
                
            }
            
       }
           

        return {status: 200,statusDesc:"succesful",message: 'Record Populated into the table Successfully'};
    },
              
 
    

    
    

   

    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
        // Function name: getSessionFullDetails
        // accept argument: accept experimenterName, startTimeStamp, endTimeStamp
        // and return argument: return is in this format: {status: 200,statusDesc:"succesful",data:container,message: 'Unable to populate record into the destination table'};
        // What the method deos: performs queries on sessiontables. Peforms the queries for the first query question of the coding chanllange 
    getSessionFullDetails:async function(req,res)
    {
       
        try
        {

           
            let startTimeStamp = "";

            let endTimeStamp = "";

            let experimenterName ="";

            //Java equivalent generic class
            let container = new Container();
           
            if(Object.entries(req.body).length !== 0)
            {
                
                startTimeStamp = moment(req.body.startDate+"T00:00:00+00:00").utcOffset("00:00").format('YYYY-MM-DDTHH:mm:ssZ:Z');
           
                endTimeStamp = moment(req.body.endDate+"T23:59:00+00:00").utcOffset("00:00").format('YYYY-MM-DDTHH:mm:ssZ:Z');

                experimenterName = req.body.experimenterName;

            }
            else if(Object.entries(req.query).length !== 0)
            {
                
                startTimeStamp = moment(req.query.startDate+"T00:00:00+00:00").utcOffset("00:00").format('YYYY-MM-DDTHH:mm:ssZ:Z');
           
                endTimeStamp = moment(req.query.endDate+"T23:59:00+00:00").utcOffset("00:00").format('YYYY-MM-DDTHH:mm:ssZ:Z');
    
               // experimenterName = req.query.experimenterName

            }

            
            
            //performs postgresql select statement
            await sequelize.query('select id, animal_date_of_birth,animal_id,animal_sex,animal_species,animal_weight,'
			    + 'experimenter_name,microscope_ex_led_power,microscope_og_led_power,sampling_rate,session_id,recording_start_time,acquisition_sw_version from sessionstables '
			    + 'where experimenter_name=? and (recording_start_time BETWEEN ? AND ?)',
                { replacements: [experimenterName ,startTimeStamp,endTimeStamp], type: sequelize.QueryTypes.SELECT })
                .then(sessionDetails => 
                {
                    
                    container.setObjectType("Class Object"); 
 
                    container.setObject(sessionDetails);
                   
                   
                })
                .catch( function( reason )
                {
                    let errorMap = {"Insert Error": "Error Thrown -> "+reason};
                    
                    
                    container.setObjectType("Error Object"); 
        
                    container.setObject(errorMap);
                    
                   
                });

                
                if (container.getObjectType()=="Error Object")
                {
                    
                    return {status: 200,statusDesc:"unSuccesful",data:container,message: 'Record fecth not sucessfull'};
                }
               
                
                return {status: 200,statusDesc:"succesful",data:container,message: 'Record fecthed Successfully'};
                    
        }
        
        catch(err)
        {
            console.log(err);
           // return res.status(500).send({ message: err.message });
        }
    },

    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
        // Function name: getFirstTwoCellsNeuralData
        // accept argument: accept sessionId
        // and return argument: return is in this format: {status: 200,statusDesc:"succesful",data:container,message: 'Unable to populate record into the destination table'};
        // What the method deos: performs queries on gpiostables and cellstables. Peforms the queries for the second select query question of the coding chanllange 
    
    getFirstTwoCellsNeuralData:async function(req,res)
    {
        try
        {
            
           
            var gpiosContainer = new Container();

            var cellsContainer = new Container();

            let row1Array=[];

            let row2Array=[];

            let allSelectonsArray=[];

            let session_id="";

            if(Object.entries(req.body).length !== 0)
            {
                
                session_id =  req.body.sessionId;
               
            }
            else if(Object.entries(req.query).length !== 0)
            {
                
                session_id =  req.query.sessionId;
          
            }
           
             //performs postgresql select statement
            await sequelize.query('select cast(channels as NUMERIC(4,2)) from  gpiostables where session_id=?',
                { replacements: [session_id], type: sequelize.QueryTypes.SELECT })
                .then(gposDetails => 
                {
                   
                    gpiosContainer.setObjectType("Class Object"); 
 
                    gpiosContainer.setObject(gposDetails);
                   
                })
                .catch( function( reason )
                {
                    
                    let errorMap = {"Insert Error": "Error Thrown -> "+reason};
                    
                  
                    gpiosContainer.setObjectType("Error Object"); 
        
                    gpiosContainer.setObject(errorMap);
                    
                   
                    return;
                });
               
                 //performs postgresql select statement
                await sequelize.query('select cast(frames as NUMERIC(4,2)), cell_id from cellstables where session_id=? and (cell_id=1 or cell_id=2) order by cell_id',
                { replacements: [session_id], type: sequelize.QueryTypes.SELECT })
                .then(cellsnDetails => 
                {
                    row1Array = cellsnDetails.filter(function(item) 
                    {
                        return item.cell_id==1;
                    });
                    
                    row2Array = cellsnDetails.filter(function(item) 
                    {
                       
                        return item.cell_id==2;
                    });

                   
                })
                .catch( function( reason )
                {
                    
                    let errorMap = {"Insert Error": "Error Thrown -> "+reason};
                    
                  
                    cellsContainer.setObjectType("Error Object"); 
        
                    cellsContainer.setObject(errorMap);
                    
                   
                    return;
                });

               
                if (gpiosContainer.getObjectType()=="Error Object")
                {
                    
                    return {status: 200,statusDesc:"succesful",data:gpiosContainer,message: 'Record fecth not sucessfull'};
                }
                else if (cellsContainer.getObjectType()=="Error Object")
                {
                  
                    return {status: 200,statusDesc:"succesful",data:cellsContainer,message: 'Record fecth not sucessfull'};
                  
                }
                else
                {
                    
                    allSelectonsArray.push(row1Array);
                    allSelectonsArray.push(row2Array);
                    allSelectonsArray.push( gpiosContainer.getObject());
                        
                    cellsContainer.setObjectType("Class Object"); 
 
                    cellsContainer.setObject(allSelectonsArray);
                    
                }

                return {status: 200,statusDesc:"succesful",data:cellsContainer,message: 'Record fecthed Successfully'};
                  
        }
        
        catch(err)
        {
           
            return res.status(500).send({ message: err.message });
        }
    },

     //----------------------------------------------------------------------
    //----------------------------------------------------------------------
        // Function name: getBoutMoment
        // accept argument: accept sessionId
        // and return argument: return is in this format: {status: 200,statusDesc:"succesful",data:container,message: 'Unable to populate record into the destination table'};
        // What the method deos: performs queries on gpiostables and cellstables. Peforms the queries for the third select query question of the coding chanllange 
    
    getBoutMoment:async function(req,res)
    {
        try
        {
            var gpiosContainer = new Container();

            var cellsContainer = new Container();

            let gPIOsList = [];

            let sessionList = [];
            
            let boutMovementPositionList = [];
            
            let boutMovementArray = [];
            
            let  previousValue=-1.00;
            
            let currentValue=0.00;
            
            let session_id="";

            if(Object.entries(req.body).length !== 0)
            {
                
                session_id =  req.body.sessionId;
               
            }
            else if(Object.entries(req.query).length !== 0)
            {
                
                session_id =  req.query.sessionId;
          
            }

            //performs postgresql select statement
            await sequelize.query('select cast(channels as NUMERIC(4,2)) from  gpiostables where session_id=?',
            { replacements: [session_id], type: sequelize.QueryTypes.SELECT })
            .then(gposDetails => 
            {
                gPIOsList = gposDetails
                  
            })
            .catch( function( reason )
            {
                
                let errorMap = {"Insert Error": "Error Thrown -> "+reason};
                
              
                gpiosContainer.setObjectType("Error Object"); 
    
                gpiosContainer.setObject(errorMap);
                
               
                return;
            });

            //performs postgresql select statement
            await sequelize.query('select cast(frames as NUMERIC(4,2)), cell_id from cellstables where session_id=? and cell_id=1',
            { replacements: [session_id], type: sequelize.QueryTypes.SELECT })
            .then(cellsDetails => 
            {
                sessionList = cellsDetails;
   
            })
            .catch( function( reason )
            {
                
                let errorMap = {"Insert Error": "Error Thrown -> "+reason};
                
              
                cellsContainer.setObjectType("Error Object"); 
    
                cellsContainer.setObject(errorMap);
                
               
                return;
            });

            if (gpiosContainer.getObjectType()=="Error Object")
            {
                    
                return {status: 200,statusDesc:"succesful",data:gpiosContainer,message: 'Record fecth not sucessfull'};
            
            }
            else if (cellsContainer.getObjectType()=="Error Object")
            {
                  
                return {status: 200,statusDesc:"succesful",data:cellsContainer,message: 'Record fecth not sucessfull'};
                  
            }
            else
            {
                    
                for (let i=0; i<gPIOsList.length;i++)
			    {
                        
                    currentValue = parseFloat(gPIOsList[i].channels).toFixed(2);
                        
                       
				    if(currentValue==1.00 && previousValue==0.00)
				    {
					    let pos =0;
                            
                        boutMovementArray = [];
                            
					    for(let j=(i-15); j<(i+15);j++)
					    {
                                
						    boutMovementArray.push(sessionList[j]);
						    pos++;
					    }
                        
                        boutMovementPositionList.push(boutMovementArray);
                        
                    }
                
				    previousValue =currentValue;	
                }
            
                cellsContainer.setObjectType("Class Object"); 
 
                cellsContainer.setObject(boutMovementPositionList);

                return {status: 200,statusDesc:"succesful",data:cellsContainer,message: 'Record fecthed Successfully'};
                    
            }

        }
        catch(err)
        {
            return res.status(500).send({ message: err.message });
        }
    }


}


module.exports = timeSeriesNeuralRoute;
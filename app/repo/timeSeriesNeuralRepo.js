// All models declaration

const Sessions = require('../models/Sessions');
const Cells = require('../models/Cells');
const GPIOs = require('../models/GPIOs');
const sequelize = require('../config/database');
var moment = require('moment');
moment().format();

// All Entities Declaration
var Container = require('../entities/Container');
var Session = require('../entities/session');
var GPIO = require('../entities/gpio');
var Cell = require('../entities/cell');


//const lineReader = require('line-reader');
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');


let timeSeriesNeuralRoute =
{
  
    

    importSessionJSON:  async function(req, res) 
    { 
      
        var container = new Container();

        try
        {
            var insertSessions=null;
            
            function readLines({ input }) 
            {
                    
                const output = new stream.PassThrough({ objectMode: true });
                    
                const rl = readline.createInterface({ input });
                    
                rl.on("line", line => 
                { 
                        
                    output.write(line);
                    
                });
                    
                rl.on("close", () => 
                {
                        
                    output.push(null);
                
                }); 
                
                return output;
              
            }
              
            let input = await fs.createReadStream(req.body.fileName);
                
            let result =  await (async () => 
            {
                
                for await (const line of readLines({ input })) 
                {
                  
                    sessionObject =  await JSON.parse(line);

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

                    
                    
                    return await Sessions.create(session).then(returnedSession => 
                    {
                              
                        insertSessions = returnedSession["dataValues"];

                        let session = new Session();

                        session.setAcquisitionSWVersion(insertSessions["acquisition_sw_version"]); 
    
                        session.setAnimalDateOfBirth(insertSessions["animal_date_of_birth"]);

                        session.setAnimalID(insertSessions["animal_id"]); 
   
                        session.setAnimalSex(insertSessions["animal_sex"]);

                        session.setAnimalSpecies(insertSessions["animal_species"]); 

                        session.setAnimalWeight(insertSessions["animal_weight"]); 

                        session.setExperimenterName(insertSessions["experimenter_name"]); 
  
                        session.setMicroscopeEXLEDPower(insertSessions["microscope_ex_led_power"]);

                        session.setMicroscopeOGLEDPower(insertSessions["microscope_og_led_power"]); 

                        session.setSamplingRate(insertSessions["sampling_rate"]); 
   
                        session.setSessionId(insertSessions["session_id"]); 
   
                        session.setRecordingStartTime(insertSessions["recording_start_time"]);

                        container.setObjectType("Class Object"); 
 
                        container.setObject(session);

                        let insertObjectMap = {"Insert Message": "records in file populated to destination table sucessfully"};
                    
                        container.setObjectType("Class Object"); 
        
                        container.setObject(insertObjectMap);
                     
                    })
                    .catch(reason => 
                    {
                       
                        let errorMap = {"Insert Error": "Error Thrown -> "+reason};
                  
                        container.setObjectType("Error Object"); 
        
                        container.setObject(errorMap);

                        return;
                    });
                                               
                }
            })();

            if (container.getObjectType()=="Error Object")
            {
                
                return {status: 200,statusDesc:"succesful",data:container,message: 'Unable to populate record into the destination table'};
           
            }
           
            
            return {status: 200,statusDesc:"succesful",data:container,message: 'Record Populated into the table Successfully'};
           
               
            }
            catch(err)
            {
            
                return res.status(500).send({ message: err.message });
            }  

    },

    
  
    importGPIOCSV:async function(req,res)
    {
        let container = new Container();

       

        try
        {
            var allLinesRead = [];
            session = await Sessions.findOne({ where: {session_id: req.body.sessionId} }).then(sessionResult => 
            {
                 
                return sessionResult["dataValues"];
              
            });

            
           
            function readLines({ input }) 
            {
                    
                const output = new stream.PassThrough({ objectMode: true });
                
                const rl = readline.createInterface({ input });
                    
                rl.on("line", line => 
                { 
                        
                    output.write(line);
                    
                });
                    
                rl.on("close", () => 
                {
                        
                    output.push(null);
                
                }); 
                
                return output;
              
            }
              
            let input = await fs.createReadStream(req.body.fileName);
                
            await (async () => 
            {
                
                for await (const line of readLines({ input })) 
                {
                    allLinesRead.push(line);
                                       
                }

                return await  readAllLines (allLinesRead);
                
            })();

            async function readAllLines (allLinesRead)
            {
                let session_id =session.session_id;

                var isError=false;

                var genericObject=null;
                
                for (let index = 0; index < allLinesRead.length && !isError; index++) 
                {
                    var gpio = new GPIO();

                    gpio.setSessionId(session_id);
	
                    gpio.setChannels(allLinesRead[index]); 
	
                    gpio.setCellColumnId(index); 
                 

                    
                    await GPIOs.create(gpio).then(returnedGpio => 
                    {
                      
                        var gpio = new GPIO();

                        gpio.setSessionId(returnedGpio["dataValues"]["session_id"]);
	
                        gpio.setChannels(returnedGpio["dataValues"]["channels"]); 
	
                        gpio.setCellColumnId(returnedGpio["dataValues"]["cell_column_id"]); 
                        
                        genericObject = gpio;

                        let insertObjectMap = {"Insert Message": "records in file populated to destination table sucessfully"};
                    
                        container.setObjectType("Class Object"); 
        
                        container.setObject(insertObjectMap);
                    
                    })
                    .catch(reason => 
                    {
                        isError=true;

                            
                        let errorMap = {"Insert Error": "Error Thrown -> "+reason};
                  
                        container.setObjectType("Error Object"); 
                
                        container.setObject(errorMap);

                    });
                }

              
            };

            
            if (container.getObjectType()=="Error Object")
            {
                
                return {status: 200,statusDesc:"succesful",data:container,message: 'Unable to populate record into the destination table'};
           
            }
           
            
            return {status: 200,statusDesc:"succesful",data:container,message: 'Record Populated into the table Successfully'};
           
                   
        }
        catch(err)
        {
            
            return res.status(500).send({ message: err.message });
        }  
       
    },

    importCellCSV:async function(req,res)
    {
        let container = new Container();
      
        try
        {
           
            var allLinesRead = [];
            session = await Sessions.findOne({ where: {session_id: req.body.sessionId} }).then(sessionResult => 
            {
                 
                return sessionResult["dataValues"];
              
            });

            
           
            function readLines({ input }) 
            {
                    
                const output = new stream.PassThrough({ objectMode: true });
                
                const rl = readline.createInterface({ input });
                    
                rl.on("line", line => 
                { 
                        
                    output.write(line);
                    
                });
                    
                rl.on("close", () => 
                {
                        
                    output.push(null);
                
                }); 
                
                return output;
              
            }
              
            let input = await fs.createReadStream(req.body.fileName);
                
            let result =   await (async () => 
            {
             
                for await (const line of readLines({ input })) 
                {
                    allLinesRead.push(line);
                                       
                }

                return await  readAllLines (allLinesRead);
                
            })();

            async function readAllLines (allLinesRead)
            {
                let session_id =session.session_id;

                var isError=false;

                var genericObject=null;
                
                for (let index = 0; index < allLinesRead.length && !isError; index++) 
                {
                    var splitterLine = allLinesRead[index].split(",");
                    
                    for (let j = 0; j < splitterLine.length && !isError; j++)
                    {
                        var cell = new Cell();

                        cell.setCellId(index);

                        cell.setSessionId(session_id);

	                    cell.seColumnId(j);

                        cell.setFrames(splitterLine[j]);

                        await Cells.create(cell).then(returnedCell => 
                        {
                              
                                var cell = new Cell();

                                cell.setCellId(returnedCell["dataValues"]["cell_id"]);

                                cell.setSessionId(returnedCell["dataValues"]["session_id"]);

	                            cell.seColumnId(returnedCell["dataValues"]["column_id"]);

                                cell.setFrames(returnedCell["dataValues"]["frames"]);
        
                                
                                let insertObjectMap = {"Insert Message": "records in file populated to destination table sucessfully"};
                    
                                container.setObjectType("Class Object"); 
                
                                container.setObject(insertObjectMap);
                            
                        })
                        .catch(reason => 
                        {
                            isError=true;

                            
                            let errorMap = {"Insert Error": "Error Thrown -> "+reason};
                    
                  
                            container.setObjectType("Error Object"); 
                
                            container.setObject(errorMap);

                            return;
                            
                        });
                        
	
                        
                    }
                    
                }

                return genericObject;
            };

            if (container.getObjectType()=="Error Object")
            {
                
                return {status: 200,statusDesc:"succesful",data:container,message: 'Unable to populate record into the destination table'};
            }
           
            
            return {status: 200,statusDesc:"succesful",data:container,message: 'Record Populated into the table Successfully'};
           
          
                   
        }
        catch(err)
        {
            
            return res.status(500).send({ message: err.message });
        }  
        
      

    },

    getSessionFullDetails:async function(req,res)
    {
        try
        {
            let startTimeStamp = "";
            let endTimeStamp = "";
            let experimenterName ="";
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
    
                experimenterName = req.query.experimenterName
            }
                 
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
            return res.status(500).send({ message: err.message });
        }
    },

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
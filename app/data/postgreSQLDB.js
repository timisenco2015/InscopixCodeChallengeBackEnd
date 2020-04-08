
 require('dotenv').config('./app');
 const {Pool} = require('pg')
 
 const pool = new Pool({
     user: process.env.DATABSEUSER,
     host: process.env.DATABASEHOST,
     database: process.env.DATABASENAME,
     password: process.env.DATABASEPASWWORD,
     port: process.env.DATABASEPORT,
   })
 
 let postgreSqlConnection =
 {
   
     // convert temperature from celsius to fahrenheit and fahrenheit to celsius
     createSessionTable: async function() 
     {
    
         pool
             .connect()
             .then(client => 
                 {
                     return client
                         .query(  "CREATE TABLE IF NOT EXISTS sessionstable (id SERIAL, animal_date_of_birth VARCHAR(15) ,animal_id VARCHAR (255) NOT NULL,"
                         + "animal_sex VARCHAR (15)  NOT NULL, animal_species VARCHAR (50)  NOT NULL, animal_weight VARCHAR (25)  NOT NULL,"
                         + "experimenter_name VARCHAR (150)  NOT NULL, microscope_ex_led_power NUMERIC (5, 2) NOT NULL, microscope_og_led_power NUMERIC (3, 2) NOT NULL,"
                         + "sampling_rate NUMERIC (5, 2) NOT NULL, session_id VARCHAR (255)  NOT NULL, recording_start_time VARCHAR (50)  NOT NULL,"
                         + "acquisition_sw_version VARCHAR (20)  NOT NULL, PRIMARY KEY (session_id))")
                         .then(res => 
                             {
                                 postgreSqlConnection.createGPIOsTable();
                                 postgreSqlConnection.createCellstableTable();
                             })
                         .catch(err => 
                         {
                             client.release()
                             console.log(err.stack);
                             return;
                         })
                 })
     },
 
     createGPIOsTable: async function() 
     {
         pool.connect((err, client) => 
         {
             if (err) 
             {
              
                console.log(err);
                return;
             }
             client.query(
                "CREATE TABLE IF NOT EXISTS gpiostable (id serial, channels  varchar(255) NOT NULL,"
                    + "session_id VARCHAR (255)  NOT NULL,cell_column_id bigint NOT NULL, PRIMARY KEY (session_id, cell_column_id),"
                    +" FOREIGN KEY (session_id) REFERENCES sessionstable (session_id))",
               function(err, res) 
               {
 
                 if (err) 
                 {
                   console.log(err);
                   return;
                 }
               }
             );
            
         });
 
         
 
     },
 
     createCellstableTable: async function() 
     {
        pool.connect((err, client) => 
         {
             if (err) 
             {

              

                console.log(err);
                return;
             }
             client.query(
            
                "CREATE TABLE IF NOT EXISTS cellstable (id serial, frames varchar(255) NOT NULL,"
                    + "session_id VARCHAR (255)  NOT NULL, cell_id bigint  NOT NULL,column_id bigint NOT NULL, PRIMARY KEY (session_id,id),"
                    +" FOREIGN KEY (session_id) REFERENCES sessionstable (session_id))",
               
              function(err, res) 
              {
                

                if (err) 
                {
                   console.log(err);
                   return;;
                }
              }
            );
         });
     },
 
     InsertIntoSessionTable: async function(sessionObject,done) 
     {
        
        return new Promise(function(resolve, reject)
        {

          pool.connect((err, client) => 
          {
            const shouldAbort = err => 
            {
              
              if (err) 
              {
                
                reject(err);
                
                console.error('Error in transaction', err.stack);
               
                
                client.query('ROLLBACK', err => 
                {
                  if (err) 
                  {
                    reject(err);
                    console.error('Error rolling back client', err.stack);
                    return;
                  }
                  // release the client back to the pool
                  
                })
              }
              return !!err
            }
            client.query('BEGIN', err => 
            {
              if (shouldAbort(err)) return

              const queryText = 'INSERT INTO sessionstable (animal_date_of_birth,animal_id, animal_sex, animal_species, animal_weight,'
              + 'experimenter_name, microscope_ex_led_power, microscope_og_led_power,sampling_rate, session_id, recording_start_time,'
              + 'acquisition_sw_version) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)'
              
              client.query(queryText, [sessionObject["Animal Date of Birth"],sessionObject["Animal ID"],sessionObject["Animal Sex"],sessionObject["Animal Species"],sessionObject["Animal Weight (g)"],
              sessionObject["Experimenter Name"],sessionObject["Microscope EX LED Power (mw/mm^2)"],sessionObject["Microscope OG LED Power (mw/mm^2)"],sessionObject["Sampling rate (Hz)"],sessionObject["Session_ID"],
              sessionObject["Recording start time"],sessionObject["Acquisition SW Version"]], (err, res) => 
              {
                
                if (err) 
                {
                    
                  reject(err);
                  
                  console.error('Error rolling back client', err.stack)
                return;
                }
                else
                {
                
                  console.log(res.rowCount)
                  resolve("row inserted");

                
                }
                
              });
            
            });
            
            client.query('COMMIT', function(err) 
            {
              //same thing here as with the ROLLBACK statement...call `done` either way
              //but if there is an error, kill the client
              if(err) 
              {
            
                reject(err);
            
                console.error('unable to commit transaction, killing client', err);
                return;
              }
            
              else
              {
            
                resolve("row inserted");;
            
              }
            
             
          
            });
        
          });
        
        });

     },


    InsertIntoGPIOSTable: async function(gpioObject) 
    {
      return new Promise(function(resolve, reject)
      {
        
        pool.connect((err, client) => 
        {
          const shouldAbort = err => 
          {
            if (err) 
            {
              reject(err);
              
              console.error('Error in transaction', err.stack)
                
              client.query('ROLLBACK', err => 
              {
                if (err) 
                {
                    
                  reject(err);
                    
                  console.error('Error rolling back client', err.stack);
                  return;
                }
                  // release the client back to the pool
              })
            }
            return !!err
          }
          
          client.query('BEGIN', err => 
          {
              
            if (shouldAbort(err)) return
            
            cellColumnCount =gpioObject["cellColumnCount"];
            var count=-1;
           
            for(i in gpioObject["channels"])
            {
              console.log(i);
             // count++;
            const queryText = 'INSERT INTO gpiostable (channels, session_id, cell_column_id) VALUES($1,$2,$3)'
              
            client.query(queryText,[gpioObject["channels"][i] ,gpioObject["sessionId"],i], (err, res) => 
            {
                
              if (err) 
              {
                console.error('Error rolling back client', err.stack)
                reject(err);
                
                    
               
                
              }

              else
              {
              
                resolve(res.rowCount);
              
              }
                
            });
          }
          });
            
          client.query('COMMIT', function(err) 
          {
            //same thing here as with the ROLLBACK statement...call `done` either way
            //but if there is an error, kill the client
            if(err) 
            {
                
              reject(err);
              
              console.error('unable to commit transaction, killing client', err);
              
              
            }
              
            else
            {
              resolve("row inserted");
            }
              
          });

        });

      });

    },

    InsertIntoCellsTable: async function(sessionObject) 
    {
      return new Promise(function(resolve, reject)
      {
         
        var position =0;
        var cellCount = sessionObject["cellCounter"]
       
        pool.connect((err, client) => 
        {
          
          const shouldAbort = err => 
          {
            
            if (err) 
            {
              
              reject(err)
                
              console.error('Error in transaction', err.stack)
                
              client.query('ROLLBACK', err => 
              {
                if (err) 
                {
                  
                  reject(err)
                  
                  console.error('Error rolling back client', err.stack);
                  return;
                }
                  // release the client back to the pool
                
              
              })
              
            }
            
            return !!err
            
          }
         
              
          client.query('BEGIN', err => 
          {
              
            reject(err)
              
            if (shouldAbort(err)) return
           var cellCount = sessionObject["countCell"];
          for(i in sessionObject["frames"])
          { 
          
          const queryText = 'INSERT INTO cellstable (frames, session_id,column_id,cell_id ) VALUES($1,$2,$3,$4)'
            client.query(queryText, [sessionObject["frames"][i],sessionObject["sessionId"],i,cellCount], (err, res) => 
            {
               
              if (err) 
              {
                  
                reject(err)
                console.error('Error rolling back client', err);
                return;
              }

              else
              {
                resolve(res.rowCount);
                console.error('Error rolling back client')
               
                
              }
                
            })
            
          }
     
          })
         
          
            
          client.query('COMMIT', function(err) 
          {
              
            //same thing here as with the ROLLBACK statement...call `done` either way
            //but if there is an error, kill the client
              
            if(err)   
            {
                
              reject(err);
                
              console.error('unable to commit transaction, killing client', err);
              return;
            }
            
            else  
            {

              resolve("row inserted")
              
            }
              
            
        
          });
         
        });
        
        
      });
     
    }
 
 }
         
 
 
 module.exports = postgreSqlConnection;
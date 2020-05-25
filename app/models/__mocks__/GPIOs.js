let errorList=[];
let gpiosData={};

class GPIOs 
{  
    create(gpio)
    {
         
            if(gpio.cell_column_id==null)
            {
                
                  errorList.push("gpio.cell_column_id  cannot be null");
            }
            if (gpio.session_id==null)
            {
               
                errorList.push("\n gpio.session_id cannot be null");
            }
            if (gpio.channels==null)
            {
              
                errorList.push("\n gpio.channels cannot be null");
            }
            
           else
           {
                errorList=[]
                gpiosData = 
                {
                    dataValues: 
                    {
                        id: '',
                        cell_column_id: '',
                        session_id: '',
                        channels: '',
                        updatedAt: '2020-05-21T01:23:23.291Z',
                        createdAt: '2020-05-21T01:23:23.291Z'
                  },
               }
            
               gpiosData.dataValues.cell_column_id=gpio.cell_column_id;
               gpiosData.dataValues.session_id= gpio.session_id;
               gpiosData.dataValues.channels= gpio.channels;
               
            }
           
            return this;
    }

    catch(error, callback) 
    {
          
     
        if(errorList.length==0)
        {
           
            return gpiosData;
        }
        else
        {
                
            return new Error(errorList);
        }
    }
}




module.exports  = new GPIOs();
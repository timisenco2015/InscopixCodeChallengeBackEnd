let errorList=[];
let cellsData={};

class Cells 
{  


    create(cell)
    {


            if(cell.session_id==null)
            {
                
                  errorList.push("cell.session_id cannot be null");
            }
            if (cell.cell_id==null)
            {
               
                errorList.push("\n cell.cell_id cannot be null");
            }
            if (cell.column_id==null)
            {
              
                errorList.push("\n cell.column_id cannot be null");
            }

            if (cell.frames==null)
            {
              
                errorList.push("\n cell.frames cannot be null");
            }
            
           else
           {
                errorList=[]
                cellsData = 
                {
                    dataValues: 
                    {
                        id: '',
                        cell_id:'',
                        cell_column_id: '',
                        session_id: '',
                        channels: '',
                        updatedAt: '2020-05-21T01:23:23.291Z',
                        createdAt: '2020-05-21T01:23:23.291Z'
                  },
                }
            
               cellsData.dataValues.cell_id=cell.cell_id;
               cellsData.dataValues.cell_column_id=cell.cell_column_id;
               cellsData.dataValues.session_id= cell.session_id;
               cellsData.dataValues.channels= cell.channels;
              
            }
            return this;
    }

    catch(error, callback) 
    {
     
        if(errorList.length==0)
        {
               
            return cellsData;
        }
        else
        {
                
            return new Error(errorList);
        }
    }
}




module.exports  = new Cells();
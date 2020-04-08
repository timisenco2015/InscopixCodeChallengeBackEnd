class Container
{
	
	
    Constructor() 
    {  
          
    }  // constructor 
     
    setObject(object) 
    { 
        this.object=object; 
    } 
    
    setObjectType(objectType) 
    { 
        this.objectType=objectType; 
    }
   
    getObjectType() 
    { 
        return this.objectType; 
    }
    
    getObject() 
    { 
        return this.object; 
    }
    

}

module.exports = Container;
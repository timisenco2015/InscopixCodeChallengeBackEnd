const http = require('http');

require('dotenv').config('./app');

const App = require('./index');
var index = App.setup();

/******************* Service Launch *****************/
try 
{

  const server = http.createServer(index);
          
  server.setTimeout(48*60*60*1000); // 10 * 60 seconds * 1000 msecs
          
  server.keepAliveTimeout=48*60*60*1000;
          
  server.listen(process.env.PORT,process.env.HOST, function ()       
  {
    console.log('\n');
    console.log(`Connection established on Port: ${process.env.PORT}, Host: ${process.env.HOST}`)
    
             
  });
          
  server.on('error', onError);   
} 
catch (error)
{
      
}


function onError(error) 
{
    
  if (error.syscall !== 'listen')
  {
    throw error;
      
  }
    
  var bind = typeof port === 'string'
  ? 'Pipe ' + error.port
  : 'Port ' + error.port;
    console.log('\n');
  // handle specific listen errors with friendly messages
  switch (error.code) 
  {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      console.log('\n');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' --- is already in use');
      console.log('\n');
      process.exit(1);
      break;
    default:
      throw error;
  }
 
}
    



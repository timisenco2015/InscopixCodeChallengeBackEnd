const assert = require('chai').assert;
require('dotenv').config('./app/config');
var mocks = require('node-mocks-http');
const Person = require('../entity/person');
const HomePlanet = require('../entity/homePlanet');
const Films = require('../entity/films');
const Species = require('../entity/species');
let temperatureRepo = require('../repo/temperatureRepo');


describe('test person repo', function()
{

    it("testing getTemperatureList() function of temperatureRepo", async () => 
    {
        try
        {

            let value = await temperatureRepo.getTemperatureList();
            let temperature = value.data[0];
            assert.equal(temperature.fahrenheit,284);

            
        }
        catch(err)
        {
           
        }
      
    });

    it("testing temperatureConvertion() function of temperatureConvertion", async () => 
    {
        try
        {
            
            var req = {"params":{
                "convertionType":"Fahrenheit",
                "celsiusValue":150
            }};
            var res = {};
            let value = await temperatureRepo.temperatureConvertion(req, res);
            await assert.equal(value.data.celsius,150);
        }
        catch(err)
        {
            //assert.isNotNull(err);
        }
      
    });
 


   
});



 

 
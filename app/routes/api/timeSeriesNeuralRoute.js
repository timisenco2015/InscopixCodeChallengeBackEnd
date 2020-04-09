const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
require('dotenv').config('./app');
const timeSeriesNeuralRepo = require('../../repo/timeSeriesNeuralRepo');

// importing session files by file location name
router.post("/neuron/importSessionsFromLocation", async (req, res) => 
{
    try 
    {
       
        const success = await timeSeriesNeuralRepo.importSessionJSON(req, res);
      
        res.status(success.status).send(success);
    } 
    catch (error) 
    {
        console.log(error);
        
        res.status(500).send(error);
    }
});


// importing gpio files by file location name
router.post("/neuron/importGpiosCSVFromFileLocation", async (req, res) => 
{
    try 
    {
       
       const success = await timeSeriesNeuralRepo.importGPIOCSV(req, res);
      
       await res.status(success.status).send(success);
    
    } 
    catch (error)
    {
        console.log(error);
       
        res.status(500).send(error);
    }
});

// importing cell files by file location name
router.post("/neuron/importCellsCSVFromLocation",async (req, res) => 
{
    try 
    {
        
       const success = await timeSeriesNeuralRepo.importCellCSV(req, res);
       
       await res.status(success.status).send(success);

    } 
    catch (error) 
    {
        console.log(error);
        
        res.status(500).send(error);
    }
});


// to get query details for the first select query question of the coding challenge
router.get("/neuron/sessionFullDetails",async (req, res) => 
{
    try 
    {
        
       const success = await timeSeriesNeuralRepo.getSessionFullDetails(req, res);
       
       await res.status(success.status).send(success);
    
    } 
    catch (error) 
    {
        console.log(error);
        
        res.status(500).send(error);
    }
});

// to get query details for the second select query question of the coding challenge
router.get("/neuron/firstTwoCellsNeuralData",async (req, res) => 
{
    try 
    {
        
       const success = await timeSeriesNeuralRepo.getFirstTwoCellsNeuralData(req, res);
       
       await res.status(success.status).send(success);
    
    } 
    catch (error) 
    {
        console.log(error);
        
        res.status(500).send(error);
    }
});


// to get query details for the third select query question of the coding challenge
router.get("/neuron/boutMomentDetails",async (req, res) => 
{
    try 
    {
        
       const success = await timeSeriesNeuralRepo.getBoutMoment(req, res);
       
       await res.status(success.status).send(success);
    
    } catch (error) 
    {
        console.log(error);
        
        res.status(500).send(error);
    }
});




module.exports = router;



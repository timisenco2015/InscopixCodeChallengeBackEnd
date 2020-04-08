const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
require('dotenv').config('./app');
const timeSeriesNeuralRepo = require('../../repo/timeSeriesNeuralRepo');


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



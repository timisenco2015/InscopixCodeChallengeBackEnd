# InscopixCodeChallengeBackEnd

## Description

 - A restful api built with NodeJS. 
 - End point for inscopixCodeChallengeFrontEnd. 
 - Access and process data from files located on the server
 

## Development server

Run `node server` for a dev server. To able to use this applications, users will have to set environment variables.The environment file is also upload under this repository on github.


## Build Code Structure
```bash
| -- src
  |
  | -- app 
  |
    | -- apiRequest
    |
      | -- /neuron/importSessionsFromLocation
      |
      | -- /neuron/importGpiosCSVFromFileLocation
      |
      | -- /neuron/importCellsCSVFromLocation
      |
      | -- /neuron/sessionFullDetails
      |
      | -- /neuron/firstTwoCellsNeuralData
      |
      | -- /neuron/boutMomentDetails
    |
    | -- entity
    |
      | -- cell.js
      |
      | -- Container.js
      |
      | -- gPIO.js
      |
      | -- session.js
    |
    | -- models
    |
      | -- Cells.js
      |
      | -- GPIOs.js
      |
      | -- Sessions.js
      |
      | -- SynchronizedAllModels.js
    |
    | -- repo
    |
      | -- timeSeriesNeuralRepo.js
    |
    | -- routes
    |
      | -- api
      |
        | -- timeSeriesNeuralRepoRoute.js
      |
    |
|
  ```

## Code details
```bash
   
  - cell (entity): the Cell class
  
    -- methods: getId(), setId(id), setCellId(cell_id), getCellId(), setSessionId(session_id), getSessionId(), getColumnId()       
                seColumnId(column_id), getFrames(), setFrames(frames) 
	
                
  - gPIO (entity): the GPIO class
 
    -- methods: setSessionId(session_id), getSessionId(), getId(), setId(id), getChannels(), setChannels(channels), getCellColumnId(),                   setCellColumnId(cell_column_id) 
	
		
 
 - container (entity): the Container class
 
    -- methods:  setObject(object), setObjectType(objectType), getObjectType(), getObject() 
   
                 
 - session (entity): the Session class
 
    -- methods: getAcquisitionSWVersion(), setAcquisitionSWVersion(acquisition_sw_version), getAnimalDateOfBirth(),    
                setAnimalDateOfBirth(animal_date_of_birth), getAnimalID(), setAnimalID(animal_id), getAnimalSex(), getAnimalSpecies() 
                setAnimalSpecies(animal_species), getAnimalWeight(), setAnimalWeight(animal_weight), getExperimenterName(),   
                setExperimenterName(experimenter_name), getMicroscopeEXLEDPower(), setMicroscopeEXLEDPower(microscope_ex_led_power) 
                getMicroscopeOGLEDPower(), setMicroscopeOGLEDPower(microscope_og_led_power), getSamplingRate(),  
                setSamplingRate(sampling_rate), getSessionId(), setSessionId(session_id), getRecordingStartTime(),  
                setRecordingStartTime(recording_start_time) 
  
 
  - timeSeriesNeuralRepo
      
      -- methods:
      
          --- importSessionJSON(): import session file from the location provided, read through the file, and inserted data read into                  the database (PostgreSQl)
          
          --- importGPIOCSV(): import gpio file from the location provided, read through the file, and inserted data read into                          the database (PostgreSQl)
          
          --- importCellCSV(): import cell file from the location provided, read through the file, and inserted data read into                          the database (PostgreSQl)
          
          --- getSessionFullDetails(): returns data from this query: Select recording date, recording length, & number of neurons for                   all sessions where experimenter == ‘David Hubel’ and date between 1/24/2020 and 1/27/2020
          
          --- getFirstTwoCellsNeuralData():returns data from this query: Select neural data of first 2 cells and GPIO data where session               id == ‘RS_51’ 
          
          --- getBoutMoment(): returns data from the query: Select neural data from the first cell where session_id == ‘RS_51’. Split                  and organize the neural data in the following way: each row is the neural data +/- 0.5
               seconds from the onset of a movement (i.e. when the GPIO data transitions from 0 to 1) .
  
  - routes
  
    -- api
    
      --- timeSeriesNeuralRoute
      
        ---- router.get: get resource using the url provided
        
        ---- router.post: post resource using the url provided
  
     
      
## Further help

To get more help, please contact 

 


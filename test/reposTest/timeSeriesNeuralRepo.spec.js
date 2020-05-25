jest.mock('../../app/models/Sessions');
jest.mock('../../app/models/GPIOs');
jest.mock('../../app/models/Cells');
const sequelize = require('../../app/config/database');


let timeSeriesNeuralRepo = require('../../app/repo/timeSeriesNeuralRepo');
var fs = require('fs');



describe('test importDataFiles function in timeSeriesNeuralRepo', function()
{

    
   let fakeFileBytes = `33 36 3d e0 c7 72 75 40 58 d9 4c 3a 5e db c7 4 a2 c5 88 9e fd 0d d2 9c 0d 53 73 79 1a 25 59 5f d6 5c e2 e3 1d 70 b6 c2 d9 9a e7 87 17 3d 71 fd
   e6 41 a9 ca d9 28 67 20 2b 3b 12 4c 87 d9 03 ff
   4d 5d 4a 87 11 5b d9 57 a4 c4 9e 72 48 7b 8e 77
   55 d2 97 6e be b4 d0 52 4f 9f c1 69 9e 74 57 84 
   22 bf 68 91 11 95 1a 7b c4 d3 73 e9 36 19 a5 5c 
   da b0 16 c5 7d 34 33 b1 e4 95 0b 6b 27 d8 32 28 
   1a a8 d4 31 83 90 8e 35 20 ed 88 d4 94 ed 82 74 
   08 92 e9 27 4c 0e 75 be e1 8c a2 f9 7d 79 9a 52 
   5e ca aa 55 0a e2 1e ec 2f 7b 9f d3 95 38 42 24 
   4a 4f 97 a3 92 c1 32 3f 14 2c 10 cc 5a 86 2d 69 
   46 f9 04 85 65 ac b1 8f 83 8e fa 22 32 80 a0 16 
   c5 43 55 63 97 70 c1 63 8a c5 12 e0 a3 0a e0 8c 
   51 7f bb 5d dd 53 b3 47 8d 50 58 9e 10 c6 4f b2`;

    let Request =null;

    let buffer=null;

    let sessionBuffer=null;

    let gpiosBuffer=null;

    let cellsBuffer=null;
    

   let fakeFileBytes1="";

    beforeAll(() => 
    {
        fakeFileBytesCell= fs.readFileSync('./test/testData/cellset_2.csv',  function(err, data) 
        {
            if (err) {console.log( err)}
            else
            {
              
                return data;
            }
        });

        fakeFileBytesSession= fs.readFileSync('./test/testData/cellset_2.json',  function(err, data) 
        {
            if (err) {console.log( err)}
            else
            {
              
                return data;
            }
        });


        fakeFileBytesGPIO= fs.readFileSync('./test/testData/cellset_2_GPIO.csv',  function(err, data) 
        {
            if (err) {console.log( err)}
            else
            {
              
                return data;
            }
        });


        jest.setTimeout(600000);
    
    });





    
    it("test Session model returns error in importDataFiles function",async()=>
    {
        buffer = Buffer.from(fakeFileBytes,'hex');

        Request =
        {
            files: 
            {
                file1: 
                {
                    name: 'cellset_1_GPIO.csv',
                    data: buffer,
             
                },
                file2: 
                {
                    name: 'cellset_1.json',
                    data: buffer,
             
                },
                file3: 
                {
                    name: 'cellset_1.csv',
                    data: buffer,
                }
            }
        }

       
        let mockReq = jest.fn().mockImplementation(Request);

        let mockRes = jest.fn();

        expect(mockReq.getMockImplementation().files.file2.name).toEqual("cellset_1.json");

        let value = await timeSeriesNeuralRepo.importDataFiles(mockReq.getMockImplementation(),mockRes);

        expect(value).toEqual({
            status: 200,
            statusDesc: 'unsuccesful',
            data: 'session.session_id  cannot be null,\n' +
                ' session.sampling_rate cannot be null,\n' +
                ' session.microscope_og_led_power cannot be null,\n' +
                ' session.microscope_ex_led_power cannot be null,\n' +
                ' session.experimenter_name cannot be null,\n' +
                ' session.animal_weight cannot be null,\n' +
                ' session.animal_sex cannot be null,\n' +
                ' session.animal_id  cannot be null,\n' +
                ' session.animal_date_of_birth cannot be null,\n' +
                ' session.acquisition_sw_version cannot be null,\n' +
                ' session.animal_species cannot be null',
                message: 'Unable to populate record into the table Successfully'
            });
      
    })

  
    it("test Session, Cell, and GPIO model did not return error",  async(done) => 
    {
        
        sessionBuffer = Buffer.from(fakeFileBytesSession,'hex');

        gpiosBuffer = Buffer.from(fakeFileBytesGPIO,'hex');

        cellsBuffer = Buffer.from(fakeFileBytesCell,'hex');

        Request =
        {
            files: 
            {
                file1: 
                {

                    name: 'cellset_2_GPIO.csv',
                    data: gpiosBuffer,
             
                },
                file2: 
                {

                    name: 'cellset_2.json',
                    data: sessionBuffer,
             
                },
                file3: 
                {
                    
                    name: 'cellset_2.csv',
                    data: cellsBuffer,
                }
            }
        }


        let mockReq = jest.fn().mockImplementation(Request);

        let mockRes = jest.fn();
    
        expect(mockReq.getMockImplementation().files.file2.name).toEqual("cellset_2.json");

        expect(mockReq.getMockImplementation().files.file1.name).toEqual("cellset_2_GPIO.csv");

        expect(mockReq.getMockImplementation().files.file3.name).toEqual("cellset_2.csv");
    
        let value = await timeSeriesNeuralRepo.importDataFiles(mockReq.getMockImplementation(),mockRes);
            
        expect(value).toEqual({
            status: 200,
            statusDesc: 'succesful',
            message: 'Record Populated into the table Successfully'
        });
           
        done();
 
    });

})
describe('test getSessionFullDetails function in timeSeriesNeuralRepo', function()
{
    it("test getSessionFullDetails called sequelize.query with no error",  async(done) => 
    {
        Request =
        {
            body:
            {
                "startDate": "2020-01-24",
                "endDate":"2020-01-27",
                "experimenterName":"Roger Sperry"
            }
        }





        let querySpy = jest.spyOn(sequelize,'query');
        let mockReq = jest.fn().mockImplementation(Request);

        let mockRes = jest.fn();
        
        let value = await timeSeriesNeuralRepo.getSessionFullDetails(mockReq.getMockImplementation(),mockRes);

        expect(querySpy).toHaveBeenCalledTimes(1);

        expect(value.status).toEqual(200);
      
        done();
        
    });

});

describe('test getFirstTwoCellsNeuralData function in timeSeriesNeuralRepo', function()
{
    it("test getFirstTwoCellsNeuralData called sequelize.query with no error",  async(done) => 
    {
        Request =
        {
            body:
            {
                "session_id": "RS_49",
             
            }
        }





        let querySpy = jest.spyOn(sequelize,'query');
        let mockReq = jest.fn().mockImplementation(Request);

        let mockRes = jest.fn();
        
        let value = await timeSeriesNeuralRepo.getFirstTwoCellsNeuralData(mockReq.getMockImplementation(),mockRes);

        expect(querySpy).toHaveBeenCalledTimes(3);

        expect(value.status).toEqual(200);

        
        done();
        
    });

});

describe('test getBoutMoment function in timeSeriesNeuralRepo', function()
{
    it("test getBoutMoment called sequelize.query with no error",  async(done) => 
    {
        Request =
        {
            body:
            {
                "session_id": "RS_49",
             
            }
        }





        let querySpy = jest.spyOn(sequelize,'query');
        let mockReq = jest.fn().mockImplementation(Request);

        let mockRes = jest.fn();
        
        let value = await timeSeriesNeuralRepo.getBoutMoment(mockReq.getMockImplementation(),mockRes);

        expect(querySpy).toHaveBeenCalledTimes(5);

        expect(value.status).toEqual(200);

        
        done();
        
    });

})
 




 

 
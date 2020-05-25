//jest.mock('../../app/repo/timeSeriesNeuralRepo');

var proxyquire = require('proxyquire');

var sinon = require('sinon');

var supertest = require('supertest');

var expect = require('chai').expect;

var express = require('express');

var express = require('express');

var app = require('../../index').setup();

const timeSeriesNeuralRepo = require('../../app/repo/timeSeriesNeuralRepo');

describe('GET /ping', function () 
{
  var importDataFilesStub, request, route;

  beforeEach(function () 
  {

    importDataFilesStub = sinon.stub();
    const importDataFilesMock = jest.fn();
    
    jest.setTimeout(600000);
    

    // Get a supertest instance so we can make requests
    request = supertest(app);
  });

  it('should respond with a 404 and a null', async(done) =>
  {
   
    let timeSeriesNeuralRepoSpy = jest.spyOn(timeSeriesNeuralRepo,'importDataFiles');

  /* timeSeriesNeuralRepo.importDataFiles.mockImplementation(()=> {
        
    return  {
      "status": 200,
      "statusDesc": "succesful",
      "data": {
          "objectType": "Class Object",
          "object": [
              {
                  "id": "c1cff038-d952-42fc-ac6b-3be44427d5b7",
                  "animal_date_of_birth": "12-01-2019",
                  "animal_id": "m_001",
                  "animal_sex": "m",
                  "animal_species": "C57-BL6",
                  "animal_weight": "20.5",
                  "experimenter_name": "Roger Sperry",
                  "microscope_ex_led_power": 0.4,
                  "microscope_og_led_power": 0.2,
                  "sampling_rate": 30,
                  "session_id": "RS_49",
                  "recording_start_time": "2020-01-24T13:30:10+00:00",
                  "acquisition_sw_version": "1.3.0"
              }
          ]
      },
      "message": "Record fecthed Successfully"
  }})
*/
  timeSeriesNeuralRepoSpy.mockReturnValue({
    "status": 200,
    "statusDesc": "succesful",
    "data": {
        "objectType": "Class Object",
        "object": [
            {
                "id": "c1cff038-d952-42fc-ac6b-3be44427d5b7",
                "animal_date_of_birth": "12-01-2019",
                "animal_id": "m_001",
                "animal_sex": "m",
                "animal_species": "C57-BL6",
                "animal_weight": "20.5",
                "experimenter_name": "Roger Sperry",
                "microscope_ex_led_power": 0.4,
                "microscope_og_led_power": 0.2,
                "sampling_rate": 30,
                "session_id": "RS_49",
                "recording_start_time": "2020-01-24T13:30:10+00:00",
                "acquisition_sw_version": "1.3.0"
            }
        ]
    },
    "message": "Record fecthed Successfully"
});
    request
      .post('/neuron/importSessionsFromLocation')
      .end(function(err, res) {
        console.log("---> ", err)
      });
    
  });
/*
  it('should respond with 200 and a user object', function (done) {
    var userData = {
      username: 'nodejs'
    };

    getUserStub.returns(userData);

    request
      .get('/users/nodejs')
      .expect('Content-Type', /json/)
      .expect(200, function (err, res) {
        expect(res.body).to.deep.equal({
          status: 'ok',
          data: userData
        });
        done();
      });
  });
  */
});
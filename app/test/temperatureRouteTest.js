const express = require("express");
const temperatureRepo = require('../repo/temperatureRepo');
const request = require('supertest');
const spy = require('spy');
const {  mockResponse } = require('mock-req-res');
const sinon = require('sinon');
var api = require('../routes/api/temperaturenRoute');

const temperatureList=[
    {
        "type": "Fahrenheit",
        "celsius": "1",
        "fahrenheit": 33.8
    } 
]

var data= 
{ 
    status: 200,
    statusDesc:"succesful", 
    data:temperatureList, 
    message: 'Service Request list fetched Successfully' 
}

describe('temperatureRoute Test', function() 
{
    let status, send, res, req;
    
    
    it('test for getTemperatureList', function() 
    {
        // Stub getTemperatureList function and make it return data always
        const getAllStub = sinon.stub(temperatureRepo, "getTemperatureList").returns(data);
        options={
            send: spy(),
            status: spy(),
        }

        const res = mockResponse(options)
        request(api)
        .get('/temperatureconversion/getTemperatureList',req,res)
        .expect(200)
    });

    it('test for temperatureConvertion', function() 
    {
        let status, send, res, req;
        req = {"params":{
            "convertionType":"Fahrenheit",
            "celsiusValue":150
        }};
        // Stub temperatureConvertion function and make it return converted temperature data always
        const getAllStub = sinon.stub(temperatureRepo, "temperatureConvertion").returns(data);
        options={
            send: spy(),
            status: spy(),
        }

        const res = mockResponse(options)
        request(api)
        .get('/temperatureconversion/convertTemperature',req,res)
        .expect(200)
    });
});


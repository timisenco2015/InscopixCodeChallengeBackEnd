require('dotenv').config('./app');
const Sequelize = require('sequelize');
var sequelize=null;

module.exports = new Sequelize(process.env.DATABASENAME, process.env.DATABSEUSER, process.env.DATABASEPASWWORD, 
{
    host: process.env.DATABASEHOST,
    dialect:  'postgres',
    operatorsAloases:false,
    logging: false
    /*pool:
    {
        max:5,
        min:0,
        acquire: 30000,
        idle:10000
    } 
    */
});
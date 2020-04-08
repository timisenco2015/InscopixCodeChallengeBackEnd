const Sequelize = require('sequelize');
const sequelize = require('../../app/config/database');
const Model = Sequelize.Model;

class Cells extends Model 
{}

Cells.init(
{
	
	id: 
	{
		
		
		type: Sequelize.UUID,
		
        defaultValue: Sequelize.UUIDV4
	},
	
	session_id: 
	{
		primaryKey: true,
		
		type: Sequelize.STRING,
			
		allowNull: false
		
	},

	cell_id: 
	{
		primaryKey: true,
		type: Sequelize.BIGINT,
		
		allowNull:false
	},


	column_id: 
	{
		primaryKey: true,
		type: Sequelize.STRING,
		allowNull: false
	},


		
	frames: 
	{
		  
		type: Sequelize.STRING,
		  
		allowNull:false
	},
}, 
{
				
	sequelize,
				
	modelName: 'cellstable'
				
});


module.exports  =Cells;


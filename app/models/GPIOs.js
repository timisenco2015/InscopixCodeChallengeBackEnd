const Sequelize = require('sequelize');
const sequelize = require('../../app/config/database');
const Model = Sequelize.Model;


class GPIOs extends Model{}


GPIOs.init(
{
			
		
	id: 
	{
		
		
		type: Sequelize.UUID,
		
        defaultValue: Sequelize.UUIDV4
    },	
	
	
	
	
	cell_column_id: 
	{
		primaryKey: true,
		type: Sequelize.BIGINT,
		allowNull: false
	
	},

	session_id: 
	{
		primaryKey: true,
		
		type: Sequelize.STRING,
			
		allowNull: false
		
	},

			
	channels: 
	{
			  
		type: Sequelize.STRING,
			  
		allowNull:false
	}
}, 
{
			
	sequelize,
			
	modelName: 'gpiostable'
			
});

module.exports  = GPIOs;


const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Model = Sequelize.Model;


class Sessions extends Model{  }


Sessions.init(
{
		
	id: 
	{
		
			
		type: Sequelize.UUID,
			
		defaultValue: Sequelize.UUIDV4
	},
	
	recording_start_time: 
	{
		type: Sequelize.STRING,
			
		allowNull:false
	
	},
	
	
	session_id: 
	{
		primaryKey: true,
		
		type: Sequelize.STRING,
			
		allowNull: false
		
	},

	sampling_rate: 
	{
			
		type: Sequelize.INTEGER,
			
		allowNull: false
		
	},
		
	microscope_og_led_power: 
	{
			
		type: Sequelize.DOUBLE,
			
		allowNull: false
		
	},

	microscope_ex_led_power: 
	{
			
		type: Sequelize.DOUBLE,
			
		allowNull: false
		
	},
		
	experimenter_name: 
	{
			
		type: Sequelize.STRING,
			
		allowNull: false
	},

	animal_weight: 
	{
			
		type: Sequelize.STRING,
			
		allowNull: false
		
	},

	animal_sex: 
	{
			
		type: Sequelize.STRING,
			
		allowNull: false
		
	},

	animal_id: 
	{
			
		type: Sequelize.STRING,
			
		allowNull: false
		
	},

	animal_date_of_birth: 
	{
			
		type: Sequelize.STRING,
			
		allowNull: false
		
	},

	acquisition_sw_version: 
	{
			
		type: Sequelize.STRING,
			
		allowNull: false
		
	},
	
	animal_species: 
	{
			
		type: Sequelize.STRING,
			
		allowNull: false
		
	}
	}, 
	{
			
		sequelize,
			
		modelName: 'sessionstable'
			
	});

	
module.exports  = Sessions;





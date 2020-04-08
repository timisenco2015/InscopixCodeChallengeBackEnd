class GPIO
{
    constructor()
    {

    }

    setSessionId(session_id) 
	{
		this.session_id = session_id;
	}


	getSessionId() 
	{
		return session_id;
	}

	
	getId() 
	{
		return this.id;
	}

	
	setId(id) 
	{
		this.id = id;
	}
	
	
	
	getChannels() 
	{
		return this.channels;
	}
	
	
	setChannels(channels) 
	{
		this.channels = channels;
	}


	getCellColumnId() 
	{
		return this.cell_column_id;
	}
	
	
	setCellColumnId(cell_column_id) 
	{
		this.cell_column_id = cell_column_id;
	}
		

}

module.exports  =GPIO;
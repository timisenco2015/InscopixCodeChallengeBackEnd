class Cell
{
    constructor()
    {

    }

    getId() 
	{
		return this.id;
	}

	
	setId(id) 
	{
		this.id = id;
	}
	
	


    setCellId(cell_id) 
    {
		this.cell_id = cell_id;
	}


	getCellId() 
	{
		return this.cell_id;
	}


    setSessionId(session_id) 
	{
		this.session_id = session_id;
	}


	getSessionId() 
	{
		return session_id;
	}


	getColumnId() 
	{
		return this.column_id;
	}
	
	
	
	seColumnId(column_id) 
	{
		this.column_id = column_id;
	}


	
	getFrames() 
	{
		return this.frames;
	}
	
	
	
	setFrames(frames) 
	{
		this.frames = frames;
	}
		

}

module.exports  =Cell;
const Sessions = require('./Sessions');
const Cells = require('../../app/models/Cells');
const GPIOs = require('../../app/models/GPIOs');

// Synchronized seesion model
Sessions.sync({  });

//Foreign keys declaration

//Sessions.hasMany(Cells, {foreignKey: 'session_id',targetKey: 'session_id' });

//Sessions.hasMany(GPIOs, { foreignKey: 'session_id',targetKey: 'session_id' });

Cells.belongsTo(Sessions, { foreignKey: 'session_id',targetKey: 'session_id' });

GPIOs.belongsTo(Sessions, { foreignKey: 'session_id',targetKey: 'session_id' });


//Synchronized all models
Cells.sync({  });

GPIOs.sync({  });








var Connection = require('tedious').Connection;
var config = {
    server: 'az-uor-ss-sql-server.database.windows.net',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'az-sql-admin', //update me
            password: 'Pasindu328@'  //update me
        }
    },
    options: {
        // If you're on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'db'  //update me
    }
};
var connection = new Connection(config);
connection.on('connect', (err) => {
    if (err) {
        console.error('Connection failed:', err);
    } else {
        console.log('Connected to Azure SQL Database!');
        // executeStatement();
    }
});

connection.connect();
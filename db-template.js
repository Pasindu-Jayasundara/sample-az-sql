var Connection = require('tedious').Connection;
var config = {
    server: process.env.AZURE_SQL_SERVER || 'your-server.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: process.env.AZURE_SQL_USER || 'your-username',
            password: process.env.AZURE_SQL_PASSWORD || 'your-password'
        }
    },
    options: {
        // If you're on Microsoft Azure, you need encryption:
        encrypt: true,
        database: process.env.AZURE_SQL_DATABASE || 'your-database-name'
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

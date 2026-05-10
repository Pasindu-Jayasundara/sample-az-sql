import { Connection } from "tedious";

const config = {
    server: "az-uor-ss-sql-server.database.windows.net",
    authentication: {
        type: "default",
        options: {
            userName: "az-sql-admin",
            password: "Pasindu328@"
        }
    },
    options: {
        encrypt: true,
        database: "db"
    }
};

const con = new Connection(config);

export default con;
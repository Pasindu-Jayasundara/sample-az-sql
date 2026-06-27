import { Connection } from "tedious";

const config = {
    server: "asm02.database.windows.net",
    authentication: {
        type: "default",
        options: {
            userName: "pasindu328@",
            password: "Bhathiya28@"
        }
    },
    options: {
        encrypt: true,
        database: "free-sql-db-8739882"
    }
};

const con = new Connection(config);

export default con;
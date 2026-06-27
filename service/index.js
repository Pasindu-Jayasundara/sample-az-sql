import { Request, TYPES } from "tedious"
import con from "../db.js";

export const getAllUsersFromDB = () => {

    return new Promise((resolve, reject) => {


        const users = [];

        const req = new Request("select * from dbo.[User]", (err) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            }
        });

        req.on('row', (row) => {

            const user = {};
            row.forEach(column => {
                user[column.metadata.colName] = column.value;
            });
            users.push(user);
        });

        req.on('requestCompleted', () => {
            console.log('Query execution completed.');
            resolve(users);
        });

        con.execSql(req);

    });
}

export const addNewUserToDB = (first_name, last_name) => {

    return new Promise((resolve,reject) => {

        const query = `insert into dbo.[User] (first_name, last_name) values (@first_name, @last_name)`;

        const req = new Request(query, (err)=>{
            if(err){
                console.error('Error executing query:', err);
                reject(err);
            }
        });
        req.addParameter('first_name', TYPES.NVarChar, first_name);
        req.addParameter('last_name', TYPES.NVarChar, last_name);

        req.on('requestCompleted', () => {
            console.log('Query execution completed.');
            resolve();
        });

        con.execSql(req);

    });
}

export const updateUserInDB = (id, first_name, last_name) => {

    return new Promise((resolve,reject)=>{

        const query = `update dbo.[User] set first_name=@first_name, last_name=@last_name where Id=@id`;

        const req = new Request(query, (err)=>{
            if(err){
                console.error('Error executing query:', err);
                reject(err);
            }
        })

        req.addParameter('id',TYPES.Int, id);
        req.addParameter('first_name', TYPES.NVarChar, first_name);
        req.addParameter('last_name', TYPES.NVarChar, last_name);

        req.on('requestCompleted',()=>{
            console.log('Query execution completed.');
            resolve();
        })

        con.execSql(req);
    });
}

export const deleteUserFromDB = (id) => {

    return new Promise((resoleve,reject)=>{

        const query = `delete from dbo.[User] where Id=@id`;

        const req = new Request(query, (err)=>{
            if(err){
                console.error('Error executing query:', err);
                reject(err);
            }
        })

        req.addParameter('id',TYPES.Int, id);

        req.on('requestCompleted',()=>{
            console.log('Query execution completed.');
            resoleve();
        });

        con.execSql(req);
    });
}
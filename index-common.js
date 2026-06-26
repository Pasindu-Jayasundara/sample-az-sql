const { Connection } = require("tedious");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes");
const con = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

con.on("connect", (error) => {
    if (error) {
        console.error("Connection failed:", error);
    } else {
        console.log("Connected to Azure SQL Database!");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    }
});

con.connect();
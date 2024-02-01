// imports
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2/promise')

// api route imports
const Oculars = require('./routes/oculars')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

let pool

function createDBPool() {
    pool = mysql.createPool({
        user: 'root',
        port: 3306,
        host: 'localhost',
        database: 'greesalesconnect',
        password: '12345',
        connectionLimit: 10, // Adjust as needed
        waitForConnections: true,
        queueLimit: 0,
    });
}


/*
Developer Notes - 

here is a sample code snippet to call a fetch query in routes
const data = await fetchData('SELECT * FROM td_oculars', [])

*/
const query = async function query(query, data) {
    createDBPool()
    let connection;
    try {
        connection = await pool.getConnection()
        const [rows] = await connection.execute(query, [data])
        return rows
    } catch (error) {
        console.error('Error: ', error)
        throw error
    } finally {
        if (connection) {
            connection.release()
        }
    }
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// log tracker - middleware
app.use((req, res, next) => {
    console.log(req.path, res.method);
    next();
});

// API
app.use('/api', Oculars(query));

app.listen(4000, () => {
    console.log("Server is RUNNING ON PORT 4000");
});
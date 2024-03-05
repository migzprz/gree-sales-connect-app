// imports
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2/promise')

// api route imports
const Oculars = require('./routes/oculars')
const Common = require('./routes/common')
const Quotation = require('./routes/quotations')
const Clients = require('./routes/clients')
const Employees = require('./routes/employees')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

function createDBPool() {
    // TODO: add condition checker to select between different role pools for table level security
    // TODO: add condition checker to not create a new pool if the details are the same
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
    // TODO: call createDBPool w/ udpated functionality
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.execute(query, data)
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

createDBPool()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// log tracker - middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// API
app.use('/api', Oculars(query));
app.use('/api', Common(query));
app.use('/api', Quotation(query));
app.use('/api', Clients(query));
app.use('/api', Employees(query));

app.listen(4000, () => {
    console.log("Server is RUNNING ON PORT 4000");
});
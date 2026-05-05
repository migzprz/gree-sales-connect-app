// imports
const path = require("path");
const dotenv = require("dotenv");
// Try loading .env.local first, then fall back to .env
const envLocalPath = path.resolve(__dirname, ".env.local");
const localResult = dotenv.config({ path: envLocalPath });
if (localResult.error) {
	console.warn("No .env.local loaded, falling back to .env if present");
	dotenv.config();
} else {
	console.log("Loaded environment from .env.local");
}

// Normalize some env values (strip surrounding quotes/braces, trim whitespace)
function normalizeEnvVars() {
	if (process.env.DB_HOST) {
		process.env.DB_HOST = process.env.DB_HOST.replace(/^['"]|['"]$/g, "");
	}
	if (process.env.DB_CONNECTION_LIMIT) {
		process.env.DB_CONNECTION_LIMIT = process.env.DB_CONNECTION_LIMIT.replace(
			/[{}]/g,
			"",
		);
	}
	if (process.env.JWT_SECRET) {
		process.env.JWT_SECRET = process.env.JWT_SECRET.trim();
	}
}
normalizeEnvVars();
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2/promise");
const session = require("express-session"); // Add this line to import the session middleware

// DB pool (declared here so other functions can use it)
let pool;

// api route imports
const Oculars = require("./routes/oculars");
const Common = require("./routes/common");
const Quotation = require("./routes/quotations");
const Clients = require("./routes/clients");
const Employees = require("./routes/employees");
const Products = require("./routes/products");
const Executive = require("./routes/executive");
const Sales = require("./routes/sales");
const Aftersales = require("./routes/aftersales");
const AuthRoute = require("./routes/authRoute");

app.use(
	cors({
		origin: process.env.ROOT_URL,
		credentials: true,
	}),
);

function createDBPool() {
	// TODO: add condition checker to select between different role pools for table level security
	// TODO: add condition checker to not create a new pool if the details are the same
	pool = mysql.createPool({
		user: process.env.DB_USER,
		port: parseInt(process.env.DB_PORT, 10) || 3306,
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10, // Adjust as needed
		waitForConnections: true,
		queueLimit: 0,
	});
}

// Mask password for logs
function maskPassword(pw) {
	if (!pw) return "";
	return "*****";
}

// Run a quick test query to validate connectivity and show DB values
async function testDBConnection() {
	let connection;
	try {
		connection = await pool.getConnection();
		const [rows] = await connection.query(
			"SELECT DATABASE() AS database_name, USER() AS user, VERSION() AS version, NOW() AS now",
		);
		console.log("DB connection test successful. Details:");
		console.log("- host:", process.env.DB_HOST);
		console.log("- port:", process.env.DB_PORT);
		console.log("- user:", process.env.DB_USER);
		console.log("- password:", maskPassword(process.env.DB_PASSWORD));
		console.log("- database (reported):", rows[0].database_name);
		console.log("- user (reported):", rows[0].user);
		console.log("- version:", rows[0].version);
		console.log("- now:", rows[0].now);
	} catch (err) {
		console.log("ENV CHECK:", process.env.DB_USER, process.env.DB_PASSWORD);
		console.error("DB connection test failed:", err.message || err);
	} finally {
		if (connection) connection.release();
	}
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
		const [rows, fields] = await connection.execute(query, data);
		return rows;
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	} finally {
		if (connection) {
			connection.release();
		}
	}
};

createDBPool();
// Run a quick test to confirm DB connectivity and print reported values
testDBConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// log tracker - middleware
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// Configure session middleware
app.use(
	session({
		secret: "mysecret",
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000, // 1 day
			sameSite: "None",
		},
	}),
);

// API
app.use("/api", Oculars(query));
app.use("/api", Common(query));
app.use("/api", Quotation(query));
app.use("/api", Clients(query));
app.use("/api", Employees(query));
app.use("/api", Products(query));
app.use("/api", Executive(query));
app.use("/api", Sales(query));
app.use("/api", Aftersales(query));
app.use("/api", AuthRoute(query));

app.listen(4000, () => {
	console.log("Server is RUNNING ON PORT 4000");
});

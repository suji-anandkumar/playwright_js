import * as ibm_db from "ibm_db";

const hostname = "your_as400_hostname";
const database = "your_database_name";
const username = "your_username";
const password = "your_password";
const connString = `DATABASE=${database};HOSTNAME=${hostname};PORT=50000;PROTOCOL=TCPIP;UID=${username};PWD=${password};`;
const connection = ibm_db.openSync(connString);
const sqlQuery = "SELECT * FROM your_table";
const stmt = connection.querySync(sqlQuery);|
while (stmt.fetchSync()) {
    const row = stmt.fetchRowSync();
    // Process the fetched row
}
connection.closeSync();

const connection = mysql.createConnection({
    host: "your_host",
    user: "your_username",
    password: "your_password",
    database: "your_database"
});
connection.connect((error) => {
    if (error) {
        console.error("Error connecting:", error);
        return;
    }
    console.log("Connected to the database!");
    // Perform database operations here
    connection.end(); // Close the connection when done
});
const sqlQuery = "SELECT * FROM your_table";
connection.query(sqlQuery, (queryError, result) => {
    if (queryError) {
        console.error("Query error:", queryError);
        return;
    }

    // Process the query results
    console.log("Query results:", result);
});

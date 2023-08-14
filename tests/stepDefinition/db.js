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


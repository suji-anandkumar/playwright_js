import * as fs from 'fs';
import * as xml2js from 'xml2js';

// Define a synchronous function to read and parse XML data
function readAndParseXmlFileSync(xmlFilePath: string): any {
    try {
        // Read the XML data from the file
        const xmlData = fs.readFileSync(xmlFilePath, 'utf-8');

        // Parse the XML data using xml2js
        const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
        const parsedData = parser.parseStringSync(xmlData);

        return parsedData;
    } catch (error) {
        throw new Error(`Error parsing XML: ${error}`);
    }
}

// Define a function to extract text content based on the specified XML path
function extractTextContentFromXml(xmlData: any, xmlPath: string): string {
    try {
        const pathElements = xmlPath.split('/');
        let value = xmlData;

        for (const element of pathElements) {
            if (element && value && value[element]) {
                value = value[element];
            } else {
                return 'Not found';
            }
        }

        if (typeof value === 'string') {
            return value;
        } else {
            return 'Not found';
        }
    } catch (error) {
        throw new Error(`Error extracting text content: ${error}`);
    }
}

// Usage example:
const xmlFilePath = 'path/to/xml/file.xml';
const xmlPath = 'test.test1.name.id'; // Replace with your desired XML path

try {
    // Read and parse the XML file
    const xmlResult = readAndParseXmlFileSync(xmlFilePath);

    // Extract text content based on the specified XML path
    const textContent = extractTextContentFromXml(xmlResult, xmlPath);

    // Now you have the text content as a string
    console.log('Text Content:', textContent);
} catch (error) {
    console.error(error);
}


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

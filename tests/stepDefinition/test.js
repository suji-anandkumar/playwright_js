import * as fs from 'fs';
import * as xml2js from 'xml2js';

// Define a function to read XML data from a file
function readXmlFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8');
}

// Define a function to extract text content using an XPath-like expression
async function extractTextContent(xmlData: string, relativeXPath: string): Promise<string> {
    try {
        // Parse the XML data using xml2js
        const parsedData = await xml2js.parseStringPromise(xmlData);

        // Use the relativeXPath to navigate and extract the text content
        const result = getObjectByXPath(parsedData, relativeXPath);

        if (result) {
            return result;
        } else {
            return 'Not found';
        }
    } catch (error) {
        throw new Error(`Error extracting text content: ${error}`);
    }
}

// Helper function to navigate the XML structure using XPath-like syntax
function getObjectByXPath(obj: any, xpath: string): any {
    const parts = xpath.split('/');
    let current = obj;

    for (const part of parts) {
        if (!current || !current.hasOwnProperty(part)) {
            return null;
        }
        current = current[part];
    }

    return current;
}

// Usage example:
const xmlFilePath = 'path/to/xml/file.xml';
const relativeXPath = 'test/test1/name/id'; // Replace with your desired relative XPath

try {
    // Read XML data from the file
    const xmlData = readXmlFile(xmlFilePath);

    // Extract text content using the relativeXPath
    const textContent = await extractTextContent(xmlData, relativeXPath);

    // Now you have the text content as a string
    console.log('Text Content:', textContent);
} catch (error) {
    console.error(error);
}

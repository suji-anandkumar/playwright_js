import * as fs from 'fs';
import * as xml2js from 'xml2js';

// Define a function to read XML data from a file
function readXmlFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8');
}

// Define a function to extract text content using an XPath-like expression
async function extractTextContent(xmlData: string, relativeXPath: string): Promise<string | null> {
    try {
        // Parse the XML data using xml2js
        const parsedData = await xml2js.parseStringPromise(xmlData);

        // Use the relativeXPath to navigate and extract the text content
        const result = traverseXml(parsedData, relativeXPath);

        if (result !== null) {
            return result;
        } else {
            return 'Not found';
        }
    } catch (error) {
        throw new Error(`Error extracting text content: ${error}`);
    }
}

// Define a function to recursively traverse the parsed XML object
function traverseXml(parsedData: any, relativePath: string): string | null {
    const parts = relativePath.split('/');
    let current = parsedData;

    for (const part of parts) {
        if (part && current[part]) {
            current = current[part];
        } else {
            return null;
        }
    }

    if (typeof current === 'string') {
        return current;
    } else {
        return null;
    }
}

// Usage example:
const xmlFilePath = 'path/to/xml/file.xml';
const relativeXPath = '//tradeDate'; // Use your desired relative XPath

try {
    // Read XML data from the file
    const xmlData = readXmlFile(xmlFilePath);

    // Extract text content using the relativeXPath
    extractTextContent(xmlData, relativeXPath)
        .then((textContent) => {
            if (textContent !== null) {
                // Now you have the text content as a string
                console.log('Text Content:', textContent);
            } else {
                console.log('Text Content not found');
            }
        })
        .catch((error) => {
            console.error(error);
        });
} catch (error) {
    console.error(error);
}

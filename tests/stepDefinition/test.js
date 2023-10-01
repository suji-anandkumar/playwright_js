import * as fs from 'fs';
import * as fastXmlParser from 'fast-xml-parser';

// Define a synchronous function to read and parse XML data
function readAndParseXmlFileSync(xmlFilePath: string): any {
    try {
        // Read the XML data from the file
        const xmlData = fs.readFileSync(xmlFilePath, 'utf-8');

        // Parse the XML data using fast-xml-parser
        const options = {
            attributeNamePrefix: '@',
            ignoreAttributes: false,
            parseAttributeValue: true,
        };
        const parsedData = fastXmlParser.parse(xmlData, options);

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
const xmlPath = 'test/test1/name/id'; // Replace with your desired XML path

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

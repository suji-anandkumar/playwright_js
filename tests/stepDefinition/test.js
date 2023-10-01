import * as xml2js from 'xml2js';

// Define a function to extract text content using a relative XPath expression
function extractTextFromXmlWithDoubleSlash(xmlData: string, relativeXPath: string): string | null {
    try {
        // Parse the XML data using xml2js
        const parsedData = xml2js.xml2js(xmlData, { compact: false });

        // Remove any leading slash from the relativeXPath
        const cleanedRelativeXPath = relativeXPath.startsWith('//') ? relativeXPath.substring(2) : relativeXPath;

        // Split the cleaned relativeXPath into parts
        const parts = cleanedRelativeXPath.split('/');

        // Function to recursively traverse the parsed XML object
        const traverseXml = (current: any, index: number): string | null => {
            if (!current || !current.elements) {
                return null;
            }

            const part = parts[index];
            const element = current.elements.find((el: any) => el.name === part);

            if (!element) {
                return null;
            }

            if (index === parts.length - 1) {
                return element.elements[0]?.text || null;
            }

            return traverseXml(element, index + 1);
        };

        // Start traversal from the root element
        const textContent = traverseXml(parsedData, 0);

        if (textContent !== null) {
            return textContent;
        } else {
            return 'Not found';
        }
    } catch (error) {
        throw new Error(`Error extracting text content: ${error}`);
    }
}

// Usage example:
const xmlData = '<notification><date><newDate><tradeDate>2023-09-30</tradeDate></newDate></date></notification>';
const relativeXPath = '//tradeDate'; // Use your desired relative XPath

const textContent = extractTextFromXmlWithDoubleSlash(xmlData, relativeXPath);

if (textContent !== null) {
    console.log('Text Content:', textContent);
} else {
    console.log('Text Content not found');
}

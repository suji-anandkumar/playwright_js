import xml.etree.ElementTree as ET

def extract_numeric_part(xml_file_path, relative_path):
    # Parse the XML file
    tree = ET.parse(xml_file_path)
    root = tree.getroot()

    # Find the element with the href attribute at the relative path
    party_details = root.find(relative_path)

    if party_details is not None:
        # Get the value of the href attribute
        href_value = party_details.get("href")

        if href_value and href_value.startswith("p"):
            # Extract the numeric part
            numeric_part = href_value[1:]
            return numeric_part
    return None

if __name__ == "__main__":
    # Path to the XML file
    xml_file_path = "path/to/your/xmlfile.xml"  # Replace with the actual file path

    # Specify the relative path to the 'partydetails' element
    relative_path = "your/relative/path/partydetails"

    numeric_part = extract_numeric_part(xml_file_path, relative_path)

    if numeric_part is not None:
        print(numeric_part)
    else:
        print("Unable to extract numeric part.")

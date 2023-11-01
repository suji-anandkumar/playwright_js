import xml.etree.ElementTree as ET

# Path to the XML file
xml_file_path = "path/to/your/xmlfile.xml"  # Replace with the actual file path

# Parse the XML file
tree = ET.parse(xml_file_path)
root = tree.getroot()

# Specify the relative path to the 'partydetails' element
relative_path = "your/relative/path/partydetails"

# Find the element with the href attribute at the relative path
party_details = root.find(relative_path)

# Get the value of the href attribute
href_value = party_details.get("href")

# Extract the numeric part
numeric_part = href_value.lstrip('p')

print(numeric_part)

# locations.py

import math

# Define the coordinates
locations = {
    "Main Gate": (85, 108),
    "Civil Department": (88, 85),
    "Kotak Bank": (100, 103),
    "Ground": (120, 74),
    "EEE dept": (110, 65),
    "ECE dept": (110, 55),
    "Telecom": (90, 45),
    "CSE dept": (120, 68),
    "Krishna Hostel": (105, 48),
    "Health Centre": (135, 54),
    "Cauvery hostel": (127, 35),
    "IDRC": (120, 30),
    "Math dept": (130, 30),
    "Small Mingos": (110, 40),
    "Library": (80, 20),
    "Chem and phy dept": (77, 45),
    "Kriyakalpa": (70, 70),
    "RVU": (70, 60),
    "Thoda Aur": (80, 55),
    "Admin Block": (55, 88),
    "R &D Centre": (35, 88),
    "DTH": (25, 95),
    "Mech Dept": (23, 75),
    "Biotech Quadrangle": (23, 55),
    "Green House": (23, 42),
    "Sports Club": (23, 30),
}

# Define logical pathways with distances
raw_connections = {
    "Main Gate": ["Civil Department", "Kotak Bank", "Admin Block"],
    "Civil Department": ["Main Gate", "Ground", "Kotak Bank"],
    "Kotak Bank": ["Main Gate", "Civil Department", "Ground", "EEE dept"],
    "Ground": ["Civil Department", "Kotak Bank", "EEE dept", "CSE dept"],
    "EEE dept": ["Kotak Bank", "Ground", "ECE dept", "CSE dept"],
    "ECE dept": ["EEE dept", "Telecom", "Krishna Hostel"],
    "Telecom": ["ECE dept", "Krishna Hostel", "Library"],
    "CSE dept": ["Ground", "EEE dept", "Health Centre"],
    "Krishna Hostel": ["ECE dept", "Telecom", "Health Centre", "Small Mingos"],
    "Health Centre": ["CSE dept", "Krishna Hostel", "Cauvery hostel"],
    "Cauvery hostel": ["Health Centre", "IDRC", "Math dept"],
    "IDRC": ["Cauvery hostel", "Math dept", "Small Mingos"],
    "Math dept": ["Cauvery hostel", "IDRC", "Library"],
    "Small Mingos": ["Krishna Hostel", "IDRC", "Library"],
    "Library": ["Small Mingos", "Telecom", "Math dept", "Chem and phy dept"],
    "Chem and phy dept": ["Library", "Kriyakalpa", "RVU"],
    "Kriyakalpa": ["Chem and phy dept", "RVU", "Admin Block"],
    "RVU": ["Kriyakalpa", "Chem and phy dept", "Thoda Aur"],
    "Thoda Aur": ["RVU", "Library", "Admin Block"],
    "Admin Block": ["Main Gate", "Kriyakalpa", "R &D Centre"],
    "R &D Centre": ["Admin Block", "DTH"],
    "DTH": ["R &D Centre", "Mech Dept"],
    "Mech Dept": ["DTH", "Biotech Quadrangle"],
    "Biotech Quadrangle": ["Mech Dept", "Green House"],
    "Green House": ["Biotech Quadrangle", "Sports Club"],
    "Sports Club": ["Green House"],
}

# Calculate distances
connections_with_distances = {}
for location, neighbors in raw_connections.items():
    connections_with_distances[location] = []
    for neighbor in neighbors:
        x1, y1 = locations[location]
        x2, y2 = locations[neighbor]
        distance = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
        connections_with_distances[location].append((neighbor, round(distance, 2)))

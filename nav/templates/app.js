window.onload = function() {
    const canvas = document.getElementById('campusMap');
    const ctx = canvas.getContext('2d');

    const locations = {
        "Main Gate": { x: 85, y: 108 },
        "Civil Department": { x: 88, y: 85 },
        "Kotak Bank": { x: 100, y: 103 },
        "Ground": { x: 120, y: 74 },
        "EEE dept": { x: 110, y: 65 },
        "ECE dept": { x: 110, y: 55 },
        "Telecom": { x: 90, y: 45 },
        "CSE dept": { x: 120, y: 68 },
        "Library": { x: 80, y: 20 },
        // Add other locations here
    };

    // Function to draw a path
    function drawPath(path) {
        if (path && path.length > 1) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas before drawing new path
            for (let i = 0; i < path.length - 1; i++) {
                const startLoc = locations[path[i]];
                const endLoc = locations[path[i + 1]];

                if (startLoc && endLoc) {
                    ctx.beginPath();
                    ctx.moveTo(startLoc.x, startLoc.y);
                    ctx.lineTo(endLoc.x, endLoc.y);
                    ctx.stroke();
                }
            }
        }
    }

    // Function to send a navigation request to the server
    function navigate(start, destination) {
        const data = {
            start: start,
            destination: destination
        };

        fetch('/navigate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.path) {
                drawPath(data.path);  // Draw the path returned by the backend
            } else {
                alert(data.error || 'Error finding path');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error connecting to server');
        });
    }

    // Example usage: Navigate from "Main Gate" to "Ground"
    document.getElementById('navigateBtn').addEventListener('click', function() {
        const startLocation = document.getElementById('startLocation').value;
        const endLocation = document.getElementById('endLocation').value;

        if (startLocation && endLocation) {
            navigate(startLocation, endLocation);
        } else {
            alert('Please select start and destination locations');
        }
    });
};

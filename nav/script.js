// Priority Queue Class for Dijkstra's Algorithm
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(value, priority) {
    this.queue.push({ value, priority });
    this.queue.sort((a, b) => a.priority - b.priority); // Sort by priority
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

// Global variables for selected locations
window.startLocation = null;
window.endLocation = null;

document.querySelectorAll('.building').forEach(location => {
  location.addEventListener('click', () => {
    if (!window.startLocation) {
      window.startLocation = location.id;
      location.classList.add('highlighted');
      alert(`Start Location: ${location.id}`);
    } else if (!window.endLocation) {
      window.endLocation = location.id;
      location.classList.add('highlighted');
      alert(`End Location: ${location.id}`);
      calculatePath();
    }
  });
});

// Campus Map (Graph)
const campusMap = {
  "admin-block": { "cse-dept": 5, "library": 10 },
  "cse-dept": { "admin-block": 5, "library": 3, "health-centre": 4 },
  "library": { "admin-block": 10, "cse-dept": 3, "health-centre": 7 },
  "health-centre": { "cse-dept": 4, "library": 7, "football-ground": 6 },
  "football-ground": { "health-centre": 6, "hostel-krishna": 8 },
  "hostel-krishna": { "football-ground": 8, "hostel-cauvery": 7 },
  "hostel-cauvery": { "hostel-krishna": 7 },
  // Add more locations and paths here...
};

// Dijkstra's Algorithm
function dijkstra(graph, start, end) {
  const distances = {};
  const previous = {};
  const queue = new PriorityQueue();

  // Initialize distances and queue
  for (let node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
    queue.enqueue(node, Infinity);
  }
  distances[start] = 0;
  queue.enqueue(start, 0);

  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue().value;
    if (currentNode === end) break;

    for (let neighbor in graph[currentNode]) {
      const alt = distances[currentNode] + graph[currentNode][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = currentNode;
        queue.enqueue(neighbor, distances[neighbor]);
      }
    }
  }

  // Reconstruct the path
  const path = [];
  let node = end;
  while (node !== null) {
    path.unshift(node);
    node = previous[node];
  }
  return path;
}

// Draw the path
function drawPath(path) {
  const svg = document.getElementById('path-visualization');
  svg.innerHTML = ''; // Clear previous paths

  // Coordinates for the locations (You can adjust these based on your layout)
  const coordinates = {
    "admin-block": { x: 100, y: 50 },
    "cse-dept": { x: 200, y: 50 },
    "library": { x: 300, y: 50 },
    "health-centre": { x: 200, y: 150 },
    "football-ground": { x: 100, y: 200 },
    "hostel-krishna": { x: 50, y: 300 },
    "hostel-cauvery": { x: 150, y: 300 },
  };

  for (let i = 0; i < path.length - 1; i++) {
    const startLoc = path[i];
    const endLoc = path[i + 1];

    const startCoords = coordinates[startLoc];
    const endCoords = coordinates[endLoc];

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startCoords.x);
    line.setAttribute('y1', startCoords.y);
    line.setAttribute('x2', endCoords.x);
    line.setAttribute('y2', endCoords.y);
    line.setAttribute('stroke', 'blue');
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);
  }
}

// Calculate and display the path
function calculatePath() {
  if (window.startLocation && window.endLocation) {
    const path = dijkstra(campusMap, window.startLocation, window.endLocation);
    drawPath(path);
  }
}

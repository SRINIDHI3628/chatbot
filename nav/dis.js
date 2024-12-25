// import heapq

// # Define connections with distances (weights)
// connections = {
//     "Main Gate": [("Civil Department", 10), ("Kotak Bank", 15), ("Admin Block", 20)],
//     "Civil Department": [("Main Gate", 10), ("Kotak Bank", 10), ("Ground", 15)],
//     "Kotak Bank": [("Main Gate", 15), ("Civil Department", 10), ("Ground", 10), ("EEE dept", 5)],
//     # ... Add all connections with distances
// }

// def find_shortest_path(connections, start, destination):
//     # Priority queue for exploring paths
//     priority_queue = [(0, start)]  # (distance, node)
//     visited = set()
//     distances = {node: float('inf') for node in connections}
//     previous = {node: None for node in connections}

//     # Set starting distance to 0
//     distances[start] = 0

//     while priority_queue:
//         current_distance, current_node = heapq.heappop(priority_queue)

//         if current_node in visited:
//             continue
//         visited.add(current_node)

//         # Stop if we reach the destination
//         if current_node == destination:
//             break

//         # Explore neighbors
//         for neighbor, weight in connections[current_node]:
//             if neighbor in visited:
//                 continue
//             new_distance = current_distance + weight
//             if new_distance < distances[neighbor]:
//                 distances[neighbor] = new_distance
//                 previous[neighbor] = current_node
//                 heapq.heappush(priority_queue, (new_distance, neighbor))

//     # Reconstruct the path
//     path = []
//     current = destination
//     while current:
//         path.append(current)
//         current = previous[current]
//     path.reverse()

//     return path, distances[destination]

// # Example usage:
// start = "Main Gate"
// destination = "Ground"
// path, distance = find_shortest_path(connections, start, destination)
// print(f"Shortest path: {path}")
// print(f"Total distance: {distance}")

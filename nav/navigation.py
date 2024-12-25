# navigation.py

import heapq
from locations import connections_with_distances

def shortest_path(graph, start, end):
    # Priority queue for Dijkstra's Algorithm
    queue = []
    heapq.heappush(queue, (0, start, [start]))  # (distance, current_location, path)
    visited = set()

    while queue:
        current_distance, current_location, path = heapq.heappop(queue)
        
        # If we reach the destination
        if current_location == end:
            return path, current_distance
        
        if current_location in visited:
            continue
        visited.add(current_location)

        # Explore neighbors
        for neighbor, distance in graph[current_location]:
            if neighbor not in visited:
                heapq.heappush(queue, (current_distance + distance, neighbor, path + [neighbor]))
    
    return None, float('inf')  # If no path exists

# Test the function
if __name__ == "__main__":
    # User inputs
    current_location = "Main Gate"
    destination = "Library"

    # Find the shortest path
    path, total_distance = shortest_path(connections_with_distances, current_location, destination)

    if path:
        print(f"Shortest Path: {' -> '.join(path)}")
        print(f"Total Distance: {total_distance:.2f} units")
    else:
        print("No path found between the locations.")

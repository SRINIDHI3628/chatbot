from flask import Flask, request, jsonify ,render_template
from locations import connections_with_distances
from navigation import shortest_path

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/navigate', methods=['POST'])
def navigate():
    data = request.json
    start = data.get('start')
    destination = data.get('destination')

    # Find shortest path
    if start and destination:
        path, total_distance = shortest_path(connections_with_distances, start, destination)
        if path:
            return jsonify({
                "path": path,
                "distance": total_distance
            })
        else:
            return jsonify({
                "error": "No path found between the specified locations."
            }), 404
    return jsonify({"error": "Invalid input"}), 400



if __name__ == '__main__':
    app.run(debug=True)

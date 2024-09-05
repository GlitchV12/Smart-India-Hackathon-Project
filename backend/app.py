from flask import Flask, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/routes', methods=['GET'])
def get_routes():
    with open('data/routes.json') as routes_file:
        routes_data = json.load(routes_file)
    return jsonify(routes_data)

@app.route('/api/schedules/<int:route_id>', methods=['GET'])
def get_schedules(route_id):
    with open('data/schedules.json') as schedules_file:
        schedules_data = json.load(schedules_file)
    return jsonify(schedules_data.get(str(route_id), []))

@app.route('/map/<int:route_id>', methods=['GET'])
def get_map(route_id):
    import folium
    m = folium.Map(location=[28.6139, 77.2090], zoom_start=12)  # Centered on Delhi
    # Add more folium code here to add route-specific details
    map_html = 'map.html'
    m.save(map_html)
    return send_file(map_html)

if __name__ == '__main__':
    app.run(debug=True)

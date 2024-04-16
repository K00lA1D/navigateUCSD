# app.py
from flask import Flask, jsonify, request
from Graph import Graph
from flask_cors import CORS

'''
app = Flask(__name__)
CORS(app)



@app.route('/optimize_schedule', methods=['POST'])
def optimize_schedule():
    print("Received a request!")

    data = request.get_json()
    print("Data received:", data)

    start_location = data['startLocation']
    schedule = data['schedule']
    # Your logic here
    graph = Graph() 
    result = graph.optimize_schedule(start_location, schedule)
    return jsonify(result)
  
if __name__ == '__main__':
    app.run(debug=True, port=5000)
'''
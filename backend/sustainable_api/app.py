from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import json_util

# create Flask app
app = Flask(__name__)

# connect to MongoDB database
client = MongoClient("mongodb+srv://krishnasaurabh:<password>@susociety.yftuk6h.mongodb.net/?retryWrites=true&w=majority")
db = client.test
db = client["sustainable_society"]
collection = db["leaderbaord"]

# define route to retrieve data from MongoDB
@app.route('/data', methods=['GET'])
def get_data():
    data = list(collection.find())
    return json_util.dumps(data)

# define route to add data to MongoDB
@app.route('/data', methods=['POST'])
def add_data():
    new_data = request.get_json()
    collection.insert_one(new_data)
    return jsonify({'success': True})

# run Flask app
if __name__ == '__main__':
    app.run(debug=True)
from flask import Blueprint, jsonify, request
from pymongo import MongoClient
from bson import json_util

leaderboard_bp = Blueprint('leaderboard', __name__, url_prefix='/users')

# read password from file
with open('password.txt', 'r') as f:
    MONGO_PASS = f.read().strip()

# connect to MongoDB database
client = MongoClient(f"mongodb+srv://krishnasaurabh:{MONGO_PASS}@susociety.yftuk6h.mongodb.net/?retryWrites=true&w=majority")
db = client.sustainable_society
collection = db.leaderbaord

# define route to retrieve data from MongoDB
@leaderboard_bp.route('/data', methods=['GET'])
def get_data():
    data = list(collection.find())
    return json_util.dumps(data)

# define route to add data to MongoDB
@leaderboard_bp.route('/data', methods=['POST'])
def add_data():
    new_data = request.get_json()
    collection.insert_one(new_data)
    return jsonify({'success': True})

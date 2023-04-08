from flask import Blueprint, jsonify, request
from pymongo import MongoClient
from bson import ObjectId, json_util

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
    data.sort(key=lambda x: x['score'], reverse=True)
    return json_util.dumps(data)

# define route to add data to MongoDB
@leaderboard_bp.route('/data', methods=['POST'])
def add_data():
    new_data = request.get_json()
    collection.insert_one(new_data)
    return jsonify({'success': True})

# define route to update data in MongoDB
@leaderboard_bp.route('/<user_id>', methods=['PUT'])
def update_data(user_id):
    updated_data = request.get_json()
    print(updated_data)
    user_id = ObjectId(user_id)
    collection.update_one({'_id': user_id}, {'$set': updated_data})
    return jsonify({'success': True})
from flask import Blueprint, jsonify, request
from pymongo import MongoClient
from bson import json_util

phones_bp = Blueprint('phones', __name__, url_prefix='/phones')

# read password from file
with open('password.txt', 'r') as f:
    MONGO_PASS = f.read().strip()

# connect to MongoDB database
client = MongoClient(f"mongodb+srv://krishnasaurabh:{MONGO_PASS}@susociety.yftuk6h.mongodb.net/?retryWrites=true&w=majority")
db = client.sustainable_society
collection = db.phones

# define route to retrieve data from MongoDB
@phones_bp.route('/data', methods=['GET'])
def get_data():
    data = list(collection.find())
    return json_util.dumps(data)
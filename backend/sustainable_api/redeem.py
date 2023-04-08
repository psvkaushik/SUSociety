from flask import Blueprint, jsonify, request
from pymongo import MongoClient
from bson import json_util

redeem_bp = Blueprint('redeem', __name__, url_prefix='/redeem')

# read password from file
with open('password.txt', 'r') as f:
    MONGO_PASS = f.read().strip()

# connect to MongoDB database
client = MongoClient(f"mongodb+srv://krishnasaurabh:{MONGO_PASS}@susociety.yftuk6h.mongodb.net/?retryWrites=true&w=majority")
db = client.sustainable_society
collection = db.redeem_products

# define route to retrieve data from MongoDB
@redeem_bp.route('/data', methods=['GET'])
def get_data():
    data = list(collection.find())
    # sort data with max points first
    data.sort(key=lambda x: x['points'], reverse=True)

    return json_util.dumps(data)


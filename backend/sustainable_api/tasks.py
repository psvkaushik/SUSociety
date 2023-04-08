from flask import Blueprint, jsonify, request
from pymongo import MongoClient
from bson import json_util

tasks_bp = Blueprint('tasks', __name__, url_prefix='/tasks')

# read password from file
with open('password.txt', 'r') as f:
    MONGO_PASS = f.read().strip()

# connect to MongoDB database
client = MongoClient(f"mongodb+srv://krishnasaurabh:{MONGO_PASS}@susociety.yftuk6h.mongodb.net/?retryWrites=true&w=majority")
db = client.sustainable_society
collection = db.tasks

# define route to retrieve data from MongoDB
@tasks_bp.route('/data', methods=['GET'])
def get_data():
    data = list(collection.find())
    # sort data with max points first
    data.sort(key=lambda x: x['max_points'], reverse=True)
    for task in data:
        if task['task'] == 'Buy a phone with a greener impact on the environment':
            task['options'] = [{"type": i['name'], "points": i['score'] } for i in list(db.phones.find())]
        if task['task'] == 'Travel with less carbon footprint flights':
            task['options'] = [{"type": i['airline'], "points": i['emissions'] } for i in list(db.flights.find())]

    return json_util.dumps(data)


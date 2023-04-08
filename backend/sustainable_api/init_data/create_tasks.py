from pymongo import MongoClient

# read password from file
with open('password.txt', 'r') as f:
    MONGO_PASS = f.read().strip()

# connect to MongoDB database
client = MongoClient(f"mongodb+srv://krishnasaurabh:{MONGO_PASS}@susociety.yftuk6h.mongodb.net/?retryWrites=true&w=majority")
db = client.sustainable_society

# define dummy data for sustainability tasks
tasks = [
    {'category': 'Energy', 'task': 'Replace incandescent bulbs with LEDs', 'max_points': 10},
    {'category': 'Energy', 'task': 'Unplug electronics when not in use', 'max_points': 5},
    {'category': 'Water', 'task': 'Take shorter showers', 'max_points': 5},
    {'category': 'Water', 'task': 'Fix leaky faucets', 'max_points': 10},
    {'category': 'Transportation', 'task': 'Walk or bike instead of driving', 'max_points': 20},
    {'category': 'Transportation', 'task': 'Use public transportation', 'max_points': 10},
    {'category': 'Waste', 'task': 'Recycle paper, plastic, and glass', 'max_points': 5},
    {'category': 'Waste', 'task': 'Bring your own reusable bags to the grocery store', 'max_points': 5},
    {'category': 'Waste', 'task': 'Compost food scraps', 'max_points': 10},
    {'category': 'Waste', 'task': 'Buy products with less packaging', 'max_points': 5},
    {'category': 'Travel', 'task': 'Travel with less carbon footprint flights', 'max_points': 100},
    {'category': 'Purchases', 'task': 'Buy a phone with a greener impact on the environment', 'max_points': 100}
]

# insert dummy data into MongoDB
collection = db.tasks
collection.insert_many(tasks)
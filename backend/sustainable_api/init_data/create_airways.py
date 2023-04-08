from pymongo import MongoClient

# read password from file
with open('password.txt', 'r') as f:
    MONGO_PASS = f.read().strip()

# connect to MongoDB database
client = MongoClient(f"mongodb+srv://krishnasaurabh:{MONGO_PASS}@susociety.yftuk6h.mongodb.net/?retryWrites=true&w=majority")
db = client.sustainable_society

# define dummy data for flights
flights = [
    {'airline': 'American', 'emissions': 28},
    {'airline': 'Alaska', 'emissions': 64},
    {'airline': 'Delta', 'emissions': 47},
    {'airline': 'Spirit', 'emissions': 53},
    {'airline': 'United', 'emissions': 56},
]

# delete all data from MongoDB
db.flights.delete_many({})

# insert dummy data into MongoDB
collection = db.flights
collection.insert_many(flights)
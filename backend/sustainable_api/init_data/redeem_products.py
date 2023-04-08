from pymongo import MongoClient

# read password from file
with open('password.txt', 'r') as f:
    MONGO_PASS = f.read().strip()

# connect to MongoDB database
client = MongoClient(f"mongodb+srv://krishnasaurabh:{MONGO_PASS}@susociety.yftuk6h.mongodb.net/?retryWrites=true&w=majority")
db = client.sustainable_society
collection = db.redeem_products

# define the products to add
products = [
    {"product": "Reusable Water Bottle", "points": 50},
    {"product": "Bamboo Utensil Set", "points": 75},
    {"product": "Reusable Grocery Bag", "points": 25},
    {"product": "Solar-Powered Charger", "points": 100},
    {"product": "Eco-Friendly Yoga Mat", "points": 60},
    {"product": "Recycled Paper Notebook", "points": 35},
    {"product": "Bamboo Toothbrush Set", "points": 20},
    {"product": "Organic Cotton Tote Bag", "points": 30},
    {"product": "Compost Bin", "points": 90},
    {"product": "Beeswax Wraps", "points": 40},
    {"product": "Eco-Friendly Reusable Straws", "points": 15}
]

# delete all the products in the collection
collection.delete_many({})

# insert the products into the collection
for product in products:
    collection.insert_one(product)
    
print("Products added to the collection!")

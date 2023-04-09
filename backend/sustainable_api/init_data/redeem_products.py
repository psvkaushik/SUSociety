from pymongo import MongoClient

# read password from file
with open('password.txt', 'r') as f:
    MONGO_PASS = f.read().strip()

# connect to MongoDB database
client = MongoClient(
    f"mongodb+srv://krishnasaurabh:{MONGO_PASS}@susociety.yftuk6h.mongodb.net/?retryWrites=true&w=majority")
db = client.sustainable_society
collection = db.redeem_products

# define the products to add
products = [{"product": "Reusable Water Bottle", "points": 50, "image_link": "/images/bottle.jpg", "product_link": "https://www.amazon.com/s?k=reusable+water+bottle"},    
            {"product": "Bamboo Utensil Set", "points": 75, "image_link": "/images/utensil.jpg", "product_link": "https://www.amazon.com/s?k=bamboo+utensil+set"},
            {"product": "Reusable Grocery Bag", "points": 25, "image_link": "/images/bag.jpg", "product_link": "https://www.amazon.com/s?k=reusable+grocery+bag"}, 
            {"product": "Bamboo Toothbrush Set", "points": 20, "image_link": "/images/toothbrush.jpg", "product_link": "https://www.amazon.com/s?k=bamboo+toothbrush+set"},
            {"product": "Compost Bin", "points": 90, "image_link": "/images/bin.jpg", "product_link": "https://www.amazon.com/s?k=compost+bin"},
            {"product": "Beeswax Wraps", "points": 40, "image_link": "/images/wraps.jpg", "product_link": "https://www.amazon.com/s?k=beeswax+wraps"},
            {"product": "Eco-Friendly Reusable Straws", "points": 15, "image_link": "/images/straws.jpg", "product_link": "https://www.amazon.com/s?k=eco-friendly+reusable+straws"}
]

# delete all the products in the collection
collection.delete_many({})

# insert the products into the collection
for product in products:
    collection.insert_one(product)

print("Products added to the collection!")

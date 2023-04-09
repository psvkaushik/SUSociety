from pymongo import MongoClient

# read password from file
with open('password.txt', 'r') as f:
    MONGO_PASS = f.read().strip()

# connect to MongoDB database
client = MongoClient(f"mongodb+srv://krishnasaurabh:{MONGO_PASS}@susociety.yftuk6h.mongodb.net/?retryWrites=true&w=majority")
db = client.sustainable_society
collection = db.phones

# define the list of phones with scores
phones = [
    {'name': 'Samsung Galaxy S20', 'score': 68},
    {'name': 'iPhone 12 Pro Max', 'score': 54},
    {'name': 'Google Pixel 4a', 'score': 81},
    {'name': 'OnePlus 9', 'score': 62},
    {'name': 'Xiaomi Redmi Note 9', 'score': 76},
    {'name': 'Motorola Moto G Power', 'score': 91},
    {'name': 'LG Stylo 6', 'score': 95},
    {'name': 'Huawei P40 Pro', 'score': 63},
    {'name': 'Nokia 7.2', 'score': 80},
    {'name': 'Sony Xperia 1 II', 'score': 51},
    {'name': 'Oppo Reno5 Pro', 'score': 66},
    {'name': 'Realme 7', 'score': 73},
    {'name': 'Asus Zenfone 7 Pro', 'score': 56},
    {'name': 'ZTE Blade 10 Prime', 'score': 93},
    {'name': 'Vivo V20', 'score': 71},
    {'name': 'HTC Desire 20 Pro', 'score': 75},
    {'name': 'Lenovo K10 Note', 'score': 100},
    {'name': 'Blackberry Key2 LE', 'score': 59},
    {'name': 'Apple iPhone SE', 'score': 91},
    {'name': 'Samsung Galaxy A52', 'score': 72}
]

# insert the phones data in the MongoDB collection
collection.insert_many(phones)

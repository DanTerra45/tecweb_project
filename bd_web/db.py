from pymongo import MongoClient
from bson import ObjectId
import os

client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost'))
db = client.bd_web

# Database
def get_products():
    return db.products

def add_product(product_data):
    get_products().insert_one(product_data)

def edit_product(product_id, update_data):
    return get_products().update_one({'_id': ObjectId(product_id)}, {'$set': update_data})

def delete_product(product_id):
    return get_products().delete_one({'_id': ObjectId(product_id)})

# Authentucation (JWL)
def get_user_public_info(username):
    return db.users.find_one({"username": username}, {"_id": 0, "username": 1})

def get_all_users():
    return db.users.find({}, {"username": 1, "_id": 0})

def get_user_for_auth(username):
    return db.users.find_one({"username": username}, {"password": 1})

def create_user(username, email, password, role='user'):
    user = {
        "username": username,
        "email": email,
        "password": password,
        "role": role
    }
    return db.users.insert_one(user).inserted_id

# Permissions
def check_user_role(username, role):
    user = db.users.find_one({"username": username}, {"role": 1})
    return user and user.get("role") == role
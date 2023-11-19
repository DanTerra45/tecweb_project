from pymongo import MongoClient
import os

client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost'))
db = client.bd_web

def get_products():
    return db.products

def add_product(product_data):
    get_products().insert_one(product_data)
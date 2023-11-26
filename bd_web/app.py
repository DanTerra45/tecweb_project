from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from bson import json_util
import re
import db
import os
import datetime

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config['JWT_SECRET_KEY'] = '794#V&sYV&tDSDUUg$k5aa%fRGp9qjZ^qqH2STSa7&Z3dmijZaaC7%gujidZVV3eP@gcSAUAhK3C9^yqc7xzKtK9bWmkFM$KPR3LPg^a^uR*G5PfkGWt5du%*YgccA@b'
jwt = JWTManager(app)
CORS(app)

# Database
@app.route("/products", methods=['GET'])
def get_products():
    products = db.get_products().find()
    products_list = []
    for product in products:
        product['_id'] = str(product['_id'])
        products_list.append(product)
    return jsonify(products_list), 200

@app.route("/add_product", methods=['POST'])
@jwt_required()
def add_product():
    username = get_jwt_identity()
    if not db.check_user_role(username, "admin"):
        return jsonify({"error": "You don't have permission to do this."}), 403
    required_fields = ["name", "description", "price", "image_url", "rating", "categories"]
    try:
        product_data = {field: request.json[field] for field in required_fields}
        if not all(product_data.values()):
            missing_fields = [field for field, value in product_data.items() if not value]
            return jsonify({"error": f"Missing or empty data in fields: {missing_fields}"}), 400
        db.add_product(product_data)
        return jsonify({"message": "Product added successfully!"}), 201
    except KeyError as e:
        return jsonify({"error": f"Invalid data. Missing field: {str(e)}"}), 400
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An internal server error occurred."}), 500

@app.route("/edit_product", methods=['PUT'])
@jwt_required()
def edit_product():
    username = get_jwt_identity()
    if not db.check_user_role(username, "admin"):
        return jsonify({"error": "You don't have permission to do this."}), 403
    try:
        product_id = request.json.get('id')
        update_data = request.json
        update_data.pop('id', None)
        result = db.edit_product(product_id, update_data)
        if result.modified_count > 0:
            return jsonify({"message": "Product updated successfully!"}), 200
        else:
            return jsonify({"error": "No product found with given ID or no new data to update."}), 404
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An internal server error occurred."}), 500

@app.route("/delete_product", methods=['POST'])
@jwt_required()
def delete_product():
    username = get_jwt_identity()
    if not db.check_user_role(username, "admin"):
        return jsonify({"error": "You don't have permission to do this."}), 403
    try:
        product_id = request.json.get('id')
        result = db.delete_product(product_id)
        if result.deleted_count > 0:
            return jsonify({"message": "Product deleted successfully!"}), 200
        else:
            return jsonify({"error": "No product found with given ID."}), 404
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An internal server error occurred."}), 500

# Authentucation (JWL)
@app.route("/user/<username>", methods=['GET'])
@jwt_required()
def get_user_route(username):
    current_user = get_jwt_identity()
    if current_user != username:
        return jsonify({"error": "You are not loged in to view this!"}), 403
    user = db.get_user_public_info(username)
    if user:
        user_data = {"username": user["username"]}
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found."}), 404

@app.route("/users", methods=['GET'])
@jwt_required()
def get_all_users():
    current_user = get_jwt_identity()
    if current_user != username:
        return jsonify({"error": "You need to be logged in to do this!"}), 403
    users_cursor = db.get_all_users()
    usernames = [user["username"] for user in users_cursor]
    return jsonify({"usernames": usernames}), 200

@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    email = request.json.get('email')
    email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    password = request.json.get('password')
    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password are required."}), 400
    if len(username) < 6:
        return jsonify({"error": "Usernames must be at least 6 characters long."}), 400
    if not re.fullmatch(email_regex, email):
        return jsonify({"error": "Invalid email format"}), 400
    if len(password) <= 8:
        return jsonify({"error": "Passwords must be at least 8 characters long."}), 400
    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    user_id = db.create_user(username, email, password_hash)
    return jsonify({"message": "Registration successful!"}), 201

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = db.get_user_for_auth(username)
    if user and bcrypt.check_password_hash(user['password'], password):
        access_token = create_access_token(identity=username, expires_delta=datetime.timedelta(hours=2))
        return jsonify({"access_token": access_token, "message": "Logged In"}), 200
    else:
        return jsonify({"error": "There's some errors on the fields you've provided."}), 401

def protected_route():
    claims = get_jwt()
    if not db.check_user_role(username, "admin"):
        return jsonify({"error": "You don't have permission to do this."}), 403

if __name__ == "__main__":
    app.run(debug=True)
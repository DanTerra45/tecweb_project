from flask import Flask, request, jsonify
from flask_cors import CORS
from bson import json_util
import db

app = Flask(__name__)
CORS(app)

@app.route("/products", methods=['GET'])
def get_products():
    products = db.get_products().find()
    return json_util.dumps(products), 200, {'ContentType':'application/json'}

@app.route("/add_product", methods=['POST'])
def add_product():
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

if __name__ == "__main__":
    app.run("localhost")
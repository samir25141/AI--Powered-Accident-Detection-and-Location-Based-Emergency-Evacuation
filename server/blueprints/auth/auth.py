import hashlib
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token
from pymongo import MongoClient

auth_bp = Blueprint('auth', __name__, url_prefix='/api/v1/auth')

client = MongoClient("localhost", 27017)
db = client.flask_database
users = db.users

# Insert test user (run only once or comment out after first insert)
hashed_password = hashlib.sha256("Test@1234".encode('utf-8')).hexdigest()
if not users.find_one({"username": "user1@gmail.com"}):
    users.insert_one({
        "username": "user1@gmail.com",
        "password": hashed_password
    })

@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def login():
    login_details = request.get_json()

    if not login_details or 'username' not in login_details or 'password' not in login_details:
        return jsonify({'msg': 'Username or password not provided'}), 400

    user_from_db = users.find_one({'username': login_details['username']})
    if user_from_db:
        encrypted_password = hashlib.sha256(login_details['password'].encode('utf-8')).hexdigest()
        if encrypted_password == user_from_db['password']:
            access_token = create_access_token(identity=user_from_db['username'])
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({'msg': 'Invalid password'}), 401
    else:
        return jsonify({'msg': 'User does not exist'}), 404

@auth_bp.route('/register', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def register():
    new_user = request.get_json()

    print("DEBUG: Received user data:", new_user)  # <-- Add this

    if not new_user or "email" not in new_user or "password" not in new_user:
        return jsonify({"msg": "Invalid request: missing fields"}), 400

    new_user["username"] = new_user.pop("email")
    new_user['password'] = hashlib.sha256(new_user["password"].encode('utf-8')).hexdigest()
    doc = users.find_one({"username": new_user["username"]})
    
    if not doc:
        users.insert_one(new_user)
        return jsonify({'msg': 'User created successfully'}), 201
    else:
        return jsonify({'msg': 'User already exists'}), 409

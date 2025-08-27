# blueprints/accident/accident.py

from flask import Blueprint, request, jsonify
from datetime import datetime
from bson import ObjectId
from pymongo import MongoClient
import base64
import os
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader

# Load dotenv
load_dotenv()

# Email function import
from blueprints.emails.emails import send_accident_email

accident_bp = Blueprint('accident', __name__, url_prefix='/api/v1/accident')

client = MongoClient("localhost", 27017)
mongo_db = client.flask_database
accidents_collection = mongo_db.accidents

@accident_bp.route('/create', methods=['POST'])
def create_accident():
    accident_data = request.get_json()
    frame_base64 = accident_data.get('frame', '')

    try:
        frame_bytes = base64.b64decode(frame_base64)

        cloudinary.config(
            cloud_name=os.getenv('CLOUD_NAME'),
            api_key=os.getenv('API_KEY'),
            api_secret=os.getenv('API_SECRET')
        )

        upload_result = cloudinary.uploader.upload(frame_bytes, folder="accident_frames")
        image_url = upload_result['url']

    except Exception as e:
        return jsonify({"status": "error", "message": f"Failed to upload image: {str(e)}"}), 500

    accident_record = {
        "address": accident_data['address'],
        "city": accident_data['city'],
        "latitude": accident_data['latitude'],
        "longitude": accident_data['longitude'],
        "severityInPercentage": accident_data['severityInPercentage'],
        "severity": accident_data['severity'],
        "date": datetime.now(),
        "image_url": image_url
    }

    accidents_collection.insert_one(accident_record)

    # Send email
    try:
        send_accident_email(
            latitude=accident_data['latitude'],
            longitude=accident_data['longitude'],
            severity=accident_data['severity'],
            location=accident_data['address'],
            image_url=image_url
        )
    except Exception as e:
        print(f"Email send failed: {e}")

    return jsonify({
        "status": "success",
        "message": "Accident data saved and email sent successfully.",
        "image_url": image_url
    }), 201

@accident_bp.route('/all', methods=['GET'])
def get_all_accidents():
    all_data = accidents_collection.find()
    return jsonify({
        "status": "success",
        "datas": [
            {
                "id": str(data['_id']),
                "address": data['address'],
                "city": data['city'],
                "latitude": data['latitude'],
                "longitude": data['longitude'],
                "severityInPercentage": data['severityInPercentage'],
                "severity": data['severity'],
                "date": data['date'],
                "image_url": data['image_url']
            } for data in all_data
        ]
    })

@accident_bp.route('/<accidentId>', methods=['GET'])
def get_single_accident(accidentId):
    accident = accidents_collection.find_one({"_id": ObjectId(accidentId)})
    if accident:
        return jsonify({
            "status": "success",
            "data": {
                "id": str(accident['_id']),
                "address": accident['address'],
                "city": accident['city'],
                "latitude": accident['latitude'],
                "longitude": accident['longitude'],
                "severityInPercentage": accident['severityInPercentage'],
                "severity": accident['severity'],
                "date": accident['date'],
                "image_url": accident['image_url']
            }
        })
    return jsonify({"status": "error", "message": "Accident not found"}), 404

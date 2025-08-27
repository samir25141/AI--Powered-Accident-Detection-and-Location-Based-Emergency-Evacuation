# blueprints/emails/emails.py

from flask import Blueprint, current_app
from flask_mail import Message
import os
from dotenv import load_dotenv

load_dotenv()

emails = Blueprint('emails', __name__, url_prefix='/api/v1/emails')

def send_accident_email(latitude, longitude, severity, location, image_url):
    try:
        mail = current_app.extensions['mail']
        with current_app.app_context():
            google_map_link = f"https://www.google.com/maps/search/?api=1&query={latitude},{longitude}"
            subject = f"🚨 Accident Alert - Severity({severity})"
            recipient = os.getenv('SENDTO')
            sender = os.getenv('EMAIL')

            msg = Message(subject=subject, sender=sender, recipients=[recipient])
            msg.html = f"""
                <h3>🚨 Accident Alert</h3>
                <p><strong>Severity:</strong> {severity}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><a href="{google_map_link}" target="_blank">View on Google Maps</a></p>
                <p><img src="{image_url}" alt="Accident Screenshot" style="max-width:500px; border-radius:8px;" /></p>
            """

            mail.send(msg)
            print("✅ Email sent successfully.")
    except Exception as e:
        print(f"❌ Failed to send email: {e}")

from database import db
from datetime import datetime


# SETTINGS MODEL

class Settings(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(db.Integer)

    dark_mode = db.Column(
        db.Boolean,
        default=True
    )

    ai_alerts = db.Column(
        db.Boolean,
        default=True
    )

    email_notifications = db.Column(
        db.Boolean,
        default=True
    )

    compact_layout = db.Column(
        db.Boolean,
        default=False
    )


# PREDICTION MODEL

class Prediction(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    patient_name = db.Column(
        db.String(100)
    )

    age = db.Column(db.Integer)

    gender = db.Column(
        db.String(20)
    )

    sleep_duration = db.Column(
        db.Float
    )

    stress_level = db.Column(
        db.Float
    )

    heart_rate = db.Column(
        db.Float
    )

    daily_steps = db.Column(
        db.Integer
    )

    bmi_category = db.Column(
        db.String(100)
    )
    quality_of_sleep = db.Column(db.Float)

    physical_activity = db.Column(db.Float)

    occupation = db.Column(db.String(100))

    blood_pressure = db.Column(db.String(100))

    sleep_disorder = db.Column(
        db.String(100)
    )

    prediction = db.Column(
        db.String(100)
    )

    confidence = db.Column(
        db.Float
    )

    risk_level = db.Column(
        db.String(100)
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # CONVERT TO JSON

    def to_dict(self):

        return {

            "id": self.id,

            "patient_name":
                self.patient_name,

            "age": self.age,

            "gender": self.gender,

            "sleep_duration":
                self.sleep_duration,

            "stress_level":
                self.stress_level,

            "heart_rate":
                self.heart_rate,

            "daily_steps":
                self.daily_steps,

            "bmi_category":
                self.bmi_category,

            "sleep_disorder":
                self.sleep_disorder,

            "prediction":
                self.prediction,

            "confidence":
                self.confidence,

            "risk_level":
                self.risk_level,

            "created_at":
                self.created_at.strftime(
                    "%Y-%m-%d %H:%M"
                )

        }
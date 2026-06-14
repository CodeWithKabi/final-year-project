from flask import Flask, request, jsonify
from flask_cors import CORS
from models import Prediction, Settings

import numpy as np
import joblib
import os
from dotenv import load_dotenv

from database import db
from models import Prediction


load_dotenv()
# CREATE FLASK APP

app = Flask(__name__)

CORS(app)

# DATABASE CONFIGURATION

app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"mysql+pymysql://{os.getenv('DB_USER')}:"
    f"{os.getenv('DB_PASSWORD')}@"
    f"{os.getenv('DB_HOST')}:3306/"
    f"{os.getenv('DB_NAME')}"
)

app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_size": 1,
    "max_overflow": 0,
     "pool_recycle": 300
}
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# LOAD MODEL

model = joblib.load("model.pkl")

# LOAD ENCODERS

feature_encoders = joblib.load("feature_encoders.pkl")

target_encoder = joblib.load("target_encoder.pkl")

# CREATE DATABASE TABLES

with app.app_context():
    db.create_all()

# HOME ROUTE

@app.route("/")
def home():

    return jsonify({
        "message": "AI Sleep Disorder API Running"
    })

# PREDICTION ROUTE

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json
    print(request.json)
    
    required_fields = [
        "gender",
        "bmi_category",
        "occupation",
        "blood_pressure"
    ]

    for field in required_fields:
        if not data.get(field):
           return jsonify({
              "error": f"{field} is required"
           }), 400
    # ENCODE CATEGORICAL VALUES

    gender = feature_encoders["Gender"].transform(
        [data["gender"]]
    )[0]

    bmi_category = feature_encoders["BMI Category"].transform(
        [data["bmi_category"]]
    )[0]

    occupation = feature_encoders["Occupation"].transform(
        [data["occupation"]]
    )[0]

    blood_pressure = feature_encoders["Blood Pressure"].transform(
        [data["blood_pressure"]]
    )[0]

    # CREATE FEATURE ARRAY

    features = np.array([[
        data["age"],
        gender,
        data["sleep_duration"],
        data["stress_level"],
        bmi_category,
        data["heart_rate"],
        data["daily_steps"],
        data["quality_of_sleep"],
        data["physical_activity"],
        occupation,
        blood_pressure
    ]])

    # MODEL PREDICTION

    prediction_encoded = model.predict(features)[0]

    prediction = target_encoder.inverse_transform(
        [int(prediction_encoded)]
    )[0]

    # CONFIDENCE SCORE

    probabilities = model.predict_proba(features)[0]

    confidence = round(
        float(np.max(probabilities) * 100),
        2
    )

    # RISK LEVEL LOGIC

    if prediction == "Healthy":
        risk_level = "Low Risk"

    elif prediction == "Insomnia":
        risk_level = "Moderate Risk"

    else:
        risk_level = "High Risk"

    # SAVE PREDICTION TO DATABASE

    new_prediction = Prediction(
    patient_name=data["patient_name"],
    age=data["age"],
    gender=data["gender"],
    sleep_duration=data["sleep_duration"],
    stress_level=data["stress_level"],
    heart_rate=data["heart_rate"],
    daily_steps=data["daily_steps"],

    bmi_category=data["bmi_category"],
    quality_of_sleep=data["quality_of_sleep"],
    physical_activity=data["physical_activity"],
    occupation=data["occupation"],
    blood_pressure=data["blood_pressure"],

    prediction=prediction,
    confidence=confidence,
    risk_level=risk_level
)

    db.session.add(new_prediction)

    db.session.commit()

    # RETURN RESPONSE

    return jsonify({

        "prediction": prediction,

        "confidence": confidence,

        "risk_level": risk_level

    })

# HISTORY ROUTE

@app.route("/history", methods=["GET"])
def history():

    predictions = Prediction.query.order_by(
        Prediction.created_at.desc()
    ).all()

    return jsonify([
        prediction.to_dict()
        for prediction in predictions
    ])

# ANALYTICS ROUTE

@app.route("/analytics", methods=["GET"])
def analytics():

    total = Prediction.query.count()

    low = Prediction.query.filter_by(
        risk_level="Low Risk"
    ).count()

    moderate = Prediction.query.filter_by(
        risk_level="Moderate Risk"
    ).count()

    high = Prediction.query.filter_by(
        risk_level="High Risk"
    ).count()

    predictions = Prediction.query.all()

    avg_confidence = 0

    if total > 0:

        avg_confidence = round(

            sum(p.confidence for p in predictions) / total,

            2

        )

    healthy = Prediction.query.filter_by(
    prediction="Healthy"
    ).count()

    insomnia = Prediction.query.filter_by(
    prediction="Insomnia"
    ).count()

    apnea = Prediction.query.filter_by(
    prediction="Sleep Apnea"
    ).count()

    return jsonify({

    "total_predictions": total,

    "low_risk_cases": low,

    "moderate_cases": moderate,

    "high_risk_cases": high,

    "average_confidence": avg_confidence,

    "healthy": healthy,

    "insomnia": insomnia,

    "sleep_apnea": apnea
})

@app.route("/patients", methods=["GET", "POST"])
def patients():

    # GET ALL PATIENTS

    if request.method == "GET":

        patients = Prediction.query.all()

        return jsonify([
            patient.to_dict()
            for patient in patients
        ])

    # ADD NEW PATIENT

    if request.method == "POST":

        data = request.json

        new_patient = Prediction(

    patient_name=data["patient_name"],

    age=data["age"],

    gender=data["gender"],

    sleep_duration=data["sleep_duration"],

    stress_level=data["stress_level"],
   
    heart_rate=data["heart_rate"],
    
    daily_steps=data["daily_steps"],
     
     bmi_category=data["bmi_category"],
     
    sleep_disorder=data["sleep_disorder"],

    prediction=data["sleep_disorder"],

    confidence=0,

    risk_level="Unknown"

)

        db.session.add(new_patient)

        db.session.commit()

        return jsonify({
            "message": "Patient added successfully"
        })
    
   # DELETE PATIENT

@app.route("/patients/<int:id>", methods=["DELETE"])
def delete_patient(id):

    patient = Prediction.query.get(id)

    if not patient:

        return jsonify({
            "message": "Patient not found"
        }), 404

    db.session.delete(patient)

    db.session.commit()

    return jsonify({
        "message": "Patient deleted successfully"
    })

# UPDATE PATIENT

@app.route("/patients/<int:id>", methods=["PUT"])
def update_patient(id):

    patient = Prediction.query.get(id)

    if not patient:

        return jsonify({
            "message": "Patient not found"
        }), 404

    data = request.json

    patient.patient_name = data["patient_name"]

    patient.age = data["age"]

    patient.gender = data["gender"]

    patient.sleep_duration = data["sleep_duration"]

    patient.stress_level = data["stress_level"]

    patient.heart_rate = data["heart_rate"]
    
    patient.bmi_category = data["bmi_category"]

    patient.daily_steps = data["daily_steps"]

    patient.prediction = data["sleep_disorder"]
    

    db.session.commit()

    return jsonify({
        "message": "Patient updated successfully"
    })
    
    # GET SETTINGS

@app.route("/settings/<int:user_id>", methods=["GET"])
def get_settings(user_id):

    settings = Settings.query.filter_by(
        user_id=user_id
    ).first()

    if not settings:

        return jsonify({
            "message": "Settings not found"
        }), 404

    return jsonify({

        "dark_mode": settings.dark_mode,

        "ai_alerts": settings.ai_alerts,

        "email_notifications":
            settings.email_notifications,

        "compact_layout":
            settings.compact_layout

    })


# UPDATE SETTINGS
@app.route("/settings/<int:user_id>", methods=["PUT"])
def update_settings(user_id):

    data = request.json

    print(data)

    settings = Settings.query.filter_by(
        user_id=user_id
    ).first()

    if not settings:

        settings = Settings(
            user_id=user_id
        )

        db.session.add(settings)

    settings.dark_mode = data.get(
        "dark_mode",
        True
    )

    settings.ai_alerts = data.get(
        "ai_alerts",
        True
    )

    settings.email_notifications = data.get(
        "email_notifications",
        True
    )

    settings.compact_layout = data.get(
        "compact_layout",
        False
    )

    db.session.commit()

    return jsonify({
        "message":
            "Settings updated successfully"
    })
    # LOGIN ROUTE

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")

    password = data.get("password")

    # DEMO LOGIN

    if email == "admin@gmail.com" and password == "1234":

        return jsonify({

            "message": "Login successful",

            "user": {
                "email": email
            }

        })

    return jsonify({

        "message": "Invalid email or password"

    }), 401
    # REGISTER ROUTE

# REGISTER ROUTE

@app.route("/register", methods=["POST"])
def register():

    data = request.json

    return jsonify({
        "message": "Registration successful"
    })


# DASHBOARD ROUTE

@app.route("/dashboard", methods=["GET"])
def dashboard():

    total_predictions = Prediction.query.count()

    high_risk = Prediction.query.filter_by(
        risk_level="High Risk"
    ).count()

    dashboard_data = {
        "total_predictions": total_predictions,
        "accuracy": 95.08,
        "high_risk": high_risk,
        "best_model": "XGBoost"
    }

    return jsonify(dashboard_data)


@app.route("/model-comparison")
def model_comparison():

    return jsonify([
        {
            "model": "XGBoost",
            "accuracy": 95.08
        },
        {
            "model": "SVM + LR",
            "accuracy": 82.30
        }
    ])
    @app.route("/model-comparison")
    def model_comparison():
      return jsonify([
        {
            "model": "XGBoost",
            "accuracy": 95.08,
            "precision": 94.30,
            "recall": 95.00,
            "f1": 94.80
        },
        {
            "model": "SVM + LR",
            "accuracy": 82.30,
            "precision": 81.20,
            "recall": 82.00,
            "f1": 81.50
        }
    ])
    # RUN SERVER

if __name__ == "__main__":

    app.run(debug=True)

from flask import Blueprint, request, jsonify

import numpy as np

import joblib

# BLUEPRINT

prediction_bp = Blueprint(

    "prediction",

    __name__

)

# LOAD MODEL

model = joblib.load(

    "sleep_model.pkl"

)

# PREDICTION ROUTE

@prediction_bp.route(

    "/predict",

    methods=["POST"]

)

def predict():

    try:

        data = request.json

        features = np.array([[
            data["Person ID"],
            data["Gender"],
            data["Age"],
            data["Occupation"],
            data["Sleep Duration"],
            data["Quality of Sleep"],
            data["Physical Activity Level"],
            data["Stress Level"],
            data["BMI Category"],
            data["Blood Pressure"],
            data["Heart Rate"],
            data["Daily Steps"]
        ]])

        # AI PREDICTION

        prediction = model.predict(
            features
        )[0]

        # AI CONFIDENCE

        probabilities = model.predict_proba(
            features
        )[0]

        confidence = round(

            float(

                max(probabilities) * 100

            ),

            2

        )

        # LABELS

        labels = {

            0: "Healthy",

            1: "Insomnia",

            2: "Sleep Apnea"

        }

        result = labels.get(

            prediction,

            "Unknown"

        )

        return jsonify({

            "prediction": result,

            "confidence": confidence

        })

    except Exception as e:

        return jsonify({

            "error": str(e)

        })

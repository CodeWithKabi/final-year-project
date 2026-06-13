from flask import Blueprint, request, jsonify
import mysql.connector
from config import DB_CONFIG

patient_bp = Blueprint("patient_bp", __name__)

# =========================================
# GET ALL PATIENTS
# =========================================

@patient_bp.route("/patients", methods=["GET"])
def get_patients():

    conn = mysql.connector.connect(**DB_CONFIG)

    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM patients")

    patients = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(patients)


# =========================================
# ADD PATIENT
# =========================================

@patient_bp.route("/patients", methods=["POST"])
def add_patient():

    data = request.json

    conn = mysql.connector.connect(**DB_CONFIG)

    cursor = conn.cursor()

    query = """
    INSERT INTO patients
    (
        patient_name,
        age,
        gender,
        sleep_duration,
        stress_level,
        bmi_category,
        heart_rate,
        daily_steps,
        sleep_disorder
    )
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        data["patient_name"],
        data["age"],
        data["gender"],
        data["sleep_duration"],
        data["stress_level"],
        data["bmi_category"],
        data["heart_rate"],
        data["daily_steps"],
        data["sleep_disorder"]
    )

    cursor.execute(query, values)

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Patient added successfully"
    })


# =========================================
# UPDATE PATIENT
# =========================================

@patient_bp.route("/patients/<int:id>", methods=["PUT"])
def update_patient(id):

    data = request.json

    conn = mysql.connector.connect(**DB_CONFIG)

    cursor = conn.cursor()

    query = """
    UPDATE patients
    SET
        patient_name=%s,
        age=%s,
        gender=%s,
        sleep_duration=%s,
        stress_level=%s,
        bmi_category=%s,
        heart_rate=%s,
        daily_steps=%s,
        sleep_disorder=%s
    WHERE id=%s
    """

    values = (
        data["patient_name"],
        data["age"],
        data["gender"],
        data["sleep_duration"],
        data["stress_level"],
        data["bmi_category"],
        data["heart_rate"],
        data["daily_steps"],
        data["sleep_disorder"],
        id
    )

    cursor.execute(query, values)

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Patient updated successfully"
    })


# =========================================
# DELETE PATIENT
# =========================================

@patient_bp.route("/patients/<int:id>", methods=["DELETE"])
def delete_patient(id):

    conn = mysql.connector.connect(**DB_CONFIG)

    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM patients WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Patient deleted successfully"
    })
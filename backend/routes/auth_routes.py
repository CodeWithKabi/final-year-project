from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector

from config import DB_CONFIG

auth = Blueprint("auth", __name__)

# DATABASE CONNECTION

def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)

# REGISTER API

@auth.route('/register', methods=['POST'])
def register():

    data = request.json

    full_name = data['full_name']
    email = data['email']
    password = generate_password_hash(data['password'])
    role = data['role']

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))

    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({"message": "Email already exists"}), 400

    sql = "INSERT INTO users(full_name,email,password,role) VALUES(%s,%s,%s,%s)"

    values = (full_name, email, password, role)

    cursor.execute(sql, values)
    db.commit()

    return jsonify({"message": "Registration Successful"})

# LOGIN API

@auth.route('/login', methods=['POST'])
def login():

    data = request.json

    email = data['email']
    password = data['password']

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))

    user = cursor.fetchone()

    if not user:
        return jsonify({"message": "Invalid Email"}), 401

    if not check_password_hash(user['password'], password):
        return jsonify({"message": "Invalid Password"}), 401

    token = create_access_token(identity=user['email'])

    return jsonify({
        "token": token,
        "user": {
            "name": user['full_name'],
            "email": user['email'],
            "role": user['role']
        }
    })
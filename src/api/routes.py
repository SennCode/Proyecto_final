"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Category, Gender, Clothes, Img, Favorites
from api.utils import generate_sitemap, APIException

from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)


@api.route('/register_user', methods=['POST'])
def register_user():

    body = request.get_json()

    username = body.get("username")
    email = body.get_json("email")
    password = body.get_json("password")
    password2 = body.get_json("password2")

    if email is None or password is None or password2 is None:
        return jsonify({"msg": "The fields email and password cannot be empty!", "data": None}), 400

    if len(password) < 6:
        return jsonify({"msg": "Password length must be greater than 6 characters!", "data": None}), 400

    if password != password2:
        return jsonify({"msg": "Passwords do not match!", "data": None}), 400

    hash = bcrypt.generate_password_hash(password)

    try:
        user = User(
            username=username,
            email=email,
            password=hash.decode("utf-8"),
            is_active=True
        )

        db.session.add(user)
        db.session.commit()

        return jsonify({"msg": None, "data": user.serialize()}), 201

    except:
        return jsonify({"msg": "Error! user already exists!"}), 400


@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()

    email = body.get('email')
    password = body.get('password')
    # validar q' email & password != NONE

    users = User.query.filter_by(email=email).all()
    if (len(users) == 0):
        return jsonify({"msg": "El usuario con email:" + email + " no existe.", "data": None}), 201

    user = users[0]
    hash = user.password
    isValid = bcrypt.check_password_hash(hash, password)
    if not isValid:
        return jsonify({"msg": "Clave incorrecta.", "data": None}), 201

    token = create_access_token(
        identity={"rol": "usuario", "data": user.serialize()})
    return jsonify({"msg": None, "data": token}), 200

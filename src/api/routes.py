"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Files3D, Patterns, Favorites
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import get_jwt_identity, create_access_token, get_jwt, jwt_required, JWTManager

import cloudinary
import cloudinary.uploader
import cloudinary.api

cloudinary.config(
  cloud_name = "dwssfgyty",
  api_key = "873114413959781",
  api_secret = "dlcrM4HlfBpHSaQccMmx05wrvxc",
  secure = True
)

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)
# -------------------------------------------------------------------------------------------
# acordarse de pegar en app.py "app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
# jwt = JWTManager(app)" y "from flask_jwt_extended import JWTManager"
# esto nos permitirá generar el token para logearnos
# -------------------------------------------------------------------------------------------


# ------------
# CREAR CUENTA
# ------------

@api.route('/signup', methods=['POST'])
def signup():
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    is_active = request.json.get("is_active", None)

# Hash the password

    password = bcrypt.generate_password_hash(password).decode('utf-8')

    user_already_exist = User.query.filter_by(
        username=username).filter_by(email=email).first()

    if user_already_exist:
        return jsonify({"msg": "user already exists!"}), 400
    else:
        new_user = User(username=username, email=email,
                        password=password, is_active=is_active)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"user": new_user.serialize()}), 200

# ------------
# Users
# ------------

@api.route("/users", methods=["GET"])
def users():
    users = User.query.all()

    users = list(map(lambda user: user.serialize(), users))
    return jsonify({"users": users})
# ------------
# LOGIN
# ------------

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)

        return jsonify({"access_token": access_token}), 200

    else:
        return jsonify({"msg": "wrong email or password!"}), 400

# ---------------------
# Buscar usuario por id
# ---------------------

@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({'msg': 'User not found'}), 404

    return jsonify(user.serialize())

# -------------------
# Actualizar usuario
# -------------------

@api.route('/users/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    current_user = get_jwt_identity()
    user = User.query.get(id)

    if not user:
        return jsonify({'msg': 'User not found'}), 404
    if user.id != current_user:
        return jsonify({'msg': 'Unauthorized'}), 401

    username = request.json.get("username", user.username)
    email = request.json.get("email", user.email)
    password = ('password', user.password)
    is_active = request.json.get("is_active", user.is_active)

    # Hash teh password
    password = bcrypt.generate_password_hash(password).decode('utf-8')

    user.username = username
    user.email = email
    user.password = password
    user.is_active = is_active

    db.session.commit()

    return jsonify(user.serialize()), 200

# -------------------
# Borrar usuario
# -------------------

@api.route("/users/<int:id>", methods=['DELETE'])
@jwt_required()
def delete_user(id):
    current_user = get_jwt_identity()
    user = User.query.get(id)

    if not user:
        return jsonify({"msg": "User not found"}), 404
    if user.id != current_user: 
        return jsonify({'msg': 'Unauthorized'}), 401

    db.session.delete(user)
    db.session.commit()

    return jsonify({'msg': 'User deleted successfully'}), 200

# ------------
# STORE
# ------------

@api.route("/store", methods=["GET"])
def store():
    files3d = Files3D.query.all()

    files3d = list(map(lambda file: file.serialize(), files3d))
    return jsonify({"files3d": files3d})

# ---------------
# CREAR ARCHIVO3D
# ---------------

@api.route("/store", methods=['POST'])
@jwt_required
def create_file():
    name = request.json.get('name', None)
    description = request.json.get('description', None)
    file_type = request.json.get('file_type', None)
    gender = request.json.get('gender', None)
    url = request.json.get('url', None)
    type_clothes = request.json.get('type_clothes', None)
    size = request.json.get('size', None)
    user_id = get_jwt_identity()

    new_file = Files3D(name=name, description=description, file_type= file_type, 
    gender=gender, url=url, type_clothes=type_clothes, size=size, user_id=user_id)
    db.session.add(new_file)
    db.session.commit()

    return jsonify({"msg": 'File created successfully!', 'file': new_file.serialize()}), 201
# ----------
# cloudinary
# ----------
@api.route("/upload", methods=["POST"])
def upload_image():
    archivo = request.files.get('archivo')
    if archivo :
        data = cloudinary.uploader.upload(archivo)
        url_image = data["secure_url"]
        return jsonify(data), 201
    return jsonify({"msg": "Error!"}), 401
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Files3D, Patterns, Prints, Files3DRelation, PatternsRelation, PrintsRelation
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from sqlalchemy import or_
from sqlalchemy import and_
from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, JWTManager

import cloudinary
import cloudinary.uploader
import cloudinary.api

cloudinary.config(
  cloud_name="dwssfgyty",
  api_key="873114413959781",
  api_secret="dlcrM4HlfBpHSaQccMmx05wrvxc",
  secure=True
)

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['ACCESS-CONTROL-ALLOW-ORIGIN'] = '*'

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
    try:
        username = request.json.get("username", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        confirm_password = request.json.get("confirm_password", None)
        is_active = request.json.get("is_active", True)

        password = bcrypt.generate_password_hash(password).decode('utf-8')

        user_already_exist = User.query.filter_by(
            username=username).filter_by(email=email).first()

        if user_already_exist:
            return jsonify({"msg": "User already exists!"}), 400
        else:
            new_user = User(username=username, email=email,
                            password=password, is_active=is_active)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"user": new_user.serialize()}), 200
    except Exception as e:
        return jsonify({"msg error": str(e)}), 400

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
        
        return jsonify({"access_token": access_token, "user_id": user.id}), 200

    else:
        return jsonify({"msg": "wrong email or password!"}), 400

# ------------
# PRIVATE
# ------------
@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)

    return jsonify(user.serialize()), 200
    
        
# ---------------------
# Buscar usuario por id
# ---------------------

@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({'msg': 'User not found'}), 404

    return jsonify(user.serialize()),200

# ---------------------
# Buscar usuario por username
# ---------------------
@api.route('/users/username', methods=['GET'])
@jwt_required()
def get_user_by_username():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()

    if not user:
        return jsonify({'msg': 'User not found'}), 400

    return jsonify(user.serialize()), 200

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
    files3d = [file.serialize() for file in Files3D.query.all()]
    patterns = [pattern.serialize() for pattern in Patterns.query.all()]
    prints = [one_print.serialize() for one_print in Prints.query.all()]
    return jsonify({"files3d": files3d, "patterns": patterns, "prints": prints})


# ------------
# STORE Relaton 3dfiles
# ------------
@app.route('/store/<int:files3d_id>/users')
def get_users_for_files3d(files3d_id):
    users = User.query.join(Files3DRelation).filter(Files3DRelation.files3d_id == files3d_id).all()
    return jsonify([user.serialize() for user in users])


# ------------
# SEARCH
# ------------

@api.route("/search/<search>", methods=["GET"])
def search(search):
    files3d = [file.serialize() for file in Files3D.query.filter(or_(Files3D.name.ilike(f'%{search}%'), 
    Files3D.description.ilike(f'%{search}%'),
    Files3D.gender.ilike(f'%{search}%'),
    Files3D.size.ilike(f'%{search}%'))).all()]

    return jsonify({"files3d": files3d}), 200, {'Content-Type': 'application/json'}



# ----------------
# LISTAR ARCHIVO3D
# ----------------

@api.route("/store/<int:id>", methods=['GET'])
def get_file3d(id):
    file3d = Files3D.query.get(id)

    if not file3d:
        return jsonify({'msg': 'Item not found!'})

    return jsonify(file3d.serialize())

# ----------------
# LISTAR PATTERN
# ----------------

@api.route("/store/<int:id>", methods=['GET'])
def get_pattern(id):
    patterns = Patterns.query.get(id)

    if not pattern:
        return jsonify({'msg': 'Item not found!'})

    return jsonify(pattern.serialize())

# ----------------
# LISTAR PRINT
# ----------------

@api.route("/store/<int:id>", methods=['GET'])
def get_one_print(id):
    one_print = Prints.query.get(id)

    if not one_print:
        return jsonify({'msg': 'Item not found!'})

    return jsonify(one_print.serialize())

# ---------------
# CREAR ARCHIVO
# ---------------

@api.route("/create_file", methods=['POST'])
@jwt_required()
def create_file():
    current_user = get_jwt_identity()

    name = request.json.get('name', None)
    category = request.json.get('category', None)
    description = request.json.get('description', None)
    file_type = request.json.get('file_type', None)
    gender = request.json.get('gender', None)
    url = request.json.get('url', None)
    type_clothes = request.json.get('type_clothes', None)
    size = request.json.get('size', None)
    print(request.json)
  
    # for url_image in url:
    #     new_file = Files3D(name=name, category=category, description=description, file_type= file_type,
    #     gender=gender, url=url_image, type_clothes=type_clothes, size=size, user_id=current_user)
    #     db.session.add(new_file)
    # db.session.commit()

    return jsonify({"msg": 'File created successfully!'}), 201

# ----------
# cloudinary
# ----------
@api.route("/upload", methods=["POST"])
def upload_image():
    archivo = request.files.get('archivo')
    if archivo:
        data = cloudinary.uploader.upload(archivo)
        url_image = data["secure_url"]
        return jsonify({"url_image": url_image}), 201
    return jsonify({"msg": "Error!"}), 401


# ----------
# Avatar
# ----------

@api.route('/change_avatar', methods=['POST'])
@jwt_required()
def change_avatar():
    # Obtener el usuario actualmente autenticado
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()

    # Obtener el archivo cargado por el usuario
    avatar_file = request.files['avatar']

    # Cargar la imagen en Cloudinary
    result = cloudinary.uploader.upload(avatar_file)

    # Actualizar la URL de la imagen en la base de datos
    user.img = result['secure_url']
    db.session.commit()

    # Devolver una respuesta al usuario
    
    return jsonify({"msg": "Success!!"}), 201


# ----------
# FAVORITES
# ----------

@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_to_favorites():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()

    # Obtener los datos del producto que se quiere agregar a favoritos
    product_type = request.json['product_type']
    product_id = request.json['product_id']

    # Validar que los datos sean correctos
    if product_type not in ['files3d', 'patterns', 'prints']:
        abort(400, 'Invalid product type')

    # Crear un objeto Favorites y guardarlo en la base de datos
    favorite = Favorites(user_id=user.id)

    if product_type == 'files3d':
        favorite.files3d_id = product_id
    elif product_type == 'patterns':
        favorite.patterns_id = product_id
    else:
        favorite.prints_id = product_id

    db.session.add(favorite)
    db.session.commit()

    return jsonify({"msg": "New favorite created!!"}), 201

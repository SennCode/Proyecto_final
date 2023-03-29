"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Files3D, Patterns, Prints, Files3DRelation, PatternsRelation, PrintsRelation, Favorites
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
        #access_token = create_access_token(identity=user.serialize())
        access_token = create_access_token(identity=user.id)
        
        return jsonify({"access_token": access_token, "user_id": user.id}), 200

    else:
        return jsonify({"msg": "wrong email or password!"}), 400
        

@api.route('/login2', methods=['POST'])
def login2():
    body = request.get_json()

    email = body.get('email')
    password = body.get('password')
    # validar q' email & password != NONE

    users = User.query.filter_by(email=email).all()
    if (len(users)==0):
        return jsonify({"msg":"El usuario con email:" + email + " no existe.","data": None}),201
    
    user = users[0]
    hash = user.password
    isValid = bcrypt.check_password_hash(hash, password)
    if not isValid:
        return jsonify({"msg":"Clave incorrecta.","data":None}), 201

    token = create_access_token(identity={"rol": "usuario", "data": user.serialize()})
    return jsonify({"msg": None,"data":token}), 200


#
# CAMBIAR LA CONTRASEÑA, FALTA METER COMPROBACION DE TIPO DE CONTRASEÑA?
#
@api.route("/password_change", methods=["PUT"])
@jwt_required()
def password_change():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    password = request.json.get("password", None)
    confirm_password = request.json.get("confirm_password", None)
    new_password = request.json.get("new_password",None)
    
    if len(new_password)<4 :
        return jsonify("contraseña no valida"),201
    #user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password) and password==confirm_password:
        #access_token = create_access_token(identity=user.serialize())
        new_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        access_token = create_access_token(identity=user.id)
        user.password= new_password
        db.session.add(user)
        db.session.commit()
        return jsonify(user.serialize()), 200
        #return jsonify({"access_token": access_token, "user_id": user.id}), 200
    else:
        return jsonify("NADA")
    return jsonify(user.serialize()), 201
#
#
#

# ------------
# PRIVATE
# ------------
@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)

    return jsonify(user.serialize()), 200
    
@api.route('/private2', methods=['GET'])
@jwt_required()
def private2():
    data = get_jwt_identity()
    print(data)
    return jsonify(data),200
    #users=User.query.all()
    #result=[]
    #for user in users:
    #    if user.password==

        
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

    # Validar que el usuario que realiza la solicitud tiene permiso para actualizar la información
    if user.id != current_user:
        return jsonify({'msg': 'Unauthorized'}), 401

    # Verificar que el nombre de usuario proporcionado sea válido y único
    username = request.json.get("username")
    if username and User.query.filter_by(username=username).first():
        return jsonify({'msg': 'Invalid username'}), 400

    # # Verificar que la contraseña proporcionada sea válida
    # password = request.json.get("password")
    # if password and len(password) < 8:
    #     return jsonify({'msg': 'Invalid password'}), 400

    # Actualizar la información del usuario
    user.username = username or user.username
    # user.password = bcrypt.generate_password_hash(password).decode('utf-8') if password else user.password

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

@api.route("/store/<category>/<int:id>", methods=['GET'])
def get_file3d(id,category):
    file3d = Files3D.query.get(id)
    pattern = Patterns.query.get(id)
    printo = Prints.query.get(id)

    
    if category == "files3d":
        return jsonify(file3d.serialize())
    if category == "patterns":
        return jsonify(pattern.serialize())
    if category == "prints":
        return jsonify(printo.serialize())
    

# ----------------
# LISTAR PATTERN
# ----------------

@api.route("/store/patterns/<int:id>", methods=['GET'])
def get_pattern(id):
    pattern = Patterns.query.get(id)

    if not pattern:
        return jsonify({'msg': 'Item not found!'})

    return jsonify(pattern.serialize())

# ----------------
# LISTAR PRINT
# ----------------

@api.route("/store/prints/<int:id>", methods=['GET'])
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

#
# CREAR FILES3D
#
@api.route("/set_file3d", methods=["POST"])
def set_file3d():

    #body = request.get_json()
    #name = "pr"#body.get('name')
    #category = "pr"#body.get('category')
    #description = "pr"#body.get('description')
    #file_type = "pr"#body.get('file_type')
    #gender = "pr"#body.get('gender')
    #url = "pr"#body.get('url')
    #type_clothes ="pr" #body.get('type_clothes')
    #size = "pr"#body.get('size')
    #user_id = 15#body.get('user_id')

    name = request.json['name']
    category = request.json['category']
    description = request.json['description']
    file_type = request.json['file_type']
    gender = request.json['gender']
    url = request.json['url']
    type_clothes = request.json['type_clothes']
    size = request.json['size']
    user_id = request.json['user_id']

    file3d = Files3D(
        name = name,
        category = category,
        description = description,
        file_type = file_type,
        gender = gender,
        url = url,
        type_clothes = type_clothes,
        size = size,
        user_id = user_id,
    )

    db.session.add(file3d)
    db.session.commit()
    return jsonify({"msg":"Files3d creado" ,"data":None})


#
# CREAR PATTERNS
#
@api.route("/set_pattern", methods=["POST"])
def set_pattern():
    name = request.json['name']
    description = request.json['description']
    file_type = request.json['file_type']
    gender = request.json['gender']
    url = request.json['url']
    type_clothes = request.json['type_clothes']
    size = request.json['size']
    user_id = request.json['user_id']

    pattern = Patterns(
        name = name,
        description = description,
        file_type = file_type,
        gender = gender,
        url = url,
        type_clothes = type_clothes,
        size = size,
        user_id = user_id,
    )

    db.session.add(pattern)
    db.session.commit()
    return jsonify({"msg":"Pattern creado" ,"data":None})

#
# CREAR PRINTS
#
@api.route("/set_print", methods=["POST"])
def set_print():
    name = request.json['name']
    description = request.json['description']
    file_type = request.json['file_type']
    gender = request.json['gender']
    url = request.json['url']
    type_clothes = request.json['type_clothes']
    #size = request.json['size']
    user_id = request.json['user_id']

    printo = Prints(
        name = name,
        description = description,
        file_type = file_type,
        gender = gender,
        url = url,
        type_print = type_clothes,
        
        user_id = user_id,
    )

    db.session.add(printo)
    db.session.commit()
    return jsonify({"msg":"Print creado" ,"data":None})
# ----------
# cloudinary
# ----------
@api.route("/upload", methods=["POST"])
def upload_image():
    print("hola desde el back")
    archivo = request.files.get('archivo')
    print(archivo)
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
#ESTA NO ES LA QUE USAMOS
@api.route('/favorites', methods=['POST', 'GET'])
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
#USAMOS LAS SIGUIENTES DOS FUNCIONES
@api.route('/get_favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()

    favorites=Favorites.query.filter_by(user_id=user.id)
    result=[]
    products=[]
    for favorite in favorites:
        if(favorite.files3d_id!=1):
             #or favorite.patterns_id!=1 or favorite.prints_id!=1):
            fav=Files3D.query.filter_by(id=favorite.files3d_id)
            result.append(favorite.serialize())

            product=Files3D.query.get(favorite.files3d_id)
            products.append(product.serialize())

        elif(favorite.patterns_id!=1):    

            fav=Patterns.query.filter_by(id=favorite.patterns_id)
            result.append(favorite.serialize())
           
            product=Patterns.query.get(favorite.patterns_id)
            products.append(product.serialize())

        elif(favorite.prints_id!=1):

            fav=Prints.query.filter_by(id=favorite.prints_id)
            result.append(favorite.serialize())

            product=Prints.query.get(favorite.prints_id)
            products.append(product.serialize())
        
    

    return jsonify({"fav_products":products}), 200

@api.route('/set_favorite', methods=['POST'])
@jwt_required()
def set_favorite():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    #current_user_id = get_jwt_identity()
    #user = User.query.filter_by(id=current_user_id).first()

    # Obtener los datos del producto que se quiere agregar a favoritos
    #user_id = request.json['user_id']
    files3d_id = request.json['files3d_id']
    patterns_id = request.json['patterns_id']
    prints_id = request.json['prints_id']

    # Validar que los datos sean correctos
    #if product_type not in ['files3d', 'patterns', 'prints']:
    #    abort(400, 'Invalid product type')

    # Crear un objeto Favorites y guardarlo en la base de datos
    #favorite = Favorites(user_id=user.id)
    favorite = Favorites(user_id=user.id,files3d_id=files3d_id, patterns_id=patterns_id,prints_id=prints_id)
    #if product_type == 'files3d':
    #    favorite.files3d_id = product_id
    #elif product_type == 'patterns':
    #    favorite.patterns_id = product_id
    #else:
    #    favorite.prints_id = product_id

    db.session.add(favorite)
    db.session.commit()

    return jsonify({"msg": favorite.serialize(),"data":user.id}), 200

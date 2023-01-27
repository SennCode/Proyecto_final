from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active
        }


class Product(db.Model):
    __tablename__ = "product"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(200), unique=False, nullable=False)
    file_type = db.Column(db.String(20), unique=False, nullable=False)
    size = db.Column(db.String(20), unique=False, nullable=False)

    # Relaciones

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    category = db.relationship('Category', backref='product', lazy=True)
    gender_id = db.Column(db.Integer, db.ForeignKey('gender.id'))
    gender = db.relationship('Gender')
    clothes_id = db.Column(db.Integer, db.ForeignKey('clothes.id'))
    clothes = db.relationship('Clothes', backref='product', lazy=True)
    img_id = db.Column(db.Integer, db.ForeignKey('img.id'))
    img = db.relationship('Img')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "file_type": self.file_type,
            "size": self.size,
            'user_id': self.user_id,
            'category_id': self.category_id,
            'gender_id': self.gender_id,
            'clothes_id': self.clothes_id,
            'img': self.img
        }


class Category(db.Model):
    __tablename__ = "category"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }


class Gender(db.Model):
    __tablename__ = "gender"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }


class Clothes(db.Model):
    __tablename__ = "clothes"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }


class Img(db.Model):
    __tablename__ = "img"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }


class Favorites(db.Model):
    __tablename__ = "favorites"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    product = db.relationship(Product)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
        }


# class User(db.Model):
#     __tablename__ = "user"
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(120), unique=True, nullable=False)
#     # files3D = db.Column(db.Integer, unique=True, nullable=True)##
#     # patterns = db.Column(db.Integer, unique=True, nullable=True)##
#     # prints = db.Column(db.Integer, unique=True, nullable=True)##
#     # favorites = db.Column(db.Integer, unique=False, nullable=True)##
#     img = db.Column(db.String(120), unique=False, nullable=True)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(80), unique=False, nullable=False)
#     is_active = db.Column(db.Boolean(False), unique=False, nullable=False)

#     def __repr__(self):
#         return f'<User {self.email}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "username": self.username,
#             "img": self.img,
#             "email": self.email,
#             "is_active": self.is_active,


#             # do not serialize the password, its a security breach
#         }


# class Files3D(db.Model):
#     __tablename__ = "files3D"
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(120), unique=True, nullable=False)
#     description = db.Column(db.String(200), unique=False, nullable=False)
#     comments = db.Column(db.String(100), unique=False, nullable=True)
#     file_type = db.Column(db.String(20), unique=False, nullable=False)
#     size = db.Column(db.String(20), unique=False, nullable=False)
#     # product_owner = db.Column(db.Integer, unique=False, nullable=False)##
#     img = db.Column(db.String(300), unique=False, nullable=False)
#     url = db.Column(db.String(300), unique=False, nullable=True)
#     gender = db.Column(db.String(120), unique=False, nullable=True)
#     category = db.Column(db.String(120), unique=False, nullable=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     user = db.relationship(User)
#     # investigar: db.relationship y foreingKey#

#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "description": self.description,
#             "comments": self.comments,
#             "file_type": self.file_type,
#             "size": self.size,
#             "product_owner": self.product_owner,
#             "img": self.img,
#             "url": self.url,
#             "gender": self.gender,
#             "category": self.category,
#             "user_id": self.user_id,
#             "user": self.user.username
#         }


# class Patterns(db.Model):
#     __tablename__ = "patterns"
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(120), unique=True, nullable=False)
#     description = db.Column(db.String(200), unique=False, nullable=False)
#     comments = db.Column(db.String(100), unique=False, nullable=True)
#     file_type = db.Column(db.String(20), unique=False, nullable=False)
#     size = db.Column(db.String(20), unique=False, nullable=False)
#     # product_owner = db.Column(db.Integer, unique=False, nullable=False)##
#     img = db.Column(db.String(300), unique=False, nullable=False)
#     url = db.Column(db.String(300), unique=False, nullable=True)
#     gender = db.Column(db.String(120), unique=False, nullable=True)
#     category = db.Column(db.String(120), unique=False, nullable=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     user = db.relationship(User)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "description": self.description,
#             "comments": self.comments,
#             "file_type": self.file_type,
#             "size": self.size,
#             "product_owner": self.product_owner,
#             "img": self.img,
#             "url": self.url,
#             "gender": self.gender,
#             "category": self.category,
#             "user_id": self.user.username,
#             "user": self.user.username
#         }


# class Prints(db.Model):
#     __tablename__ = "prints"
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(120), unique=True, nullable=False)
#     description = db.Column(db.String(200), unique=False, nullable=False)
#     comments = db.Column(db.String(100), unique=False, nullable=True)
#     file_type = db.Column(db.String(20), unique=False, nullable=False)
#     # product_owner = db.Column(db.Integer, unique=False, nullable=False)
#     img = db.Column(db.String(300), unique=False, nullable=False)
#     url = db.Column(db.String(300), unique=False, nullable=True)
#     gender = db.Column(db.String(120), unique=False, nullable=True)
#     category = db.Column(db.String(120), unique=False, nullable=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     user = db.relationship(User)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "description": self.description,
#             "comments": self.comments,
#             "file_type": self.file_type,
#             "product_owner": self.product_owner,
#             "img": self.img,
#             "url": self.url,
#             "gender": self.gender,
#             "category": self.category,
#             "user_id": self.user_id,
#             "user": self.user.username
#         }


# class Favorites(db.Model):
#     __tablename__ = "favorites"
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     files3DID = db.Column(db.Integer, db.ForeignKey(
#         'files3D.id'))
#     patternsID = db.Column(db.Integer, db.ForeignKey(
#         'patterns.id'))
#     prints_id = db.Column(db.Integer, db.ForeignKey(
#         'prints.id'))

#     files3D = db.relationship(Files3D)
#     patterns = db.relationship(Patterns)
#     prints = db.relationship(Prints)
#     user = db.relationship(User)

#     def serialize(self):
#         return {
#             "favoritoID": self.favoritoID,
#             "user_id": self.user_id,
#             "files3DID": self.files3DID,
#             "patternsID": self.patternsID,
#             "printsID": self.printsID,
#         }

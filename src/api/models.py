from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

db = SQLAlchemy()


# Tabla Users

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    img = db.Column(db.String(120), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(False), unique=False, nullable=False)
    files3d = db.relationship('Files3D', backref='user')
    patterns = db.relationship('Patterns', backref='user')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "img": self.img,
            "email": self.email,
            "password": self.password,
            "is_active": self.is_active
        }

# Tabla Files3D

class Files3D(db.Model):
    __tablename__ = "files3d"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    description = db.Column(db.String(300), unique=False, nullable=False)
    file_type = db.Column(db.String(20), unique=False, nullable=False)
    gender = db.Column(db.String(10), unique=False, nullable=False)
    url = db.Column(db.String(300), unique=False, nullable=False)
    type_clothes = db.Column(db.String(30), unique=False, nullable=False)
    size = db.Column(db.String(20), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "file_type": self.file_type,
            "gender": self.gender,
            "url": self.url,
            "type_clothes": self.type_clothes,
            "size": self.size
        }

# Tabla Patterns

class Patterns(db.Model):
    __tablename__ = "patterns"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(300), unique=True, nullable=False)
    file_type = db.Column(db.String(20), unique=True, nullable=False)
    gender = db.Column(db.String(10), unique=False, nullable=True)
    url = db.Column(db.String(300), unique=False, nullable=True)
    type_clothes = db.Column(db.String(30), unique=False, nullable=True)
    size = db.Column(db.String(20), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "file_type": self.file_type,
            "gender": self.gender,
            "url": self.url,
            "type_clothes": self.type_clothes,
            "size": self.size
        }

# Tabla Favoritos

class Favorites(db.Model):
    __tablename__ = "favorites"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    files3d_id = db.Column(db.Integer, db.ForeignKey(
        'files3d.id'), nullable=False)
    patterns_id = db.Column(db.Integer, db.ForeignKey(
        'patterns.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id
        }

import os
from main import app
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from geoalchemy2 import Geometry

# database
db_connection_string = 'postgresql+psycopg2://{user}:{password}@{hostname}:{port}/{db_name}'
db_connection_params = dict(
    user=os.environ.get('RDS_USERNAME', 'postgres'),
    password=os.environ.get('RDS_PASSWORD', ''),
    hostname=os.environ.get('RDS_HOSTNAME', 'localhost'),
    port=os.environ.get('RDS_PORT', 5432),
    db_name=os.environ.get('RDS_DB_NAME', 'strange_encounters')
)

app.config['SQLALCHEMY_DATABASE_URI'] = db_connection_string.format(**db_connection_params)
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column( db.Integer, primary_key=True, autoincrement=True )
    user_id = db.Column( db.Integer, db.ForeignKey('users.id'), nullable=False )
    content = db.Column( db.Text, nullable=False )
    longitude = db.Column( db.NUMERIC )
    latitude = db.Column( db.NUMERIC )
    point = db.Column( Geometry("POINT") )
    address = db.Column( db.Text )
    timestamp = db.Column(
        db.DateTime,
        index=True,
        default=datetime.utcnow,
        nullable=False
    )
    # location


# class Location


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column( db.Integer, primary_key=True, autoincrement=True )
    first_name = db.Column( db.String(255), nullable=False )
    last_name = db.Column( db.String(255) )
    email = db.Column( db.String(255), unique=True, index=True )
    password_hash = db.Column( db.String(255) )
    posts = db.relationship(
        'Post',
        foreign_keys=[Post.user_id],
        backref=db.backref('user', lazy='joined'),
        lazy='dynamic',
        cascade='all, delete-orphan'
    )

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        # TODO add salt to improve security
        self.password_hash = generate_password_hash(password)
        print(self.password_hash)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_json(self):
        json_user = {
            'first_name': self.first_name,
            'last_name': self.last_name
        }
        return json_user

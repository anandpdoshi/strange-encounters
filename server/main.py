import os
from flask import (Flask, render_template, send_from_directory, request, jsonify)
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_sslify import SSLify
from werkzeug.security import generate_password_hash, check_password_hash
import getpass
import click
import json

# initialization
basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__, static_folder="../frontend/build/", static_url_path='')


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

app.config['SECRET_KEY'] = os.environ['SE_SECRET_KEY']

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = 'strong'
login_manager.login_view = 'login'


@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/auth/register', methods=['POST'])
def register():
    # TODO handle user already exists
    # Exception example
    # sqlalchemy.exc.IntegrityError: (psycopg2.IntegrityError) duplicate key value violates unique constraint "ix_users_email"
    # DETAIL:  Key (email)=(anandpd@umich.edu) already exists.
    #  [SQL: 'INSERT INTO users (first_name, last_name, email, password_hash) VALUES (%(first_name)s, %(last_name)s, %(email)s, %(password_hash)s) RETURNING users.id'] [parameters: {'first_name': 'Anand', 'last_name': 'Doshi', 'email': 'anandpd@umich.edu', 'password_hash': 'pbkdf2:sha256:50000$e0aTWFvA$572efc270a3155d8d22eb30d699be8afdeaa21769efff11e0c4bb147fb032e6f'}]

    import model
    print(request.form)
    form = request.form

    user = model.User(
        first_name=form['first_name'],
        last_name=form['last_name'],
        email=form['email'],
        password=form['password']
    )
    db.session.add(user)

    login_user(user)

    return jsonify({
        'status': 'REGISTRATION_SUCCESS'
    })


@app.route('/api/auth/login', methods=['POST'])
def login():
    from model import User
    form = request.form
    print(form)

    user = User.query.filter_by(email=form['email']).first()
    if user is not None and user.verify_password(form['password']):
        login_user(user, form.get('remember_me', 0))
        return jsonify({
            'status': 'LOGIN_SUCCESS'
        })
        # return redirect(request.args.get('next') or '/')
    else:
        return jsonify({
            'status': 'LOGIN_FAILURE',
            'msg': 'Invalid username or password.'
        })
        # TODO raise exception
        # flash('Invalid username or password.')


@login_manager.user_loader
def load_user(user_id):
    from model import User
    return User.query.get(int(user_id))


@app.route('/api/auth/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    # TODO show correct message?
    # flash('You have been logged out')
    return jsonify({
        'status': 'LOGOUT_SUCCESS'
    })

@app.route('/api/post/new', methods=['POST'])
@login_required
def new_post():
    # TODO validations, new post failure
    from model import Post
    print(request.form)
    print(current_user)
    new_post = Post(
        content=request.form['content'],
        user=current_user._get_current_object()
    )
    db.session.add(new_post)

    return jsonify({
        'status': 'NEW_POST_SUCCESS'
    })

@app.route('/api')
def api():
    return 'api!'

if __name__=='__main__':
    from cli import commands
    commands()

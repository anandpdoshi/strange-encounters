import os
from flask import (Flask, render_template, send_from_directory, request)
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import Form
from wtforms import StringField, SubmitField, SelectField, BooleanField, PasswordField
from wtforms.validators import Required, Length, Email, Regexp, EqualTo
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

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = 'strong'
login_manager.login_view = 'login'


class LoginForm(Form):
    email = StringField('Email', validators=[Required(), Length(1, 64), Email()])
    password = PasswordField('Password', validators=[Required()])
    remember_me = BooleanField('Keep me logged in')
    # submit = SubmitField('Log In')


@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/auth/register', methods=['POST'])
def register():
    print(request.form)
    return json.dumps({
        'status': 'request received'
    })

@app.route('/api/auth/login', methods=['POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            return redirect(request.args.get('next') or '/')
        else:
            # TODO raise exception
            flash('Invalid username or password.')


@app.route('/api/auth/logout')
@login_required
def logout():
    logout_user()
    # TODO show correct message?
    # flash('You have been logged out')
    return redirect('/')


@app.route('/api')
def api():
    return 'api!'

if __name__=='__main__':
    from cli import commands
    commands()

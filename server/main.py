import os
from flask import (Flask, render_template, send_from_directory, request, jsonify)
from flask_login import login_required, current_user
from flask_sslify import SSLify
from werkzeug.security import generate_password_hash, check_password_hash
import getpass
import click
import json

# initialization
basedir = os.path.abspath(os.path.dirname(__file__))
# app = Flask(__name__, static_folder="../frontend/build/", static_url_path='')
app = Flask(__name__)

import model
import auth

@app.route('/')
def index():
    # return app.send_static_file('index.html')
    return render_template('index.html')


@app.route('/api/post/new', methods=['POST'])
@login_required
def new_post():
    # TODO validations, new post failure
    from model import Post, db
    print(request.form)
    print(current_user)
    new_post = Post(
        content=request.form['content'],
        user=current_user._get_current_object()
    )
    db.session.add(new_post)
    db.session.flush()
    db.session.refresh(new_post)

    return jsonify({
        'status': 'success',
        'id': new_post.id
    })

@app.route('/api')
def api():
    return 'api!'

if __name__=='__main__':
    from cli import commands
    commands()

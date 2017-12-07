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
    longitude = float(request.form.get('longitude'))
    latitude = float(request.form.get('latitude'))
    new_post = Post(
        content=request.form['content'],
        user=current_user._get_current_object(),
        longitude=longitude,
        latitude=latitude,
        point='POINT({0} {1})'.format(longitude, latitude),
        address=request.form.get('address')
    )
    db.session.add(new_post)
    db.session.flush()
    db.session.refresh(new_post)

    return jsonify({
        'status': 'success',
        'id': new_post.id
    })


@app.route('/api/post/feed', methods=['POST'])
@login_required
def feed():
    from model import Post, db
    from geoalchemy2.functions import ST_DWithin
    from geoalchemy2.elements import WKTElement

    d = 0.2
    distance = d * 0.014472
    #1 mile = 0.014472 degrees

    longitude = float(request.form.get('longitude'))
    latitude = float(request.form.get('latitude'))

    # wkb_element = from_shape(Point(longitude, latitude), srid=4326)
    wkb_element = WKTElement('POINT({0} {1})'.format(longitude, latitude))
    print(wkb_element)

    result = (Post.query
        .filter(ST_DWithin(Post.point, wkb_element, distance))
        .order_by(Post.timestamp.desc())
        .all())

    return jsonify({
        'status': 'success',
        'feed': [r.to_json() for r in result]
    })


@app.route('/api')
def api():
    return 'api!'


if __name__=='__main__':
    from cli import commands
    commands()

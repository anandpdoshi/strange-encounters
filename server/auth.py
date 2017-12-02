import os
from main import app
from flask import (request, jsonify)
from flask_login import (LoginManager, UserMixin, login_user, logout_user, login_required, current_user)
from sqlalchemy.exc import IntegrityError
import model

app.config['SECRET_KEY'] = os.environ['SE_SECRET_KEY']
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = 'strong'
login_manager.login_view = '/'


@login_manager.user_loader
def load_user(user_id):
    if user_id=='None':
        return None

    # print('User ID', user_id)

    return model.User.query.get(int(user_id))


@app.route('/api/auth/login', methods=['POST'])
def login():
    form = request.form
    print(form)

    user = model.User.query.filter_by(email=form['email']).first()
    if user is not None and user.verify_password(form['password']):
        login_user(user, form.get('remember_me', 0))

        response = jsonify({
            'status': 'success'
        })
        response.set_cookie('authorized', value="1")
        return response
        # return redirect(request.args.get('next') or '/')
    else:
        return jsonify({
            'status': 'failure',
            'msg': 'Invalid username or password.'
        })
        # TODO raise exception
        # flash('Invalid username or password.')


@app.route('/api/auth/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    # TODO show correct message?
    # flash('You have been logged out')
    response = jsonify({
        'status': 'success'
    })

    # clear cookie
    response.set_cookie('authorized', '', expires=0)

    return response


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
    try:
        model.db.session.add(user)
    except IntegrityError:
        return jsonify({
            'status': 'failure',
            'msg': 'You are already registered!'
        })

    else:
        user = model.User.query.filter_by(email=form['email']).first()
        login_user(user, form.get('remember_me', 0))

        return jsonify({
            'status': 'success'
        })

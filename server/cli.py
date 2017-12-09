import click
from main import app
from model import ( db, db_connection_string, db_connection_params )


@click.group()
def commands():
    pass


@click.command()
@click.option('--createdb', is_flag=True, default=False,
              help='create database before init')
def initdb(createdb):
    if createdb:
        new_params = dict(db_connection_params)
        new_params['db_name'] = 'postgres'
        db_uri = db_connection_string.format(**new_params)
        with db.create_engine(db_uri).connect() as conn:
            conn.execute('commit')
            conn.execute('CREATE DATABASE babble')
            conn.execute('CREATE EXTENSION postgis')

    import model
    db.create_all()
    click.echo('Database Created')


@click.command()
def dropdb():
    import model
    db.drop_all()
    click.echo('Database Cleared')


@click.command()
def run():
    app.run(
        debug=True,
        host='0.0.0.0',
        port=8000,
        use_reloader=True,
        threaded=True
    )


commands.add_command(initdb)
commands.add_command(dropdb)
commands.add_command(run)

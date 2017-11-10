from flask import (Flask, render_template, send_from_directory)

app = Flask(__name__, static_folder="../frontend/build/", static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api')
def api():
    return 'api!'

if __name__=='__main__':
    app.run(
        debug=True,
        host='0.0.0.0',
        port=8000,
        use_reloader=True,
        threaded=True
    )

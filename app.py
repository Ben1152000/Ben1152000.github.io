from flask import Flask, render_template, request, session, flash, url_for, send_from_directory
from flask_mail import Mail, Message
import os, json, re, flask_sijax, math, sqlite3, subprocess
from flask import make_response
from functools import wraps, update_wrapper
from datetime import datetime

app = Flask(__name__)

@app.route("/")
def main():
    return render_template('home.html', session=session, filelist=os.listdir('uploads'))

@app.route("/about")
def about():
    return render_template('about.html', session=session)

def nocache(view):
    @wraps(view)
    def no_cache(*args, **kwargs):
        response = make_response(view(*args, **kwargs))
        response.headers['Last-Modified'] = datetime.now()
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '-1'
        return response
    return update_wrapper(no_cache, view)

@app.route('/uploads/<path:filename>', methods=['GET', 'POST'])
@nocache
def download(filename):
    return send_from_directory(directory='uploads', filename=filename, as_attachment=True)

if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    host = str(subprocess.check_output(['ipconfig', 'getifaddr', 'en0']))[2:-3]
    print(host)
    host = "169.231.36.37"
    app.run(debug=True, use_reloader=False, host=host, port=34197) # change use_reloader to True when running

    
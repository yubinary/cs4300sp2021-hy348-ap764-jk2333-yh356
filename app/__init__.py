# Gevent needed for sockets
from app.irsystem import irsystem as irsystem
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template
import os
from gevent import monkey
from flask_cors import CORS

monkey.patch_all()

# Imports

# Configure app
socketio = SocketIO()
# app = Flask(__name__)
app = Flask(__name__, template_folder="build", static_folder="build/static")
CORS(app)
app.config.from_object(os.environ["APP_SETTINGS"])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# DB
db = SQLAlchemy(app)

# Import + Register Blueprints
app.register_blueprint(irsystem)

# Initialize app w/SocketIO
socketio.init_app(app)

# HTTP error handling


@app.errorhandler(404)
def not_found(error):
    return render_template("404.html"), 404

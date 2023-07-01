from flask import Flask
from flask_cors import CORS

APP = Flask(__name__, static_url_path='/static/')
CORS(APP)

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, defaultHandler)

if __name__ == "__main__":
    print("This is the server")
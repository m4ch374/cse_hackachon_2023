from flask import Flask, request
from flask_cors import CORS
from json import dumps
import signal
import jwt

from data_store import data_store
from User import User

APP = Flask(__name__)
CORS(APP)

def quit_gracefully(*args):
    '''For coverage'''
    exit(0)

def defaultHandler(err):
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, defaultHandler)


@APP.route("/auth/register", methods=['POST'])
def register_user():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']
    new_user = User(data_store.get_new_user_id(), username, email, password)
    payload = {
        "uId": data_store.register_user(new_user)
    }
    tok = jwt.encode(payload, "deezNuts", "HS256")
    return dumps({
        "token": tok
    })
#   return "Hello, world!"


if __name__ == "__main__":
    # helloWorld()
    signal.signal(signal.SIGINT, quit_gracefully) # For coverage
    APP.run(port=8080, debug=False, threaded=True) # Do not edit this port


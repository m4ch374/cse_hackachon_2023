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



#############################################
#               REGISTER USER               #
#############################################
@APP.route("/auth/register", methods=['POST'])
def register_user():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']
    # Check if user deets are already registered (i.e.  unique email)
    if data_store._check_email_exists(email) is False:
        new_user = User(data_store.get_new_user_id(), username, email, password)
        user_id = data_store.register_user(new_user)
        payload = {
            "uId": user_id
        }
        tok = jwt.encode(payload, "deezNuts", "HS256")
        return dumps({
            "token": tok
        })
    else:
        return dumps({
            "error": "Email taken"
        })
#   return "Hello, world!"


#############################################
#                LOGIN USER                 #
#############################################
@APP.route("/auth/login", methods=['POST'])
def login_user():
    data = request.get_json()
    email = data['email']
    password = data['password']
    # Check if email+pass combo exists
    user_id = data_store.login_user(email, password)
    if user_id != -1:
        payload = {
            "uId": user_id
        }
        tok = jwt.encode(payload, "deezNuts", "HS256")
        return dumps({
            "token": tok
        })
    else:
        return dumps({
            "error": "Email or password is wrong"
        })


#############################################
#              CREATE SESSION               #
#############################################
@APP.route("/user/create_session", methods=['POST'])
def create_session():
    # data = request.get_json()
    # email = data['email']
    # password = data['password']
    pass


@APP.route("/user/match_me", methods=['POST'])
def match_me():
    # dependent on user's pre-selected tags/interests
    pass

@APP.route("/user/filter_sessions", methods=['POST'])
def filter_sessions():
    # independent of user's pre-selected tags/interests
    pass

if __name__ == "__main__":
    # helloWorld()
    signal.signal(signal.SIGINT, quit_gracefully) # For coverage
    APP.run(port=8080, debug=False, threaded=True) # Do not edit this port


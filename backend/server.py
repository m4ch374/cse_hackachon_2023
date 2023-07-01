from flask import Flask, request
from flask_cors import CORS
from json import dumps
import signal
import jwt

from data_store import data_store
from User import User
from Session import Session

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
#             CREATE A SESSION              #
#############################################
@APP.route("/session", methods=['POST'])
def create_session():
    # get host's id
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(" ")[1]
    host_id = jwt.decode(auth_token, "deezNuts", "HS256")['uId']
    # get session info
    data = request.get_json()
    title = data['title']
    max_guests = data['max_guests']
    start = data['start']
    end = data['end']
    # tags = data['tags']
    country = data['country']
    city = data['city']
    # now create session
    new_session = Session(
        data_store.get_new_session_id(), 
        host_id, 
        title, 
        max_guests, 
        start, 
        end, 
        country, 
        city
    )
    data_store.register_session(new_session)

    return dumps({
        "res": "ok"
    })


#############################################
#             LIST ALL SESSIONS             #
#############################################
@APP.route("/session", methods=['GET'])
def list_sessions():
    # check if user's id exists
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(" ")[1]
    user_id = jwt.decode(auth_token, "deezNuts", "HS256")['uId']
    if data_store.get_user(user_id):
        # return all session info (list of dicts)
        all_sessions = data_store._sessions_to_dict()
        payload = {
            "allSessions": all_sessions
        }
        return dumps(payload)
    else:
        return dumps({ })


#############################################
#         LIST TAG-PREFERRED SESSIONS       #
#############################################
@APP.route("/session_tagged", methods=['GET'])
def list_sessions_tagged():
    # check if user's id exists
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(" ")[1]
    user_id = jwt.decode(auth_token, "deezNuts", "HS256")['uId']
    if data_store.get_user(user_id):
        # return all session info that contain user's tags (if any)
        tagged_sessions = data_store.sessions_tagged_to_dict(user_id)
        payload = {
            "allSessions": tagged_sessions
        }
        return dumps(payload)
    else:
        return dumps({ })


#############################################
#          ADD GUEST TO A SESSION           #
#############################################
@APP.route("/add", methods=['PUT'])
def add_guest():
    # get the guest's id
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(" ")[1]
    guest_id = jwt.decode(auth_token, "deezNuts", "HS256")['uId']
    # get session id
    data = request.get_json()
    sesh_id = data['session_id']
    data_store.add_guest_to_session(guest_id, sesh_id)


#############################################
#        REMOVE GUEST FROM A SESSION        #
#############################################
@APP.route("/remove", methods=['PUT'])
def remove_guest():
    # get the guest's id
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(" ")[1]
    guest_id = jwt.decode(auth_token, "deezNuts", "HS256")['uId']
    # get session id
    data = request.get_json()
    sesh_id = data['session_id']
    data_store.remove_guest_from_session(guest_id, sesh_id)


# @APP.route("/user/match_me", methods=['POST'])
# def match_me():
#     # dependent on user's pre-selected tags/interests
#     pass

# @APP.route("/user/filter_sessions", methods=['POST'])
# def filter_sessions():
#     # independent of user's pre-selected tags/interests
#     pass


if __name__ == "__main__":
    # helloWorld()
    signal.signal(signal.SIGINT, quit_gracefully) # For coverage
    APP.run(port=8080, debug=False, threaded=True) # Do not edit this port

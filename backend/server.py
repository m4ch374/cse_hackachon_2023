from flask import Flask
from flask_cors import CORS
from json import dumps
import signal

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


@APP.route("/", methods=['GET'])
def helloWorld():
  return "Hello, world!"


if __name__ == "__main__":
    helloWorld()
    signal.signal(signal.SIGINT, quit_gracefully) # For coverage
    APP.run(port=8080, debug=False, threaded=True) # Do not edit this port

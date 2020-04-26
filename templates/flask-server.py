"""
To run this server, run the command:
    flask run
"""
from flask import Flask
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app)


@app.route('/message')
def polo():
    return json.dumps({"data": """Thanks for using web-starter-cli,
    this message is from the flask backend
    """})


if __name__ == "__main__":
    app.run()

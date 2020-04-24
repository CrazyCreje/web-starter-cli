"""
To run this server, run the command:
    flask run
"""
from flask import Flask


app = Flask(__name__)


@app.route('/marco')
def polo():
    return {'response': 'polo!'}


if __name__ == "__main__":
    app.run()

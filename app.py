from flask import Flask, render_template
from calculate import addition,subtraction,multiplication,division

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/calc", methods=["POST"])
def calc():
    # 1. Get the data sent by the user (usually in JSON format)
    data = request.get_json()

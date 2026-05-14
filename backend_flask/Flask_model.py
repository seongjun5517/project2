from flask import Flask, request, jsonify
from flask_cors import CORS
from pred.heartPredict import getheartPredict

app = Flask(__name__)

CORS(app)


@app.route("/")
def index():
    return "Flask test"

@app.route("/heart_predict", methods=["POST"])
def getheartPredict():
    print("===========getheartPredict============")

    data = request.get_json()
    print(">>>>>>전송받은 파라메터 request.get_json() : ", data)

    if isinstance(data, list):
        features = data
    elif isinstance(data, dict) and "features" in data:
        features = data["features"]
    else :
        return jsonify({"error : 잘못된 입력"}), 400

    result = getheartPredict(features)

    return jsonify({"prediction " : result})

if __name__ == "__main__":
    app.run(debug=True)
from  flask import Flask, json, jsonify, request
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()
#uri = os.getenv('MONGO_URL')
port = int(os.getenv('PORT', 5000))

@app.route("/api/healthy")
def health():
    print("Health")
    return jsonify({"message":"Healthy..."})

@app.route("/api/submit", methods=["POST"])
def getData():
    data = request.json
    if not data:
        return jsonify({"error": "No JSON data received"}), 400
    try:
        with open("test.json", "r+") as file:
            content = file.read().strip()
            if content:
                extended_data = json.loads(content)
                print(extended_data)
            else:
                extended_data = []
    except:
        extended_data = []
    
    # Save it to a file
    extended_data.append(data)
    with open("test.json", "w") as file:
        json.dump(extended_data, file)

    return jsonify({"message":"success"})

if __name__ == "__main__":
    app.run("localhost", port=port, debug=True)
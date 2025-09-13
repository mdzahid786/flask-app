from  flask import Flask, json, jsonify, request
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()
#uri = os.getenv('MONGO_URL')
port = int(os.getenv('PORT', 5000))
storage_path = os.getenv("BACKEND_STORAGE_PATH", "/data")
os.makedirs(storage_path, exist_ok=True)
data_file = os.path.join(storage_path, "test.json")
@app.route("/api/health")
def health():
    return jsonify({"message":"Healthy..."})

@app.route("/api/submit", methods=["POST"])
def getData():
    data = request.json
    if not data:
        return jsonify({"error": "No JSON data received"}), 400
    try:
        with open(data_file, "r+") as file:
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
    with open(data_file, "w") as file:
        json.dump(extended_data, file)

    return jsonify({"message":"success"})

if __name__ == "__main__":
    app.run("0.0.0.0", port=port, debug=True)
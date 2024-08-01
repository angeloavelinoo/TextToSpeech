from gtts import gTTS
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/save-advice', methods=['POST'])
def save_advice():
    data = request.json
    advice = data.get('advice', "")
    language = "en"
    speech = gTTS(text=advice, lang=language, slow=False)
    speech.save("textSpeech.mp3")
    return jsonify({"message": "Advice saved and audio generated"}), 200

if __name__ == '__main__':
    app.run(debug=True)

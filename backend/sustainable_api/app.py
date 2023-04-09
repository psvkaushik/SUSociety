from flask import Flask, send_file
from leaderboard import leaderboard_bp
from smart_phones import phones_bp
from tasks import tasks_bp
from redeem import redeem_bp
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# register the leaderboard blueprint
app.register_blueprint(leaderboard_bp)
app.register_blueprint(phones_bp)
app.register_blueprint(tasks_bp)
app.register_blueprint(redeem_bp)

@app.route('/images/<path:image_path>')
def serve_image(image_path):
    return send_file("images/"+image_path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

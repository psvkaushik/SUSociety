from flask import Flask
from leaderboard import leaderboard_bp

app = Flask(__name__)

# register the leaderboard blueprint
app.register_blueprint(leaderboard_bp)

if __name__ == '__main__':
    app.run(debug=True)

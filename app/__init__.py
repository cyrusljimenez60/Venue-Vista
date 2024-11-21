from flask import Flask
from app.blueprints import blueprints, web, admin
from config import Config
import mysql.connector

app = Flask(__name__)
app.config.from_object(Config)

# MariaDB connection setup
db_config = {
    'host': app.config['MYSQL_HOST'],
    'user': app.config['MYSQL_USER'],
    'password': app.config['MYSQL_PASSWORD'],
    'database': app.config['MYSQL_DB'],
    'auth_plugin': 'mysql_native_password'  
}

db_connection = mysql.connector.connect(**db_config)
db_cursor = db_connection.cursor()

# Register blueprints
app.register_blueprint(blueprints.bp)
app.register_blueprint(web.bp)
app.register_blueprint(admin.bp)

@app.teardown_appcontext
def teardown_db(exception):
    db_cursor.close()
    db_connection.close()

if __name__ == '__main__':
    app.run(debug=True)
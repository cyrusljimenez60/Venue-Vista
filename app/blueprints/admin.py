from flask import Blueprint, flash, render_template, request, redirect, url_for, current_app,g
import mysql.connector
import os
from werkzeug.utils import secure_filename

bp = Blueprint("admin", __name__)

def get_db():
    if 'db' not in g:
        try:
            g.db = mysql.connector.connect(
                host=current_app.config['MYSQL_HOST'],
                user=current_app.config['MYSQL_USER'],
                password=current_app.config['MYSQL_PASSWORD'],
                database=current_app.config['MYSQL_DB']
            )
        except mysql.connector.Error as e:
            print(f"Error connecting to MySQL: {e}")
            g.db = None  # Handle gracefully or raise an error

    return g.db

@bp.route("/showvenues/") #Connection checker
def index():
    cursor = get_db().cursor()
    cursor.execute('SELECT * FROM tblVenue')
    results = cursor.fetchall()
    cursor.close()
    return str(results)

@bp.route("/admin/")
def admin_index():
    return render_template('admin-index.html')

@bp.route("/admin/login/", methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if not username or not password:
            flash('Please enter both Username and Password.', 'error')
            return render_template('admin-login.html')

        print(f"Received email: {username}")
        print(f"Received password: {password}")
        
        conn = get_db()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM tblAdmin WHERE strAdminUsername = %s", (username,))
        user = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        if user and user['strAdminPassword'] == password:
            return redirect(url_for('admin.admin_dashboard'))
        else:
            flash('Incorrect Username or Password. Please try again.', 'error')
    
    return render_template('admin-login.html')
    
@bp.route("/admin/dashboard/")
def admin_dashboard():
    try:
        conn = get_db()
        cursor = conn.cursor(dictionary=True)
        
        # Fetch logged-in admin's username and title
        cursor.execute("SELECT strAdminUsername, strAdminTitle FROM tblAdmin WHERE intAdminID = %s", (1,))
        admin_data = cursor.fetchone()  
        username = admin_data['strAdminUsername']
        title = admin_data['strAdminTitle']
        
        # Fetch venues data
        cursor.execute('''
            SELECT v.intVenueID, v.strVenueName, l.strLocationText, pr.strPriceRangeText
            FROM tblVenue v
            INNER JOIN tblLocation l ON v.intLocationID = l.intLocationID
            INNER JOIN tblPriceRange pr ON v.intPriceRangeID = pr.intPriceRangeID
        ''')
        venues = cursor.fetchall()
        
        # Fetch total venues count
        cursor.execute('SELECT COUNT(*) AS total_records FROM tblVenue')
        total_records = cursor.fetchone()['total_records']
        
        # Fetch total cities count
        cursor.execute('SELECT COUNT(*) AS total_cities FROM tblLocation')
        total_cities = cursor.fetchone()['total_cities']
        
        cursor.close()
        conn.close()
        
        return render_template('admin-dashboard.html', venues=venues, total_records=total_records, total_cities=total_cities, username=username, title=title)
    
    except Exception as e:
        print(f"Error fetching admin data: {e}")
        flash('An error occurred. Please try again later.', 'error')
        return redirect(url_for('admin.admin_login'))

@bp.route("/admin/forms/", methods=['GET', 'POST'])
def admin_forms():
    db = get_db()
    cursor = db.cursor()

    if request.method == 'POST':
        try:
            venue_name = request.form['venue-name']
            city_location = request.form['city-location']
            complete_address = request.form['complete-address']
            price_range = request.form['price-range']
            venue_capacity = request.form['venue-capacity']
            venue_setting = request.form['venue-setting']
            venue_description = request.form['venue-description']

            # Retrieve the location ID based on the selected city location
            cursor.execute("SELECT intLocationID FROM tblLocation WHERE strLocationText = %s", (city_location,))
            location_row = cursor.fetchone()
            if location_row:
                location_id = location_row[0]
            else:
                flash('Invalid city location selected.', 'error')
                return redirect(url_for('admin.admin_forms'))

            # Retrieve the price range ID based on the selected price range text
            cursor.execute("SELECT intPriceRangeID FROM tblPriceRange WHERE strPriceRangeText = %s", (price_range,))
            price_range_row = cursor.fetchone()
            if price_range_row:
                price_range_id = price_range_row[0]
            else:
                flash('Invalid price range selected.', 'error')
                return redirect(url_for('admin.admin_forms'))
            
            # Retrieve the capacity ID based on the selected capacity range
            cursor.execute("SELECT intCapacityID FROM tblCapacity WHERE strCapacityText = %s", (venue_capacity,))
            capacity_row = cursor.fetchone()
            if capacity_row:
                capacity_id = capacity_row[0]
            else:
                flash('Invalid capacity range selected.', 'error')
                return redirect(url_for('admin.admin_forms'))

            # Insert into tblVenue
            cursor.execute("INSERT INTO tblVenue (strVenueName, strAddress, intLocationID, intPriceRangeID, intCapacityID, strSetting, strDescription) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                           (venue_name, complete_address, location_id, price_range_id, capacity_id, venue_setting, venue_description))
            venue_id = cursor.lastrowid  # Get the auto-incremented venue ID

            # Insert into tblVenueEventType
            event_types = request.form.getlist('event_type[]')
            for event_type in event_types:
                cursor.execute("INSERT INTO tblVenueEventType (intVenueID, intEventTypeID) VALUES (%s, %s)", (venue_id, event_type))

            # Insert into tblVenueFeature
            features = request.form.getlist('feature[]')
            for feature in features:
                cursor.execute("INSERT INTO tblVenueFeature (intVenueID, intFeatureID) VALUES (%s, %s)", (venue_id, feature))

            # Insert into tblVenuePackage
            packages = request.form.getlist('package[]')
            for package in packages:
                cursor.execute("INSERT INTO tblVenuePackage (intVenueID, intPackageID) VALUES (%s, %s)", (venue_id, package))

            # Handle file uploads
            upload_folder = os.path.join(current_app.root_path, 'static', 'images', 'venues', str(venue_id))
            os.makedirs(upload_folder, exist_ok=True)
            print(f"Upload folder created: {upload_folder}")

            for i in range(1, 4):
                file = request.files.get(f'venue-image{i}')
                if file:
                    filename = secure_filename(f'image{i}.jpg')
                    file_path = os.path.join(upload_folder, filename)
                    file.save(file_path)
                    print(f"File saved: {file_path}")
                else:
                    print(f"No file found for venue-image{i}")

            db.commit()  # Commit the transaction
            flash('Venue details added successfully!', 'success')
        except Exception as e:
            db.rollback()  # Rollback on error
            flash(f'Error: {str(e)}', 'error')
            print(f"Error inserting venue: {e}")
        finally:
            cursor.close()

            # Redirect to refresh the form after submission
            return redirect(url_for('admin.admin_forms'))

    return render_template('admin-forms.html')


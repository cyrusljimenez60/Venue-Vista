from flask import Blueprint, render_template, request, current_app, jsonify
import mysql.connector
from flask import g

bp = Blueprint("web", __name__)

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
            g.db = None  # Handle if there is an raise an error

    return g.db

def get_record_by_id(venue_id):
    db = get_db()
    if db is None:
        return None  # Handle the case where the database connection failed

    cursor = db.cursor(dictionary=True)
    query = """
        SELECT v.intVenueID, v.strVenueName, v.strAddress, l.strLocationText, c.strCapacityText, p.strPriceRangeText, p.strPriceCategory, v.strSetting, v.strDescription,
               GROUP_CONCAT(DISTINCT f.strFeatureText SEPARATOR ', ') AS features,
               GROUP_CONCAT(DISTINCT pk.strPackageText SEPARATOR ', ') AS packages,
               GROUP_CONCAT(DISTINCT e.strEventTypeText SEPARATOR ', ') AS event_types
        FROM tblVenue v
        LEFT JOIN tblLocation l ON v.intLocationID = l.intLocationID
        LEFT JOIN tblCapacity c ON v.intCapacityID = c.intCapacityID
        LEFT JOIN tblPriceRange p ON v.intPriceRangeID = p.intPriceRangeID
        LEFT JOIN tblVenueFeature vf ON v.intVenueID = vf.intVenueID
        LEFT JOIN tblFeature f ON vf.intFeatureID = f.intFeatureID
        LEFT JOIN tblVenuePackage vp ON v.intVenueID = vp.intVenueID
        LEFT JOIN tblPackage pk ON vp.intPackageID = pk.intPackageID
        LEFT JOIN tblVenueEventType ve ON v.intVenueID = ve.intVenueID
        LEFT JOIN tblEventType e ON ve.intEventTypeID = e.intEventTypeID
        WHERE v.intVenueID = %s
        GROUP BY v.intVenueID
    """
    cursor.execute(query, (venue_id,))
    record = cursor.fetchone()
    cursor.close()

    return record

@bp.route("/")
def home_page():
    return render_template('index.html')

@bp.route("/city/")
def city_page():
    return render_template('city-page.html')

@bp.route("/city/data/")
def city_data():
    db = get_db()
    if db is None:
        return jsonify({'error': 'Database connection failed'}), 500

    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT v.intVenueID, v.strVenueName, v.strAddress, l.strLocationText, c.strCapacityText, p.strPriceRangeText, p.strPriceCategory, v.strSetting, v.strDescription,
               GROUP_CONCAT(DISTINCT f.strFeatureText SEPARATOR ', ') AS features,
               GROUP_CONCAT(DISTINCT pk.strPackageText SEPARATOR ', ') AS packages,
               GROUP_CONCAT(DISTINCT e.strEventTypeText SEPARATOR ', ') AS event_types
        FROM tblVenue v
        LEFT JOIN tblLocation l ON v.intLocationID = l.intLocationID
        LEFT JOIN tblCapacity c ON v.intCapacityID = c.intCapacityID
        LEFT JOIN tblPriceRange p ON v.intPriceRangeID = p.intPriceRangeID
        LEFT JOIN tblVenueFeature vf ON v.intVenueID = vf.intVenueID
        LEFT JOIN tblFeature f ON vf.intFeatureID = f.intFeatureID
        LEFT JOIN tblVenuePackage vp ON v.intVenueID = vp.intVenueID
        LEFT JOIN tblPackage pk ON vp.intPackageID = pk.intPackageID
        LEFT JOIN tblVenueEventType ve ON v.intVenueID = ve.intVenueID
        LEFT JOIN tblEventType e ON ve.intEventTypeID = e.intEventTypeID
        GROUP BY v.intVenueID
    """)
    venues = cursor.fetchall()
    cursor.close()

    return jsonify(venues)

@bp.route("/event-type/")
def event_type():
    return render_template('eventtype-page.html')

@bp.route("/inner-city/")
def inner_city():
    return render_template('inner-city.html')

@bp.route("/inner-event/")
def inner_event():
    return render_template('inner-event.html')

@bp.route("/overall-sort/")
def overall_sort():
    return render_template('overall-sort.html')

@bp.route("/record-page/<int:venue_id>")
def display_record(venue_id):
    record = get_record_by_id(venue_id)  # Implement this function
    return render_template('record-page.html', record=record)


# This is VenueVista, your Viewfinder for Premiere Event Places in Metro Manila.

This project simplifies the venue-selection process of our clients by providing a comprehensive database of records, and presenting them an organized format based on different sorting settings. Clients can refine their searching process by using the filter search tab, and browse through all of the listings that are compatible to their needs and preferences. VenueVista, your partner to creating memorable moments on every special event!


## Installation Guide

Download the folder "VenueVista" that contains the Python virtual environment and Flask application, and the SQL script "dbVenuevVista.sql".

If MariaDB is not currently installed on your device, please visit https://mariadb.org/download/ to download the server version 11.4.2. Similarly, if MySQL Workbench is not yet installed, you can download the application from https://www.mysql.com/products/workbench/. Follow the installation process and setup your own configurations such as user, password, and host. Use the default port 3306 as much as possible. Make sure to have Python and Git Bash installed in your local machine as well.

## Database Setup

Create a new connection within the MySQL Workbench and assign any suitable name for it. Use the default settings for all configuration options except of course for the username and password.

Upon successful creation, click the connection cell, go to file tab, open the SQL script "dbVenuevVista.sql", and execute the script through pressing the yellow lightning bolt icon. You should now be able to see the dbVenueVista schema in the navigator section on left side panel. 


    
## Running the App

To run the VenueVista web program in your local machine, open the folder "VenueVista" in VsCode, go to config.py file and change user "cyrus" to "root" if you are using the root user, and change the password based on your database setup a while ago.

Ensure that you are at the directory of "VenueVista", open a new bash terminal and activate the virtual environment through this command:

```bash
  source .venv/Scripts/Activate
```

Note that Flask will not run if the venv is not yet activated due to the installed packages that are isolated from the local machine.

Now run the Flask Application by typing this command:

```bash
  flask run
```

Click the url with ctrl button and you should now be able to view the website in your browser. Press ctrl + c button if you want to terminate the app. 


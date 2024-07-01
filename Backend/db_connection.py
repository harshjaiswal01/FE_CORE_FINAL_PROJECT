import mysql.connector
from mysql.connector import Error


#Database connection parameters

db_name = 'ecomm_db'
user = 'root'
password = 'sqlpassword'
host = 'localhost'

def db_connection():
    try:
        #Attempting to establish a connection
        conn = mysql.connector.connect(
            database = db_name,
            user = user,
            password = password,
            host = host
        )

        if conn.is_connected():
            print("Connection to MySql Database Successful")
            return conn
    except Error as e:
        print(f"Error: {e}")
        return None
    

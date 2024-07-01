from flask import Flask, jsonify, request #importing the Flask Class
from flask_marshmallow import Marshmallow
from marshmallow import fields, ValidationError
from db_connection import db_connection, Error

app = Flask(__name__)
ma = Marshmallow(app)

#Creating the Customer Table Schema, to define the structure of data
class CustomerSchema(ma.Schema):
    id = fields.Int(dump_only=True) #dump_only means we dont input data for this field
    customer_name = fields.String(required=True) #required means to be valid need a value
    email = fields.String(required=True)
    phone = fields.String(required=True)

    class Meta:
        fields = ("customer_name", "email", "phone")

customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True) #Fetching all users at once

@app.route('/') #Defining a simple home route
def home():
    return "Welcome to the Flask Party E" #returning a response


#Reading all of our customer data via GET request
@app.route("/customers", methods=['GET'])
def get_customers():
    conn = db_connection()
    if conn is not None:
        try:
            cursor = conn.cursor(dictionary=True)

            #writing query to get all users
            query = "SELECT * FROM customer"
            cursor.execute(query)
            customers = cursor.fetchall()
        finally:
            if conn and conn.is_connected():
                cursor.close()
                conn.close()
                return customers_schema.jsonify(customers)


#Creating customer data using POST REquest

@app.route("/customers", methods=['POST'])
def add_customers():
    try:
        customer_data = customer_schema.load(request.json)
        print(customer_data)
    except ValidationError as e:
        return jsonify(e.messages), 400
    
    conn = db_connection()
    if conn is not None:
        try:
            cursor = conn.cursor()

            #new_customer details
            new_customer = (customer_data['customer_name'], customer_data['email'], customer_data['phone'])

            #query
            query = "INSERT INTO Customer (customer_name, email, phone) VALUES (%s,%s,%s)"

            #Execute query with new_customer data
            cursor.execute(query, new_customer)
            conn.commit()

            return jsonify({'MEssage': "New Customer Added Successfully!"}), 201
        
        except Error as e:
            return jsonify(e.messages), 500
        
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({"Error": "DB CONNECTION FAILED"}), 500


@app.route("/customers/<int:id>", methods=['PUT']) #-- dynamic route whose end point will change with different query parameters
def update_customers(id):
    try:
        customer_data = customer_schema.load(request.json)
        # print(customer_data)
    except ValidationError as e:
        return jsonify(e.messages), 400
    
    conn = db_connection()
    if conn is not None:
        try:
            cursor = conn.cursor()

            #new_customer details
            updated_customer = (customer_data['customer_name'], customer_data['email'], customer_data['phone'], id)

            #update query
            query = "UPDATE Customer SET customer_name = %s, email = %s, phone = %s where id = %s"

            #Execute query with new_customer data
            cursor.execute(query, updated_customer)
            conn.commit()

            return jsonify({'MEssage': f"Customer Data for id {id} Modified Successfully!"}), 201
        
        except Error as e:
            return jsonify(e.messages), 500
        
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({"Error": "DB CONNECTION FAILED"}), 500

#Deleting customer with a DELETE request
@app.route("/customers/<int:id>", methods=['DELETE']) #-- dynamic route whose end point will change with different query parameters
def delete_customers(id):
    
    conn = db_connection()
    if conn is not None:
        try:
            cursor = conn.cursor()

            check_query = "SELECT * FROM Customer WHERE id = %s"

            cursor.execute(check_query, (id,))

            customer = cursor.fetchone()

            if not customer:
                return jsonify({"Error":"Customer not found"}), 404
                

            #delete query
            query = "DELETE from Customer where id = %s"

            #Execute query with new_customer data
            cursor.execute(query, (id,))
            conn.commit()

            return jsonify({'Message': f"Customer Data for id {id} Deleted Successfully!"}), 201
        
        except Error as e:
            return jsonify(e.messages), 500
        
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({"Error": "DB CONNECTION FAILED"}), 500


if __name__ == '__main__': #idiom to verify we're running this selected file and not allow running if imported
    app.run(debug=True)
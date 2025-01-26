from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.sqlite import JSON
from enum import Enum
from datetime import timedelta
import bcrypt
import os

# Initialize the app and configure the database
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db?timeout=10'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_POOL_SIZE'] = 5  # Number of connections to keep in the pool
app.config['SQLALCHEMY_POOL_RECYCLE'] = 300  # Time in seconds to recycle a connection

app.secret_key = os.urandom(24)  # Securely generate a secret key

db = SQLAlchemy(app)

# Initialize CORS
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SECURE"] = False  # Set True in production with HTTPS
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=7) 
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
app.config['JSON_SORT_KEYS'] = False

CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# Define Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(1000), nullable=False)
    forms = db.relationship('Form', back_populates='user', lazy='dynamic')

class FieldType(Enum):
    TEXT = 'text'
    CHECKBOX = 'checkbox'
    SELECT = 'select'
    RADIO = 'radio'

class Form(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), nullable=False)
    description = db.Column(db.String(1000), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship("User", back_populates="forms")
    fields = db.relationship('Field', back_populates='form', lazy='dynamic')
    submissions = db.relationship('FormSubmission', back_populates='form', lazy='dynamic')

    def as_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "user_id": self.user_id,
            "fields": [field.as_dict() for field in self.fields],
            "submissions": [submission.as_dict() for submission in self.submissions]
            
        }

class Field(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(1000), nullable=False)
    isRequired = db.Column(db.Boolean, nullable=False)
    placeholder = db.Column(db.String(1000), nullable=True)
    name = db.Column(db.String(1000), nullable=False)
    type = db.Column(db.Enum(FieldType), nullable=False)
    options = db.Column(JSON, nullable=True)
    form_id = db.Column(db.Integer, db.ForeignKey('form.id'), nullable=False)
    form = db.relationship("Form", back_populates="fields")
    answers = db.relationship('FieldAnswer', back_populates='field', lazy='dynamic')

    def as_dict(self):
        field_dict = {
            "id": self.id,
            "name": self.name,
            "label": self.label,
            "isRequired": self.isRequired,
            "placeholder": self.placeholder,
            "type": self.type.name,
            "type": self.type.value,
            "form_id": self.form_id
        }
        if self.options:
            field_dict["options"] = [{"label": option["label"], "value": option["value"]} for option in self.options]
        return field_dict

class FieldAnswer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String(1000), nullable=False)
    field_id = db.Column(db.Integer, db.ForeignKey('field.id'), nullable=False)
    form_submission_id = db.Column(db.Integer, db.ForeignKey('form_submission.id'), nullable=False)
    field = db.relationship('Field', back_populates='answers')
    form_submission = db.relationship('FormSubmission', back_populates='field_answers')

    def as_dict(self):
        return {
            "id": self.id,
            "value": self.value,
            "field_id": self.field_id,
            "form_submission_id": self.form_submission_id
        }

class FormSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    form_id = db.Column(db.Integer, db.ForeignKey('form.id'), nullable=False)
    form = db.relationship('Form', back_populates='submissions')
    field_answers = db.relationship('FieldAnswer', back_populates='form_submission', lazy='dynamic')

    def as_dict(self):
        return {
            "id": self.id,
            "field_answers": [field_answer.as_dict() for field_answer in self.field_answers]
        }

# Create the database tables
with app.app_context():
    db.create_all()

# Helper function to check if user is logged in
def is_logged_in():
    return 'user_id' in session

@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.remove()

# Routes for API
@app.route("/", methods=["GET"])
def root():
    return jsonify({"message": "Welcome to the API!"}), 200

@app.route('/api/auth/register', methods=["POST"])
def sign_up():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirmPassword")
    name = data.get("name")
    
    if not email or not password or not confirm_password or not name:
        return jsonify({"message": "Name, email, password, and confirm password are required"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 409
    
    if password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400
    
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    new_user = User(email=email, password=hashed_password, name=name)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User created successfully!"}), 201

@app.route('/api/auth/login', methods=["POST"])
def sign_in():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    
    user = User.query.filter_by(email=email).first()

    if not user or not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"message": "Invalid email or password"}), 401

    session['user_id'] = user.id
    session['user_email'] = user.email
    session['user_name'] = user.name

    return jsonify({
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name
        }
    }), 200

@app.route('/api/auth/logout', methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Successfully logged out"}), 200

@app.route("/api/form", methods=["POST"])
def create_form():
    if not is_logged_in():
        return jsonify({"message": "Unauthorized"}), 401

    form_data = request.get_json()
    form_name = form_data.get("name")
    form_description = form_data.get("description")
    fields_data = form_data.get("fields", [])

    new_form = Form(name=form_name, description=form_description, user_id=session['user_id'])
    
    for field_data in fields_data:
        field = Field(
            name=field_data.get("name"),
            label=field_data.get("label"),
            placeholder=field_data.get("placeholder"),
            isRequired=field_data.get("isRequired"),
            type=FieldType[field_data.get("type").upper()],
            form=new_form,
            options=field_data.get("options")
        )
        db.session.add(field)

    db.session.add(new_form)

    try:
        db.session.commit()
        return jsonify({"message": "Form and fields created successfully!"}), 201
    except Exception as e:
        db.session.rollback()  # Rollback the transaction if commit fails
        return jsonify({"message": f"Error: {str(e)}"}), 500

@app.route("/api/form", methods=["GET"])
def get_forms():
    if not is_logged_in():
        return jsonify({"message": "Unauthorized"}), 401
    forms = Form.query.filter_by(user_id=session['user_id']).all()
    return jsonify({"forms": [f.as_dict() for f in forms]}), 200

@app.route("/api/form/<int:form_id>/public", methods=["GET"])
def public_form(form_id):
    form = Form.query.filter_by(id=form_id).first()
    if not form:
        return jsonify({"message": "Form not found"}), 404
    return jsonify({"form": form.as_dict()}), 200

@app.route("/api/form/<int:form_id>", methods=["GET"])
def get_form_by_id(form_id):
    if not is_logged_in():
        return jsonify({"message": "Unauthorized"}), 401

    form = Form.query.filter_by(id=form_id, user_id=session['user_id']).first()
    if not form:
        return jsonify({"message": "Form not found"}), 404
    return jsonify({"form": form.as_dict()}), 200

@app.route("/api/form/<int:form_id>/submit", methods=["POST"])
def submit_form(form_id):
    try:
        submission_data = request.get_json()
        form_answers = submission_data.get("formAnswers")  # Fix: Use "formAnswers" to match frontend

        if not form_answers:
            return jsonify({"message": "formAnswers are required"}), 400

        form = Form.query.get(form_id)
        if not form:
            return jsonify({"message": "Form not found"}), 404

        form_submission = FormSubmission(form_id=form_id)
        db.session.add(form_submission)

        for answer in form_answers:
            field_id = answer.get("fieldId")
            value = answer.get("value")

            if not field_id or value is None:
                continue  # Skip invalid answers

            field = Field.query.get(field_id)
            if not field:
                continue  # Skip answers for non-existent fields

            if field.type == FieldType.CHECKBOX and isinstance(value, list):
                for option in value:
                    field_answer = FieldAnswer(
                        value=option, field_id=field.id, form_submission=form_submission
                    )
                    db.session.add(field_answer)
            else:
                field_answer = FieldAnswer(
                    value=value, field_id=field.id, form_submission=form_submission
                )
                db.session.add(field_answer)

        db.session.commit()
        return jsonify({"message": "Form submitted successfully!"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500
    finally:
        db.session.remove()

@app.route("/api/form/<int:form_id>/response_count", methods=["GET"])
def get_form_response_count(form_id):
    # Get the form by the given form_id
    form = Form.query.get(form_id)  # No user-specific filtering

    if not form:
        return jsonify({"message": "Form not found"}), 404

    # Count the number of form submissions (responses) for the given form ID
    form_responses = FormSubmission.query.filter_by(form_id=form_id)

    # Return the response count
    return jsonify({"form": form_responses.as_dict()}), 200

if __name__ == "__main__":
    app.run(debug=True, port=8000)
    
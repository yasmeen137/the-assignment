from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))

class Form(db.model): 
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    name = db.Column(db.String(1000))
    description = db.Column(db.String(1000))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    fields = db.relationship("Field", backref="form")

class Field(db.model):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    name = db.Column(db.String(1000))
    type = db.Column(db.enumerate(['text','checkbox','select','radio']))
    form_id = db.Column(db.Integer, db.ForeignKey('form.id'))

class FieldAnswer(db.model): 
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    value = db.Column(db.String(1000))
    field_id = db.Column(db.Integer, db.ForeignKey('field.id'))
    formSubmission = db.relationship("FormSubmission", back_populates="fieldAnswers")

class FormSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    form_id = db.Column(db.Integer, db.ForeignKey('form.id'))
    fieldAnswers = db.relationship('FieldAnswer', back_populates='shop', lazy='dynamic')


    
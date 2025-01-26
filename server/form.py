from flask import Blueprint, jsonify
from . import db
from sqlalchemy.orm import aliased
from models import Form 

form = Blueprint('form', __name__)

@form.route('/form', methods=['GET'])
def listForms():
    forms = db.session.query(Form).all() 
    form_list = [form.to_dict() for form in forms]  
    return jsonify(form_list)

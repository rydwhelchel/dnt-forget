"""Sets up the database tables."""
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from app_setup import app, uri

db = SQLAlchemy(app)


class Person(UserMixin, db.Model):
    """Sets up the user table."""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return f"<Person {self.username}>"

    def set_password(self, password):
        """Sets password for the given user"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Checks password for the given user"""
        return check_password_hash(self.password_hash, password)


class Event(db.Model):
    """Sets up the event table"""

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64))
    username = db.Column(db.String(64))
    date = db.Column(db.String(64))
    folder = db.Column(db.Integer, default=0)

    def __repr__(self):

        return f"<Title {self.title}>, Date {self.date}"


class Eventnewtext(db.Model):
    """Sets up the detail text table"""

    id = db.Column(db.Integer, primary_key=True)
    itsid = db.Column(db.String(64))
    text = db.Column(db.String(8000))

    def __repr__(self):
        return f"<Itsid {self.itsid}>,Text {self.text}"


class Folder(db.Model):
    """Each folder stores events. The events themselves
    contain the folder id which they belong to."""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64))
    title = db.Column(db.String(128))


if uri != "fake_data":
    with app.app_context():
        db.create_all()

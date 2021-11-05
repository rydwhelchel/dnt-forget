"""
Just a draft for help.
"""


class Person(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return "<Person {}>".format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


from login import db
from login import Person
import login

db.create_all()
admin = Person(username="admin", email="admin@example.com")
admin.set_password("1234")
guest = Person(username="guest", email="guest@example.com")
guest.set_password("1234")
db.session.add(admin)
db.session.add(guest)
db.session.commit()

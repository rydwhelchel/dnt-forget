import os
import random
from re import DEBUG
import requests
import lyricsgenius as lg
from flask_sqlalchemy import SQLAlchemy
import json

import flask
from flask import Flask, render_template, flash, redirect, url_for
from flask_login import (
    LoginManager,
    login_user,
    logout_user,
    current_user,
    login_required,
    UserMixin,
)

from werkzeug.security import generate_password_hash, check_password_hash
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import ValidationError, DataRequired, Email, EqualTo

from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())


# ----------------------------------Flask Forms-------------------------------------
class LoginForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    remember_me = BooleanField("Remember Me")
    submit = SubmitField("Sign In")


class RegistrationForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired()])
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    password2 = PasswordField(
        "Repeat Password", validators=[DataRequired(), EqualTo("password")]
    )
    submit = SubmitField("Register")

    def validate_username(self, username):
        user = Person.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError("Please use a different username.")

    def validate_email(self, email):
        user = Person.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError("Please use a different email address.")


# --------------------------Main Program--------------------------------
# -----------------------Part I: App Config--------------------------------
app = Flask(__name__)


uri = os.getenv("DATABASE_URL")
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = "wojiubuzhidaole"
app.config["SQLALCHEMY_DATABASE_URI"] = uri


db = SQLAlchemy(app)
login = LoginManager()
login.init_app(app)
login.login_view = "login"  # flash message: “Please log in to access this page."


# ----------------------------Part II: Models---------------------------
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


@login.user_loader  # reload the user object from the user ID stored in the session. It should take the unicode ID of a user, and return the corresponding user object.
def load_user(id):
    return Person.query.get(int(id))


# ----------------------------Part III: Routes---------------------------


@app.route("/")
@app.route("/index")
@login_required
def index():
    return render_template("index.html")


# app.register_blueprint(bp)


@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        # return redirect(url_for("bp.index"))
        return redirect(url_for("index"))
    form = LoginForm()
    if form.validate_on_submit():
        user = Person.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash("Invalid username or password")
            return redirect(url_for("login"))
        login_user(user, remember=form.remember_me.data)
        return redirect(url_for("index"))

    return render_template("login.html", title="Sign In", form=form)


@app.route("/register", methods=["GET", "POST"])
def register():
    if current_user.is_authenticated:
        # return redirect(url_for("bp.index"))
        return redirect(url_for("index"))

    form = RegistrationForm()
    if form.validate_on_submit():
        user = Person(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash("Congratulations, you are now a registered user!")
        return redirect(url_for("login"))
    return render_template("register.html", title="Register", form=form)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(
        host="0.0.0.0", port=int(os.getenv("PORT", 8080)), debug=True,
    )

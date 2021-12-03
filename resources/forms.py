"""Sets up login forms"""
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import ValidationError, DataRequired, Email, EqualTo

from resources.models import Person


class LoginForm(FlaskForm):
    """Sets up form for logging in."""

    username = StringField("Username", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    remember_me = BooleanField("Remember Me")
    submit = SubmitField("Sign In")


class RegistrationForm(FlaskForm):
    """Sets up form for registering."""

    username = StringField("Username", validators=[DataRequired()])
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    password2 = PasswordField(
        "Repeat Password", validators=[DataRequired(), EqualTo("password")]
    )
    submit = SubmitField("Register")


def validate_username(username):
    """Validates that the username does not already exist."""
    user = Person.query.filter_by(username=username.data).first()
    if user is not None:
        raise ValidationError("Please use a different username.")


def validate_email(email):
    """Validates that the e-mail does not already exist."""
    user = Person.query.filter_by(email=email.data).first()
    if user is not None:
        raise ValidationError("Please use a different email address.")

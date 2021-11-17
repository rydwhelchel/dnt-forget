import os
import json
from flask import jsonify, request, Blueprint, render_template, redirect, url_for, flash
from flask_login.utils import login_required
from flask_login import current_user, login_user, logout_user

from resources import (
    db,
    LoginForm,
    RegistrationForm,
    Person,
    get_mock_events,
    Event,
    get_event_list,
    get_dates_titles,
    to_add_events,
    to_delete_events,
)
from app_setup import app, login_manager

bp = Blueprint("bp", __name__, template_folder="./build")

# Not great practice to keep 2 routes on one method, should change in release
@bp.route("/")
@bp.route("/index")
@login_required
def index():
    DATA = {"current_user": current_user.username}
    events = Event.query.filter_by(username=current_user.username).all()
    event_list = get_event_list(events)
    DATA["events"] = event_list
    data = json.dumps(DATA)
    return render_template(
        "index.html",
        data=data,
    )


app.register_blueprint(bp)


@login_manager.user_loader
def load_user(id):
    return Person.query.get(int(id))


@app.route("/register", methods=["GET", "POST"])
def register():
    if current_user.is_authenticated:
        return redirect(url_for("bp.index"))

    form = RegistrationForm()
    if form.validate_on_submit():
        user = Person(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash("Congratulations, you are now a registered user!")
        return redirect(url_for("login"))
    return render_template("register.html", title="Register", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("bp.index"))
    form = LoginForm()
    if form.validate_on_submit():
        user = Person.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash("Invalid username or password")
            return redirect(url_for("login"))
        login_user(user, remember=form.remember_me.data)
        return redirect(url_for("bp.index"))

    return render_template("login.html", title="Sign In", form=form)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("bp.index"))


@app.route("/save", methods=["POST"])
def save():
    """
    Receives JSON data from App.js, saves the event information under the current user
    in the database.
    """

    requested_data = request.json.get("event")
    event_dates, event_titles = get_dates_titles(requested_data)  # request
    event_completion = []
    for i in request.json.get("event"):
        event_completion.append(i.get("completed", False))

    username = current_user.username
    update_db_ids_for_user(username, event_titles, event_dates, event_completion)
    events = Event.query.filter_by(username=current_user.username).all()
    event_jsoned = []
    for i in events:
        event_jsoned.append({"title": i.title, "date": i.date})
    return {"events": event_jsoned}


def update_db_ids_for_user(user, event_titles, event_dates, event_completion):
    """
    Updates the DB with new or removed events.
    @param username: the username of the current user
    @param event_titles: a set of artist IDs that the DB should update itself
        to reflect
    """
    existing_titles = [
        event.title for event in Event.query.filter_by(username=user).all()
    ]


    to_add = to_add_events(event_titles, event_dates, existing_titles)

    for event in to_add:
        db.session.add(Event(title=event[0], username=user, date=event[1]))

    to_update = [
        (completion, titles, event_date)
        for completion, titles, event_date in zip(
            event_completion, event_titles, event_dates
        )
        if completion
    ]
    for instance in to_update:
        updating = Event.query.filter_by(title=instance[1], username=user).first()
        updating.date = instance[2]

    events = Event.query.filter_by(username=user).all()
    existing_titles = [event.title for event in events]

    to_delete = to_delete_events(existing_titles, event_titles, events)

    for event in to_delete:
        db.session.delete(event[1])
    db.session.commit()


if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", 8080)), debug=True
    )

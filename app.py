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
    Event,
    Folder,
    get_event_list,
    get_dates_titles_folders,
    to_add_events,
    to_delete_events,
    get_folder_list,
)
from app_setup import app, login_manager
from resources.helper import get_folder_list
from resources.models import Eventnewtext

bp = Blueprint("bp", __name__, template_folder="./build")


@bp.route("/")
@login_required
def index():
    DATA = {"current_user": current_user.username}
    username=current_user.username
    events = Event.query.filter_by(username=username).all()
    event_list = get_event_list(events)
    folders = Folder.query.filter_by(username=username).all()
    folder_list = get_folder_list(folders)
    DATA["events"] = event_list
    DATA["folders"] = folder_list
    data = json.dumps(DATA)
    return render_template("index.html", data=data)


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
    event_dates, event_titles, event_folders = get_dates_titles_folders(requested_data)  # request
    event_completion = []
    for i in request.json.get("event"):
        event_completion.append(i.get("completed", False))
    username = current_user.username
    update_db_ids_for_user(username, event_titles, event_dates, event_folders, event_completion)
    events = Event.query.filter_by(username=current_user.username).all()
    event_jsoned = get_event_list(events)
    return {"events": event_jsoned}

@app.route("/save_folder", methods=["POST"])
def save_folder():
    """
    Receives JSON data from App.js, saves the event information under the current user
    in the database.
    """

    requested_title = request.json.get("title")
    username = current_user.username
    new_folder = Folder(username=username, title=requested_title)
    db.session.add(new_folder)
    db.session.commit()
    folders = Folder.query.filter_by(username=username).all()
    folder_list = get_folder_list(folders)
    return {"folders": folder_list}

def update_db_text(this_text, this_id):
    to_add = Eventnewtext(itsid=this_id, text=this_text)
    db.session.add(to_add)
    db.session.commit()


@app.route("/details/<eventid>", methods=["GET", "POST"])
def details(eventid):
    pretext = Eventnewtext.query.filter_by(itsid=eventid).all()
    if not pretext:
        return {"text": ""}
    else:
        pretext = pretext[-1].text
    return {"text": pretext}


@app.route("/savetext", methods=["POST"])
def savetext():
    this_text = request.json.get("text")
    this_id = request.json.get("cur")
    this_id = this_id.split("/")
    this_id = this_id[-1]
    update_db_text(this_text, this_id)
    return {"message": ""}


def update_db_ids_for_user(user, event_titles, event_dates, event_folders, event_completion):
    """
    Updates the DB with new or removed events.
    @param username: the username of the current user
    @param event_titles: a set of artist IDs that the DB should update itself
        to reflect
    """
    existing_titles = [
        event.title for event in Event.query.filter_by(username=user).all()
    ]

    to_add = to_add_events(event_titles, event_dates, event_folders, existing_titles)

    for event in to_add:
        db.session.add(Event(title=event[0], username=user, date=event[1], folder=event[2]))

    to_update = [
        (completion, titles, event_date, event_folder)
        for completion, titles, event_date, event_folder in zip(
            event_completion, event_titles, event_dates, event_folders
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

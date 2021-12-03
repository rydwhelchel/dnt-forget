"""Contains a selection of helper functions."""


def get_event_list(events):
    """Gets the list of events in dictionary format."""
    event_list = []
    for i in range(len(events)):
        event_list.append(
            {
                "id": events[i].id,
                "folder": events[i].folder,
                "title": events[i].title,
                "date": events[i].date,
            }
        )
    return event_list


def get_folder_list(folders):
    """Gets the folder list in dictionary format."""
    folder_list = []
    for i in folders:
        folder_list.append({"id": i.id, "title": i.title})
    return folder_list


def get_dates_titles_folders(requested_data):
    """Unpacks requested data"""
    event_dates = []
    event_titles = []
    event_folders = []
    for i in requested_data:
        event_titles.append(i["title"])
        event_dates.append(i["date"])
        event_folders.append(i["folder"])
    return event_dates, event_titles, event_folders


def to_delete_events(existing_titles, event_titles, events):
    """Retrieves events which are marked for delete."""
    return [
        (title, event)
        for title, event in zip(existing_titles, events)
        if title not in event_titles
    ]


def to_add_events(event_titles, event_dates, event_folder, existing_titles):
    """Retrieves events which are marked for addition."""
    return [
        (title, date, folder)
        for title, date, folder in zip(event_titles, event_dates, event_folder)
        if title not in existing_titles
    ]

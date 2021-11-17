def get_event_list(events):
    event_list = []
    for i in range(len(events)):
        event_list.append(
            {"id": events[i].id, "title": events[i].title, "date": events[i].date}
        )
    return event_list


def get_dates_titles(requested_data):
    event_dates = []
    event_titles = []
    for i in requested_data:
        event_titles.append(i["title"])
        event_dates.append(i["date"])
    return event_dates, event_titles


def to_delete_events(existing_titles, event_titles, events):
    return [
        (title, event)
        for title, event in zip(existing_titles, events)
        if title not in event_titles
    ]


def to_add_events(event_titles, event_dates, existing_titles):
    return [
        (title, date)
        for title, date in zip(event_titles, event_dates)
        if title not in existing_titles
    ]


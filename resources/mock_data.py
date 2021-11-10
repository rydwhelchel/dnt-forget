# Keeping mocked events out of app.py
def get_mock_events():
    mock_events = []
    mock_events.append({
        'title': "Mom's Birthday",
        'date': "2021-11-10T12:00"
    })
    mock_events.append({
        'title': "Assignment Due",
        'date': "2021-11-12T23:59"
    })
    mock_events.append({
        'title': "Test!",
        'date': "2021-11-09T12:00"
    })
    return mock_events
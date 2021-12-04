# pylint: skip-file
import os
from helper import get_event_list
import unittest

KEY_INPUT = "input"
KEY_EXPECTED = "expected"


class Event:
    """Mocked database event object"""

    def __init__(self, id, title, username, date, folder):
        self.id = id
        self.title = title
        self.username = username
        self.date = date
        self.folder = folder


#os.environ["DATABASE_URL"] = "fake_data"


class Fun1TestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: [],
                KEY_EXPECTED: [],
            },
            {
                KEY_INPUT: [Event(id=1, folder=4, username="asd", title="2", date="3")],
                KEY_EXPECTED: [{"id": 1, "folder": 4, "title": "2", "date": "3"}],
            },
        ]

    def test_thisfun_success(self):
        for test in self.success_test_params:
            actual_result = get_event_list(test[KEY_INPUT])
            expected_result = test[KEY_EXPECTED]
            self.assertEqual(actual_result, expected_result)


if __name__ == "__main__":
    unittest.main()

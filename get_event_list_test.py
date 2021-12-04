# pylint: skip-file
import os, sys, subprocess
from resources import helper
import unittest

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

os.environ['DATABASE_URL'] = "fake_data"

from resources import Event

class Fun1TestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: [],
                KEY_EXPECTED: [],
            },
            {
                KEY_INPUT: [Event(id=1, folder=4, title="2", date="3")],
                KEY_EXPECTED: [{"id": 1, "folder": 4, "title": "2", "date": "3" }],
            },
        ]

    def test_thisfun_success(self):
        for test in self.success_test_params:
            actual_result = helper.get_event_list(test[KEY_INPUT])
            expected_result = test[KEY_EXPECTED]
            self.assertEqual(actual_result, expected_result)


if __name__ == "__main__":
    unittest.main()

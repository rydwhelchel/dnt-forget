# pylint: skip-file
from resources import helper
import unittest

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

# def get_dates_titles(requested_data):
#     event_dates = []
#     event_titles = []
#     for i in requested_data:
#         event_titles.append(i["title"])
#         event_dates.append(i["date"])
#     return event_dates, event_titles


class Fun1TestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {KEY_INPUT: [], KEY_EXPECTED: ([], [], [])},
            {
                KEY_INPUT: [{"title": "1", "date": "2", "folder": {"id": 3, "title": "title"}}],
                KEY_EXPECTED: (["2"], ["1"], [{"id": 3, "title": "title"}] ),
            },
        ]

    def test_thisfun_success(self):
        for test in self.success_test_params:
            actual_result = helper.get_dates_titles_folders(test[KEY_INPUT])
            expected_result = test[KEY_EXPECTED]
            self.assertEqual(actual_result, expected_result)


if __name__ == "__main__":
    unittest.main()

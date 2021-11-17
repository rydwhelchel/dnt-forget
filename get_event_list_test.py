"""
get_event_list_test.py
"""
from resources import helper
import unittest
from resources import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"


# def get_event_list(events):
#     event_list = []
#     for i in range(len(events)):
#         event_list.append(
#             {"id": events[i].id, "title": events[i].title, "date": events[i].date}
#         )
#     return event_list


class Fun1TestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {KEY_INPUT: [], KEY_EXPECTED: [],},
            {
                KEY_INPUT: [models.Event(id=1, title="2", date="3")],
                KEY_EXPECTED: [{"id": 1, "title": "2", "date": "3"}],
            },
        ]

    def test_thisfun_success(self):
        for test in self.success_test_params:
            actual_result = helper.get_event_list(test[KEY_INPUT])
            expected_result = test[KEY_EXPECTED]
            self.assertEqual(actual_result, expected_result)


if __name__ == "__main__":
    unittest.main()

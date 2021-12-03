# pylint: skip-file
from resources import helper
import unittest
from resources import models

KEY_INPUT1 = "input"
KEY_INPUT2 = "input2"
KEY_INPUT3 = "input3"
KEY_EXPECTED = "expected"


class Fun1TestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT1: ["2"],
                KEY_INPUT2: ["2"],
                KEY_INPUT3: [models.Event(id=1, title="2", date="3")],
                KEY_EXPECTED: [],
            },
        ]

    def test_thisfun_success(self):
        for test in self.success_test_params:
            actual_result = helper.to_delete_events(
                test[KEY_INPUT1], test[KEY_INPUT2], test[KEY_INPUT3]
            )
            expected_result = test[KEY_EXPECTED]
            self.assertEqual(actual_result, expected_result)


if __name__ == "__main__":
    unittest.main()

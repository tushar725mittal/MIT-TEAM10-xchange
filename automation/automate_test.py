import unittest

from mongoautomate import get_creds, init_db

from preprocessing import get_all_CSVs, merge_all_CSVs, get_currency_dict


class TestMongoAutomate(unittest.TestCase):
    def test_init_db(self):
        mongo_id, mongo_password = get_creds()
        db = init_db(mongo_id, mongo_password)
        self.assertEqual(db.name, "northerntrust")


if __name__ == "__main__":
    unittest.main()

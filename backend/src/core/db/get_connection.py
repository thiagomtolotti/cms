from src.core.constants import DATA_PATH


def get_connection():
    import sqlite3

    DB_PATH = DATA_PATH / "database.db"

    conn = sqlite3.connect(DB_PATH)

    return conn

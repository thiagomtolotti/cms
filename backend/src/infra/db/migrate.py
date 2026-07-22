from src.constants import DATA_PATH


DB_PATH = DATA_PATH / "database.db"


def migrate_sqlite():
    if not DB_PATH.exists():
        import sqlite3

        if not DATA_PATH.exists():
            DATA_PATH.mkdir(parents=True)

        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS posts (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                slug TEXT NOT NULL UNIQUE,
                author TEXT NOT NULL,
                date TEXT NOT NULL,
                file_path TEXT NOT NULL,
                image_path TEXT NOT NULL
            )
            """
        )

        conn.commit()
        conn.close()

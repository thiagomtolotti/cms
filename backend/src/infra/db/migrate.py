from pathlib import Path

from src.constants import DATA_PATH

DB_PATH = DATA_PATH / "database.db"
SCRIPTS_PATH = Path(__file__).parent / "scripts"


def migrate_sqlite():
    import sqlite3

    if not DATA_PATH.exists():
        DATA_PATH.mkdir(parents=True)

    for script_file in sorted(SCRIPTS_PATH.glob("*.sql")):
        with open(script_file, "r") as f:
            sql_script = f.read()

        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        try:
            cursor.executescript(sql_script)
        except sqlite3.OperationalError as e:
            if "duplicate column name" not in str(e):
                raise e

        conn.commit()
        conn.close()

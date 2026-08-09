PRAGMA foreign_keys = OFF;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS posts_new (
	id TEXT PRIMARY KEY,
	title TEXT NOT NULL,
	slug TEXT NOT NULL UNIQUE,
	author TEXT NOT NULL,
	date TEXT NOT NULL,
	file_path TEXT NOT NULL,
	image_path TEXT,
	status TEXT NOT NULL
);

INSERT INTO posts_new (id, title, slug, author, date, file_path, image_path, status)
SELECT id, title, slug, author, date, file_path, image_path, status FROM posts;

DROP TABLE posts;
ALTER TABLE posts_new RENAME TO posts;

PRAGMA foreign_key_check;
COMMIT;

PRAGMA foreign_keys = ON;
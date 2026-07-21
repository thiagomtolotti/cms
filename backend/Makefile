.PHONY: dev

dev:
	uv run fastapi dev ./src/main.py --reload --port 8000

build:
	uv build
	uv pip install -e .

start:
	.venv/bin/start
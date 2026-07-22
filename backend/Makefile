.PHONY: dev build start

dev:
	uv run fastapi dev ./src/main.py --reload --port 8000

openapi:
	uv run -m src.scripts.generate_openapi > openapi.json

build:
	uv build
	uv pip install -e .

start:
	.venv/bin/start

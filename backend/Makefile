.PHONY: dev build start setup

setup:
	uv sync

dev:
	uv run fastapi dev ./src/main.py --reload --port 8000

openapi:
	uv run -m src.scripts.generate_openapi > openapi.json

build:
	uv build
	uv pip install -e .

start:
	.venv/bin/start

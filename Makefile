.PHONY: build start api-types typecheck setup

setup:
	$(MAKE) -C backend setup
	cd frontend && npm install

api-types:
	$(MAKE) -C backend openapi
	cd frontend && npm run api-types

build:
	cd frontend && npm ci && npm run build
	cd backend && uv sync && make build

start:
	cd backend && make start
	
typecheck:
	cd backend && make typecheck
	cd frontend && npm run typecheck
.PHONY: build

build:
	cd frontend && npm run build
	cd backend && make build

start:
	cd backend && make start
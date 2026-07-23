.PHONY: build start api-types

setup:
	$(MAKE) -C backend setup
	cd frontend && npm install

api-types:
	$(MAKE) -C backend openapi
	cd frontend && npm run api-types

build:
	cd frontend && npm run build
	cd backend && make build

start:
	cd backend && make start
	
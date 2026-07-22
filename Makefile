.PHONY: build start api-types

api-types:
	$(MAKE) -C backend openapi
	cd frontend && npm run api-types

build:
	cd frontend && npm run build
	cd backend && make build

start:
	cd backend && make start
	
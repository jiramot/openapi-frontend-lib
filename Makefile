BINARY=docker

docker:
	docker build -t ghcr.io/jiramot/openapi-frontend-lib . --no-cache

push:
	docker push ghcr.io/jiramot/openapi-frontend-lib
	
.PHONY: docker push
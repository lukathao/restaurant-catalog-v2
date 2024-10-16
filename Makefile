build:
	docker build -t restcat-ui:latest

run:
	docker run -p 8000:8000 restcat-ui:latest

proto:
	npm run build_proto
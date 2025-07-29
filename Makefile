build:
	cd frontend && npm run build

start:
	npx start-server -s ./frontend/dist

install:
	npm install
	cd frontend && npm install

clean:
	rm -rf node_modules
	cd frontend && rm -rf node_modules

init: install build

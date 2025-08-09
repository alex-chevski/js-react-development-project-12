build:
	cd frontend && npm run build

dev:
	cd frontend && npm run dev

start:
	npx serve -s ./frontend/dist

install:
	npm install
	cd frontend && npm install

clean:
	rm -rf node_modules
	cd frontend && rm -rf node_modules

init: install build

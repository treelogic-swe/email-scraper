help:
	@node src/index.js --help

i: install

install:
	@npm install

lint:
	./node_modules/.bin/eslint .

list:
	@node src/index.js --list

run:
	@node src/index.js ${mailserver} ${keepListening}

test:
	@echo no test yet

uninstall:
	rm -rf node_modules

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

run-debug:
	@node-debug -p 4459 src/index.js ${mailserver} ${keepListening}

test:
	@node test/index.js

uninstall:
	rm -rf node_modules

.PHONY: test

help:
	@node src/index.js --help

i: install

install:
	@npm install

stoptestmailserver:
	@mkdir -p log
	@./test/util/stop_pop3_server.sh > log/stop-pop3-server-log.txt

lint:
	./node_modules/.bin/eslint .

list:
	@node src/index.js --list

run:
	@node src/index.js ${mailserver} ${keepListening}

run-debug:
	@node-debug -p 4459 src/index.js ${mailserver} ${keepListening}

starttestmailserver:
	@node ./test/util/pop3_server.js &

test:
	@make -s stoptestmailserver  # In case previous test failed, leaving mailserver still running.
	@node test/util/pop3_server.js &
	@node test/index.js
	@make -s stoptestmailserver

uninstall:
	rm -rf node_modules

.PHONY: test

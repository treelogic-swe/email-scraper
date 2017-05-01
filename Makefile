NODE_DEBUGGER_PORT=4459

help:
	@node src/index.js --help

i: install

install:
	@npm install

instally:
	@yarn install

stoptestmailserver:
	@mkdir -p log
	@./test/util/stop_pop3_server.sh > log/stop-pop3-server-log.txt

lint:
	./node_modules/.bin/eslint .

list:
	@node src/index.js --list

run:
	@node src/index.js --mailserver=${mailserver} --username=${username} --password=${password} --${keepListening}

run-debug:
	@node-debug -p ${NODE_DEBUGGER_PORT} src/index.js --mailserver=${mailserver} --username=${username} --password=${password} --${keepListening}

starttestmailserver:
	@node ./test/util/pop3_server.js &

test:
	@make -s stoptestmailserver  # In case previous test failed, leaving mailserver still running.
	@node test/util/pop3_server.js &
	@if [ ${debug} ]; \
	then \
		node-debug -p ${NODE_DEBUGGER_PORT} test/index.js; \
	else \
		node test/index.js; \
	fi
	@make -s stoptestmailserver

test-debug:
	echo This is not popping up the graphical debugger window that it should.
	@make -s test debug=true

uninstall:
	rm -rf node_modules

.PHONY: test

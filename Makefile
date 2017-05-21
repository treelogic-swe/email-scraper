NBIN=./node_modules/.bin
GIT_PROJECT=https://github.com/treelogic-swe/email-scraper

help:
	@node src/index.js --help

i: install

install:
	@npm install

instally:
	@yarn install

clean:
	rm -rf node_modules

stoptestmailserver:
	@mkdir -p log
	@./test/util/stop_pop3_server.sh > log/stop-pop3-server-log.txt

lint:
	$(NBIN)/eslint .

list:
	@node src/index.js --list

run:
	@echo This only runs against the default mailserver, localTest.  Use 'npm run-script run -- ' to use command line options.
	@node src/index.js

run-debug:
	@echo This only runs against the default mailserver, localTest.  Use 'npm run-script run-debug -- ' to use command line options.
	@node --inspect --debug-brk src/index.js

run-against-test-server:
	@echo To start the test mail server, run make starttestmailserver.
	@node src/index.js --mailserver=localTest --username=foo

run-against-test-server-debug:
	@node --inspect --debug-brk src/index.js --mailserver=localTest --username=foo

starttestmailserver:
	@node ./test/util/pop3_server.js &

test:
	@make -s stoptestmailserver  # In case previous test failed, leaving mailserver still running.
	@node test/util/pop3_server.js &
	@if [ ${debug} ]; \
	then \
		node --inspect --debug-brk test/index.js; \
	else \
		node test/index.js; \
	fi
	@make -s stoptestmailserver

test-debug:
	echo This is not popping up the graphical debugger window that it should.
	@make -s test debug=true

changelog:
	@rm CHANGELOG.md
	$(NBIN)/changelog $(GIT_PROJECT) -m > CHANGELOG.md

uninstall:
	rm -rf node_modules

.PHONY: test

# Overview

Scrapes e-mail from a specified e-mail server, extracting string results according to specified matching patterns, and sends the output to a configured location.

This is useful, for example, for having billing information written to a database from a service that sends e-mail notification of payment received, but offers no programmatic api for obtaining the data.

# Prerequisites

  * NodeJS.  See `engines` field in the file `./package.json` for details on the version.
  * Configure `./conf/mail_servers.conf.js` following the pattern set by the entry `kattare` in that file.
    * Note that the username and password can be set in the clear.  Otherwise, the keyword `retrieve` will cause the mail
    program to run a separate, custom module to retrieve the credentials.
  * Configure `./conf/output_targets.conf.js` following the pattern set by the entry `kattare` in that file.

# Install

`make install`

Alternative: `make instally` .  This will use the [yarn package manager](https://yarnpkg.com) instead of npm.  Yarn is typically much, much faster.

# Configure

If not running using the test server, then the mail server and extraction job will need to be configured.  See `./conf/README.md` for details.

# Run

If not using the test mail server, then the argument to `make run` must be a configured mail server.  See the "List Configured Servers" section for more info.

Example:

```
make --mailserver=kattare run
```

To keep the server listening indefinitely, do (using kattare again as an example):

```
make --mailserver=kattare --keepListening=true run
```

If using the test server, no arguments are required: simply do `make run`.  However, the test server must be running.  Start it like this: `make starttestmailserver`.  Stop it like this: `make stoptestmailserver`.

# Develop / Contribute

Ensure that your code meets lint:

`make lint`

Then run the tests as shown below.

# Debug

## Prerequisites

  * `npm install -g node-inspector`
  * Chrome or Opera as your default browser.
  * Network port 4599 free or modify Makefile to suit.
  * More info: https://github.com/node-inspector

## Run

make mailserver=kattare run-debug

# Test

First, configure the test mail server in `./conf/test.conf.js`, according to the relevant information in `./conf/README.md`.  Then, run:

`make test`

# List Configured Servers

`make --list`

# Uninstall

`make uninstall`

# Help

Get help on the mail program features like this:

```
make --help
```
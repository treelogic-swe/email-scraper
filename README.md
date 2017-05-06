# Overview

Scrapes e-mail from a specified e-mail server, extracting string results according to specified matching patterns, and sends the output to a configured location.

This is useful, for example, for having billing information written to a database from a service that sends e-mail notification of payment received, but offers no programmatic api for obtaining the data.

Can be used from the command line or programmatically, as described below in the "Usage" section.

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

# Usage

## Command-Line

Example (running with all defaults, which uses the test mailserver that is bundled with this project):

```
make run
```

If not using the test mail server, then the argument to `make run` must be a configured mail server.  See the "List Configured Servers" section for more info.

Example:

```
make run mailserver=foo username=bar password=bat
```

To keep the server listening indefinitely, do (using kattare again as an example):

```
make run mailserver=foo username=bar password=bat keepListening=true
```

If using the test server, no arguments are required: simply do `make run`.  However, the test server must be running.  Start it like this: `make starttestmailserver`.  Stop it like this: `make stoptestmailserver`.

## Programmatic

The file `src/index.js` shows how to use this package from your NodeJS program.  Essentially, you will use the module, `src/scrape_mail.js` as your entry point.

# Develop / Contribute

Ensure that your code meets lint:

`make lint`

Then run the tests as shown below, ensuring that you see "Test Passed" as the test result.

# Debug

## Prerequisites

  * `npm install -g node-inspector`
  * Chrome or Opera as your default browser.
  * Network port 4599 free or modify Makefile to suit.
  * More info: https://github.com/node-inspector

## Run

`make run-debug`

You can use the same command line options as above with `make run`.

# Test

## Prerequisites

Port 1110 must be available.

## Run

`make test`

## Configure

Configure the test mail server and other settings in `./conf/test.conf.js`, according to the relevant information in `./conf/README.md`.

# List Configured Servers

`make list`

# Uninstall

`make uninstall`

# Help

Get help on the mail program features like this:

```
make help
```

# Development Tips

## Run Fast

To iterate quickly over successive runs, use the bundled local test email server.  To do this, first start the test email server with `make starttestmailserver`.  Then, do `make run-against-test-server`.

## Change the Test Data

If you would like to alter the test data that is used by the bundled local test email server, this is done in the file `./test/util/test_messages.js`.  Modify the two components, the message body list and the message metadata list.  To see your change, you will need to restart the test email server: `make stoptestmailserver`.

# Contributing

Ensure that:

  * Your pull or merge request passes all tests (see Test section above) and passes lint (`make lint`).
  * Document any new options or behaviors in a `README.md` (new or existing) and, as needed, in the output of `make help`.

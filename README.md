![email-scraper Logo](./resources/images/email-scraper.png)  [![Build Status](https://travis-ci.org/treelogic-swe/email-scraper.png?branch=master)](https://travis-ci.org/treelogic-swe/email-scraper)

# Summary

Turn a mailbox into a read API.

# Overview

Scrapes e-mail from a specified e-mail server, extracting string results according to specified matching patterns, and sends the output to a configured location.

This is useful, for example, for having billing information written to a database from a service that sends e-mail notification of payment received, but offers no programmatic api for obtaining the data.

Can be used from the command line or programmatically, as described below in the "Usage" section.

# Prerequisites

  * NodeJS.  See `engines` field in the file `./package.json` for details on the version.
  * Recommended: [yarn package manager](https://yarnpkg.com).

## Non-test Usage

To use this beyond the default test settings, you will need to:

  * Configure `./conf/mail_servers.conf.js` by following the pattern set by any entry in that file.
    * Note that the username and password can be set in the clear.  Otherwise, the keyword `retrieve` will cause the mail
    program to run a separate, custom module to retrieve the credentials.
  * Configure `./conf/output_targets.conf.js` by following the pattern set by any entry in that file.

# Install

```
npm install email-scraper
make instally
```

Tip: Use the provided alternative: `make instally` .  This will use the [yarn package manager](https://yarnpkg.com) instead of npm.  Yarn is typically much, much faster.
If you do not have or want `yarn`, do: `make install` instead of `make instally`.

# Configure

If not running using the test server, then the mail server and extraction job will need to be configured.  See `./conf/README.md` for details.

# Usage

## Command-Line

### Prerequistes

* A running mailserver and access to the same.  You can use the bundled local test email server.  The test server must be running.  Start it like this: `make starttestmailserver`.  Stop it like this: `make stoptestmailserver`.

### Examples

Example (running with all defaults, which uses the test mailserver that is bundled with this project; assumes that the test email server is running (see above)):

```
make run
```

If using any command line arguments, use the included npm scripts as shown below.

Example:

```
npm run-script run -- --startAt=1
```

To keep the server listening indefinitely on mailserver 'foo':

```
npm run-script run -- --mailserver=foo --username=bar --password=bat --keepListening=true
```


## Programmatic

The file `src/index.js` shows how to use this package from your NodeJS program.  Essentially, you will use the module, `src/scrape_mail.js` as your entry point.

# Develop / Contribute

Ensure that your code meets lint:

`make lint`

Then run the tests as shown below, ensuring that you see "Test Passed" as the test result.

# Debug

## Prerequisites

The pre-requisites are the same as for [`node --inspect`](https://nodejs.org/api/debugger.html#debugger_v8_inspector_integration_for_node_js).  For more info see [Debugging Node.js with Chrome DevTools](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27).


## Run

`make run-debug`

### Run with Arguments

Example 1:

```
npm run-script run-debug -- --startAt=1
```

Example 2:

```
npm run-script run-debug -- --mailserver=foo --username=bar --password=bat --keepListening=true
```

## Output Options

Current output options include output to console, write to file (currently includes csv format), or write to database.  Use the command line option `--output` to select the output type.  The default is output to the console.

See the file `conf/output_targets.conf.js` for examples of the output options available.  That is where you will do any configuration you need for your output.  For info on the database structure required for database output, see the file `test/util/setup/db/mysql.sql`.

# Test

## Prerequisites

Port 1110 must be available.

## Run

`make test`

## Debug

`make test debug=true`

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
  * Any new or changed behavior has an associated automated test case that runs under `make test`.
  * Document any new options or behaviors in a `README.md` (new or existing).
  * Any new or changed options must be documented in the output of `make help`.
  * Ensure all contributed code meets the license requirements in `LICENSE.txt`.

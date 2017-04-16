# Overview

Scrapes e-mail from the a given e-mail server, extracting string results according to specified matching patterns, and sends the output to a configured location.

This is useful, for example, for having billing information written to a database from a service that sends e-mail notification of payment received, but offers no programmatic api for obtaining the data.

# Prerequisites

  * NodeJS.  See `engines` field in the file `./package.json` for details on the version.
  * Configure `./conf/mail_servers.conf.js` following the pattern set by the entry `kattare` in that file.
    * Note that the username and password can be set in the clear.  Otherwise, the keyword `retrieve` will cause the mail
    program to run a separate, custom module to retrieve the credentials.
  * Configure `./conf/output_targets.conf.js` following the pattern set by the entry `kattare` in that file.


# Install

`make install`

# Run

The argument to `make run` must be a configured mail server.  See the "List Configured Servers" section for more info.

Example:

```
make mailserver=kattare run
```

To keep the server listening indefinitely, do (using kattare again as an example):

```
make mailserver=kattare keepListening=true run
```

# Develop / Contribute

Ensure that your code meets lint:

`make lint`

Then run the tests as shown below.

# Test

First, configure the test mail server in `./conf/test.conf.js`, according to the existing example there.  Then, run:

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

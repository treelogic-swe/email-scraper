# Overview

Scrapes e-mail from the treelogic_admin@kattare.com e-mail account. This can be used to programmatically obtain, for example, billing information from Kattare. Since Kattare has no programmatic API for this, we do it this way.

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

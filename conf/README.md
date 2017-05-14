# Configuration

## Overview

This doc covers the options available for configuring `email-scraper`, including configuring the automated tests.

## Mail Servers

Configure the mail servers you access in the file, `./mail_servers.conf.js`.  Each mail server gets a name, which is a top-level key in the hash held by the `const` identifier, `mailServers`.  The rest of the details are documented in the first such key as JavaScript comments.

## Mail Data Extraction

Configure what data you want extracted in the file, `./mail_servers.conf.js`.  Each mail server entry, as described above, has an `extractTasks` entry.  Enter your specification there according to the detailed documentation.  That can be found as JavaScript comments in tne `extractTasks` entry for the first mail server defined in the file.

## Output

Output is configured in the file `./output_targets_conf.js`.  Any keys of the top-level object match with those given in `./mail_servers.conf.js`.  It is optional to set an output definition for a mail server.  If none is set, then the output will go to `stdout`.  The rest of the details are documented in the first such key as JavaScript comments.

Note that each successful match for an extraction task is accompanied by a 128-character hashcode created from the email message object itself.  This hashcode is stored in a parallel array to the arrays containing the match(es) for the e-mail message.  This array is accessed in the `scrapeResult` as `email-scraper-reserved-hash`.  No entry is made in any result for a message that has no matches. In other words, nothing is recorded about messages that don't have any successful matches.

## Test

To specify the mailserver against which the test runs (`make test`), set it in `./test.conf.js`.  Usually you will just want to use the mailserver that is pre-configured in that file.  That mailserver is included with this package.

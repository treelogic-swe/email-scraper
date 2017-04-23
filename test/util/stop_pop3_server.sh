#!/bin/bash

PID=`ps -ef | grep 'node .*test/util/pop3_server.js' | grep -v grep | awk '{print $2}'`

if [ ! -z $PID ]
then
  echo Killing the test mail server pid $PID . . .
  kill $PID
fi

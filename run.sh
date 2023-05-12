#! /bin/bash



sudo kill -9 $(sudo lsof -t -i:$1)
clear
node Server.js $1

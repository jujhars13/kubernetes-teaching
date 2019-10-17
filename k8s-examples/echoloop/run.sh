#!/bin/bash

export DEBIAN_FRONTEND=noninteractive
set -e

counter=0
while true;
do
  counter=$((counter+1))
  echo $counter
  sleep 1
done
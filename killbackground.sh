#!/usr/bin/bash

echo "Killing Node"
pkill node
echo "Finished Killing Node"
echo "Killing Npm"
pkill npm
echo "Finished Killing Npm"
echo "Restoring Text"
stty sane
echo "Finished Restoring Text"
echo "test"
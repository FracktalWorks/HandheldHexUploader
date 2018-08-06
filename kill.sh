#!/bin/sh

pkill -15 Xorg
npx forever stopall
killall node
killall chromium
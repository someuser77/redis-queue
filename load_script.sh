#!/bin/bash
cat enqueue.lua | redis-cli -x script load 

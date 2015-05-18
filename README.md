# redis-queue
An demonstration of queues with redis using NodeJS.

When enqueuing the user passes the key to the list representing the queue, a limit and an item.

The script check to see if the length of the list is smaller than the given limit using [LLEN](http://redis.io/commands/LLEN) and if so uses [RPUSH](http://redis.io/commands/RPUSH) to add an item to the list.

On success the current list size is returned, if the list is longer than the limit -1 is returned.

Based on the fact redis runs lua scripts atomically.

Can be summarized as:

```
$ cat enqueue.lua | redis-cli -x script load 
"12b606bd209df464acff0a8d8b7a6d8d6e4e9e24"
$ redis-cli evalsha 12b606bd209df464acff0a8d8b7a6d8d6e4e9e24 1 queue 3 'Message 1'
(integer) 1
$ redis-cli evalsha 12b606bd209df464acff0a8d8b7a6d8d6e4e9e24 1 queue 3 'Message 2'
(integer) 2
$ redis-cli evalsha 12b606bd209df464acff0a8d8b7a6d8d6e4e9e24 1 queue 3 'Message 3'
(integer) 3
$ redis-cli evalsha 12b606bd209df464acff0a8d8b7a6d8d6e4e9e24 1 queue 3 'Message 4'
(integer) -1
$ redis-cli lpop queue
"Message 1"
$ redis-cli evalsha 12b606bd209df464acff0a8d8b7a6d8d6e4e9e24 1 queue 3 'Message 4'
(integer) 3
$ redis-cli lpop queue
"Message 2"
$ 
```
The line `redis-cli evalsha 12b606bd209df464acff0a8d8b7a6d8d6e4e9e24 ...` calls the script with the given sha specifying there is 1 key `queue` and the rest are the parameters which are the limit (3) and the content (Message N).

As you can see the first 3 messages are added and the 4'th is rejected.

# Usage

## Clear the queue key
```$ nodejs clear.js ```

## Flush existing scripts
```$ redis-cli script flush ```

## Load the script into redis
Just run the script load_script.sh
```$ ./load_script.sh ```
Or you can run this command directly:

```$ cat enqueue.lua | redis-cli -x script load ```

And copy the return sha into producer.js so it will know which script to run.

## Start the producer
```$ nodejs producer.js ```

## Start the consumer
```$ nodejs consumer.js ```


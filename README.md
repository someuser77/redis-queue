# redis-queue
An demonstration of queues with redis using NodeJS.

When enqueuing the user passes the key to the list representing the queue, a limit and an item.
The script check to see if the length of the list is smaller than the given limit using [LLEN](http://redis.io/commands/LLEN) and if so uses [RPUSH](http://redis.io/commands/RPUSH) to add an item to the list.

On success the current list size is returned, if the list is longer than the limit -1 is returned.

Based on the fact redis runs lua scripts atomically.

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


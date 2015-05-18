# redis-queue
An demonstration of queues with redis using NodeJS.

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


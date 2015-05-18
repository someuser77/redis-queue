local queue = KEYS[1]
if not tonumber(ARGV[1]) then return "Expected number type on argv[1]" end
local limit = tonumber(ARGV[1])
if redis.call("LLEN",  queue) < limit then
	return redis.call("RPUSH", queue, ARGV[2])
else
	return -1
end

var Redis = require('redis');
var client = Redis.createClient();
var queue = 'queue'; 
 
client.on('connect', function() {
    console.log('connected');	
});

client.del(queue,  function(err, reply) {
    console.log(reply);
});
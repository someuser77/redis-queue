var Q = require('q');
var Redis = require('redis');
var client = Redis.createClient();
 
client.on('connect', function() {
    console.log('connected');	
});

var printReply = function(err, reply) {
    console.log(reply);
};

var queue = 'queue';
var sha = '12b606bd209df464acff0a8d8b7a6d8d6e4e9e24';
var i = 0;
setInterval(function(){
	console.log('Enqueuing message ' + i);
	client.evalsha(sha, 1, queue, 3, 'message ' + i, function (err, reply){
		console.log(reply);
	});
	i++;
}, 1000);


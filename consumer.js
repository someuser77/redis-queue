var Q = require('q');
var Redis = require('redis');
var client = Redis.createClient();
var queue = 'queue'; 
client.on('connect', function() {
		console.log('connected');
	})
	.on('ready', function() {
		console.log('ready');
		this.emit('timeline');
	})
	.on('timeline', function() {
		var self = this;
		console.log('Dequeueing...');
		this.blpop(queue, 0, function(err, result) {
			console.log('Got message;');
			var message = result[1];
			console.log(message);
			self.emit('timeline');
		});
	});



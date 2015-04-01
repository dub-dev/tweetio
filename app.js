//var io = require('socket.io')(80)

var cfg = require('./config.json')
var tw = require('node-tweet-stream')(cfg)

var filter = []

Array.prototype.has = function(obj)
{
	var i = this.length
	while(i--)
	{
		if(this[i] === obj)
			return true
	}
	return false
}

function getFilter(index)
{
	for(i = index + 1; i < process.argv.length; i++)
		filter.push(process.argv[i].toLowerCase())
}

process.argv.forEach(function(arg, index)
{
	switch(arg.toLowerCase())
	{
		case "-f":
			getFilter(index)
			break
		default:
			tw.track(arg)
	}
})

tw.on('tweet', function(tweet)
{
	var words = tweet.text.split(" ")
	if(filter.length != 0)
	{
		words.forEach(function(word)
		{
			if(filter.has(word.toLowerCase()))
				console.log(tweet.text)
		})
	}
	else
	{
		console.log(tweet.text)
	}
})
var util = require("util")
var http = require("http")
var request = require("request");

function getStringBetween(str, start, end) {
    
	const middle = str.slice(
		str.indexOf(start) + start.length,
		str.indexOf(end),
	);

    return middle;
}

var content = "";
const output = [];
request(
    { uri: "https://time.com" },
    function(error, response, body) {
		content = body
		var block = getStringBetween(content, 'latest-stories__heading', '<section class="homepage-section-v2 mag-subs"')
		var blocks = block.split('<li class="latest-stories__item">');
		var i;
		for (i = 1; i < blocks.length; i++) {
			let datum = {
				title: getStringBetween(blocks[i], 'class="latest-stories__item-headline">', '</h3>'),
				linkn: "https://time.com".concat(getStringBetween(blocks[i], 'href="', '">'))
			};
			output.push(datum);
		}
		console.log(output);
		const obj = JSON.stringify(output)
		var server = http.createServer(function(req, res) {
			res.writeHead(200);
			res.end(obj);
		});
		server.listen(8080);
		
    }
);




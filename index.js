const fs = require('fs');
const http = require('http');
var url = require('url');
const port = 8080;

function writeHeaders(response){
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	response.setHeader('Access-Control-Allow-Headers', '*');
}



function Request(request,response){
	response.hasEnded = false;
	response.properEnd = (...args) => {
		if(!response.hasEnded){
			response.hasEnded = true;
			return response.end(...args);
		}
	}
	writeHeaders(response);


	if (request.method === 'OPTIONS'){
		response.properEnd();
	} else if(request.method === 'POST'){
		response.write("dont work rn")
		response.properEnd();
	} else if(request.method === 'GET'){
		var query = url.parse(request.url, true).query;
		console.log(request.url)
		try {
			var data = fs.readFileSync(query.file);
			response.write(data);
			response.properEnd();
		} catch (error) {
			response.write("inturnal error (most likly file not font)");
			response.properEnd();
		}

		
		response.write("dont work rn")
		response.properEnd();
	} else {
		response.write("fall back?")
		response.properEnd();
	}


	
}

var server = http.createServer(Request);
server.listen(port);
console.log("Server is running")
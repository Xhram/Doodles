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
		var urlData = url.parse(request.url, true);

		
		var path = "./client"+urlData.pathname;
		if(path.endsWith("/")){
			path+="index.html"
		}

		
		var contentType = getContentTypeByPath(path)
		if(contentType != "null"){
			response.setHeader("Content-Type",contentType)
		}


		
		try {
			var data;
			if(contentType.endsWith("charset=utf-8")){
				data = fs.readFileSync(path, "utf-8");
			} else {
				data = fs.readFileSync(path);
			}
			response.write(data)
			response.properEnd();
		} catch (error) {
			response.write(fs.readFileSync("./404/index.html","utf8"));
			response.properEnd();
		}

		
	} else {
		response.write("fall back?")
		response.properEnd();
	}


	
}

var server = http.createServer(Request);
server.listen(port);
console.log("Server is running")

function getContentTypeByPath(path){
	if(path.endsWith(".html")){
		return 'text/html; charset=utf-8'
	}
	if(path.endsWith(".css")){
		return 'text/css; charset=utf-8'
	}
	if(path.endsWith(".js")){
		return 'application/javascript; charset=utf-8'
	}
	if(path.endsWith(".svg")){
		return 'image/svg+xml'
	}
	if(path.endsWith(".woff2")){
		return 'font/woff2'
	}
	if(path.endsWith(".png")){
		return 'image/png'
	}
	return "null"
}
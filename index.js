const fs = require('fs');
const http = require('http');
var url = require('url');
const ws = require('ws');
const port = 8080;

function writeHeaders(response){
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	response.setHeader('Access-Control-Allow-Headers', '*');
}

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
		if(urlData.pathname == "/api/roomslist"){
			response.setHeader("Content-Type","application/javascript; charset=utf-8")
			package = {
				rooms:[]
			}
			for(var i = 0; i < Rooms.length; i++){
				var room = Rooms[i];
				package.rooms.push({
					name:room.name,
					peopleCount:room.clients.length,
					round:room.round,
					roomId:room.id
				})
			}
			response.write(JSON.stringify(package));
			response.properEnd()
			
		} else {
			var path = "./client"+urlData.pathname;
			if(path.endsWith("/")){
				path+="index.html"
			}
	
			
			var contentType = getContentTypeByPath(path)
			if(contentType != "null"){
				response.setHeader("Content-Type","contentType")
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
			
		}
		

		
	} else {
		response.write("fall back?")
		response.properEnd();
	}


	
}

var server = http.createServer(Request);
server.listen(port);
console.log("Server is running")
webSocketServer = ws.WebSocketServer({server})
var Rooms =[];
var Clients = [];



class Room {
	static #idCount = 0;
	id;
	name;
	host;
	clients;
	drawing;
	round;
	constructor(ws,name){
		this.id = Room.#idCount++;
		this.name = name;
		this.host = ws;
		this.clients = [ws];
		this.drawing = [];
		this.round = 0;
	}
	addClient(ws){
		clients.push(ws);
	}
}
class Client {
	static #idCount = 0;
	id;
	joinTime;
	room;
	ws;
	constructor(ws,room){
		this.id = Client.#idCount++;
		this.joinTime = Date.now();
		this.room = room;
		this.ws = ws;
		this.room.addClient(ws);
	}
}


function webSocketConnect(webSocket){
	webSocket.hasInit = false;
	webSocket.on('message', (data) => {
		var package;
		try {
			package = JSON.parse(data);
		} catch(error){
			return;
		}
		if(webSocket.hasInit){
			
		} else {
			if(webSocket.type == "init"){
				if(webSocket.joinMethod)
				var targetRoom;
				for(var i = 0;i<Rooms.length;i++){
					var room = Rooms[i];
					if(room.id == package.roomId){
						targetRoom = room;
					}
				}
				if(targetRoom == undefined){
					webSocket.send(JSON.stringify({
						type:"init",
						status:"fail",
						reason:"room not found"
					}))
				}
				
				var client = new Client(webSocket,);
				webSocket.send(JSON.stringify({
					type:"init",

				}))
				webSocket.hasInit = true;
			}
		}
	})
}



webSocketServer.on("connection",webSocketConnect)

async function loadServerList(){
	var serverList = document.getElementById("serverList");
	var rooms = (await (await fetch(window.location.origin + "/api/roomslist")).json()).rooms
	console.log(rooms)
	serverList.innerHTML = "";


	var out = "";
	for(var i = 0;i<rooms.length;i++){
		out += `
        <div class="serverbutton" onmousedown="joinServer(${rooms[i].roomId})">
			<div class="servername">${rooms[i].name}</div>
			<div class="playercount">${(rooms[i].playerCount<10)?"0":"" + rooms[i].playerCount}/10</div>
			<span class="preserveSpaces">  |  </span>
			<div class="round">${(rooms[i].round==0)?"Not Started":"On Round "+rooms[i].round}</div>
		</div>`
	}
	serverList.innerHTML = out
}

function joinServer(serverId){
	window.location.href = window.location.origin + "/room/index.html?roomId=" + btoa(serverId)
}
loadServerList()


function createServer(){
	var serverName = prompt("Enter The Name For The Server:")
	window.location.href = window.location.origin + "/room/index.html?serverName=" + btoa(serverName)
}
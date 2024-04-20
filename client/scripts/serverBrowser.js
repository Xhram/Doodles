async function loadServerList(){
	var serverList = document.getElementById("serverList");
	var rooms = await (await fetch(window.location.origin + "/api/roomslist")).json()
	console.log(rooms)
	
}
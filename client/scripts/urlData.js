function getRoomDetails(){
	var unparsedPrams = window.location.search.slice(1).split("&")
	var prams = {};
	for(var i = 0; i < unparsedPrams.length; i++){
		var equalsSignIndex = unparsedPrams[i].indexOf("=")
		var pramName = unparsedPrams[i].slice(0,equalsSignIndex);
		var pramValue = unparsedPrams[i].slice(equalsSignIndex+1);

		prams[pramName] = atob(pramValue);
	}
	console.log(prams)
	return prams;
}
function createJoinLink(roomId){
	history.replaceState(getRoomDetails(),"room",window.location.origin + window.location.pathname + "?jointype="+btoa("urlShare") + "&roomId="+ btoa(roomId))
}
//?jointype=cm9vbWNvZGU=&name=am9obiBwb3Jr
function getRoomDetails(){
	var unparsedPrams = window.location.search.split("?").split("&")
	var prams = {};
	for(var i = 0; i < unparsedPrams.length; i++)){
		var equalsSignIndex = unparsedPrams[i].indexOf("=")
		var pramName = unparsedPrams[i].slice(0,equalsSignIndex);
		var pramValue = unparsedPrams[i].slice(equalsSignIndex+1,unparsedPrams[i].length);

		prams[pramName] = pramValue;
	}
	console.log(prams)
	
}
/**
 * @var {boolean} connected
 * @var {WebSocket} ws
 */

var connected = false;
var ws;
/**
 * 
 * @param {string} url 
 * @returns 
 */
function connectWebsocket(url){
    if(connected){return}
    ws = new WebSocket(url);
    ws.onopen = (event) => {
        console.log("You Have Connected To The Server");
    }
    ws.onmessage = onWsMessage;
    connected = true;
}


function onWsMessage(rawMessageData){
    console.log(rawMessageData);

    let data = JSON.parse(rawMessageData.data);
    console.log(data);

}

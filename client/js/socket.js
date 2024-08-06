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
        connected = true;
        //send init package
        sendWsMessage({
            type:"init",
            avatar:user.avatar,
            username:user.username,
        })
    }
    ws.onmessage = onWsMessage;
}
function sendWsMessage(data){
    if(!connected){return}
    ws.send(JSON.stringify(data))
}

function onWsMessage(rawMessageData){
    console.log(rawMessageData);

    let data = JSON.parse(rawMessageData.data);
    console.log(data);

}

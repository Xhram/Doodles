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
    connected = true;
}

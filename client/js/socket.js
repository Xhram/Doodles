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
    if(data.type == "init"){
        user.id = data.id;
        playersList = data.users
        gameInitalized();
        addChatMessage("Welcome to doodles!!","*font-weight:700; color:peru;")
        writePlayerListHtml(playersList);
    }
    if(data.type == "message"){
        addChatMessageFromUser(data.message,data.author.username);
    }
    if(data.type == "player joinned"){
        playersList.push(data.player);
        writePlayerListHtml(playersList);
    }

}

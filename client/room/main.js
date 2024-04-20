const drawArea = document.getElementById("drawArea");
document.oncontextmenu = drawArea.oncontextmenu = function() {return false;}
//const ctx = drawArea.getContext("2d");

const socket = new SocketManager({
    batchIntervalTime: 100,
});
const pen = new Pen(drawArea);
const input = new InputManager({
    onMouseDown: (event) => {
        pen.press();
        pen.draw(event);
    },
    onMouseMove: (event) => {
        pen.draw(event);
    },
    onMouseUp: (event) => {
        pen.lift();
    },
    onMouseLeave: (event) => {
        pen.lift();
    }
});

input.listen(drawArea);


function clearChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function setPlayers(players = []) {
    const playersContainer = document.getElementById("players");
    clearChildren(playersContainer);
    for(let player of players) {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player');
        
        const nameElement = document.createElement('name');
        nameElement.textContent = player.name;
        playerDiv.appendChild(nameElement);
        
        const scoreElement = document.createElement('score');
        scoreElement.textContent = player.score;
        playerDiv.appendChild(scoreElement);
        
        playersContainer.appendChild(playerDiv);
    }
}
/*setPlayers([
    {name: "abrt",score:1000},
    {name: "jdeidhuiewhdfeu", score:10}
]);*/
function chat(element) {
    addChat(element.value, "You");
    element.value = "";

    //send socket data
    socket.batch({
        type: "chat",
        data: element.value
    });
}
function addChat(message = "", username = "#-no name-") {
    const chatsContainer = document.getElementById("chat");
    const msgElement = document.createElement('msg');
    
    const userElement = document.createElement('user');
    userElement.textContent = `${username}: `;
    msgElement.appendChild(userElement);
    
    const messageText = document.createTextNode(message);
    msgElement.appendChild(messageText);
    
    chatsContainer.appendChild(msgElement);
}
function setWordToGuess(word = "") {
    const wordToGuessElement = document.getElementById("wordToGuess")
    let blank
    for(let i = 0;i < word.length;i++){
        if(word[i] == " " || word[i] == "-") {
            blank += word[i];
        } else {
            blank += "_";
        }
    }
}
/*addChat("hello");
addChat("hudhuidhewiufh", "Bart")*/

socket.connect();
socket.onConnect(() => {
    socket.batch({
        type: "init",
    });
    console.log("Connected to server");
});
socket.onDisconnect(() => {
    console.log("Disconnected from server");
});
socket.onPackage((event) => {
    console.log(event);
},true);
setInterval(()=>{
    socket.batch({
        type: "actions",
        actions: pen.actions
    });
})
//socket.batch()
//receive => Id, 
//intial send => socket => Id, roomID, roomName, 
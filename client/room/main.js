let player = {
    name: prompt("Enter your name"),
    score: 0,
    id: null,
}

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
        console.log("left")
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
    socket.send({
        type: "chat",
        message: element.value,
    });
}
function addChat(message = "", username = "#-no name-") {
    const chatsContainer = document.getElementById("chat");
    const msgElement = document.createElement('msg');

    if(username != "#-game-"){
        const userElement = document.createElement('user');
        userElement.textContent = `${username}: `;
        msgElement.appendChild(userElement);
    }
    
    const messageText = document.createTextNode(message);
    msgElement.appendChild(messageText);
    
    chatsContainer.appendChild(msgElement);
}
function setWordToGuess(word = "",show = false) {
    const wordToGuessElement = document.getElementById("wordToGuess");
    if(show) {
        if(word != ""){wordToGuessElement.textContent = word;}
        return;
    }
    let blank = "";
    for(let i = 0;i < word.length;i++){
        if(word[i] == " " || word[i] == "-") {
            blank += word[i];
        } else {
            blank += "_";
        }
    }
    wordToGuessElement.textContent = blank;
}
/*addChat("hello");
addChat("hudhuidhewiufh", "Bart")*/

socket.connect();
socket.onConnect(() => {
    if(getRoomDetails().roomId != '0') {
        socket.send({
            type: "init",
            joinMethod: "joinRoom",
            roomId: getRoomDetails().roomId,
        });
    } else {
        socket.send({
            type: "init",
            joinMethod: "createRoom",
            name: player.name,
            roomName: prompt("Enter a room name"),
        });
    }
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
    switch(event.type) {
        case "chat": {
            if(event.wasCorrect) {
                let author = event.author == myName ? "You" : event.author;
                addChat(`${author} guessed correctly!`, "#-game-");
                break;
            }
            addChat(event.message, event.author);
            break;
        }
        case "init": {
            if(event.status == "success") {
                player.id = event.id;
                setPlayers([...event.otherPlayersData,player]);
                break;
            }
            if(event.status == "fail") {
                alert(event.reason);
                window.location.href = window.location.origin + "/";
                break;
            }
        }
    }
},true);
setInterval(()=>{
    //sent actions
    socket.batch({
        type: "actions",
        actions: pen.actions
    });
    pen.actions = [];
},1000)
//socket.batch()
//receive => Id, 
//intial send => socket => Id, roomID, roomName, 
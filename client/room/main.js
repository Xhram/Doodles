const drawArea = document.getElementById("drawArea");
document.oncontextmenu = drawArea.oncontextmenu = function() {return false;}
//const ctx = drawArea.getContext("2d");

const socket = new SocketManager();
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
socket.connect();
socket.onConnect(() => {
    console.log("Connected to server");
});
socket.onDisconnect(() => {
    console.log("Disconnected from server");
});
socket.onPackage((event) => {
    console.log(event);
},true);
//socket.batch()
//receive => Id, 
//intial send => socket => Id, roomID, roomName, 

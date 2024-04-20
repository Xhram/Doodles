const drawArea = document.getElementById("drawArea");
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
});

input.listen(drawArea);

class Pen {
    ctx;
    constructor(canvas){
        this.canvas = canvas;
        if(this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.ctx.imageSmoothingEnabled = false; //prevent anti-aliasing
        }
        this.position = {x:0,y:0};
        this.mode = "pen";
        this.radius = 5;
        this.color = "#000000";
        this.down = false;
        this.lastPosition = null;
        this.actions = [];
    }
    press() {
        this.down = true;
    }
    lift() {
        this.down = false;
        this.lastPosition = null;
    }
    draw(event){
        if(!this.down) return;
        const rectangle = this.canvas.getBoundingClientRect();
        const ratio = {
            x: rectangle.width / this.canvas.width,
            y: rectangle.height / this.canvas.height,
        };
        this.position = {
            x: ((input.userType === "touchScreen" ? 
                event.touches[0].clientX : 
                event.clientX) - rectangle.left) / ratio.x,
            y: ((input.userType === "touchScreen" ?
                 event.touches[0].clientY : 
                 event.clientY) - rectangle.top) / ratio.y,
        };
        switch(this.mode) {
            case "pen": {
                this.executeDraw();
                break;
            }
            case "fill": {
                this.floodFill(this.position.x,this.position.y);
                this.actions.push({
                    mode: "fill",
                    color: color,
                    position: this.position,
                });
                break;
            }
            case "erase": {
                this.executeDraw(this.canvas.style.background || "#ffffff");
                break;
            }
        }
    }
    executeDraw(color = this.color, x = this.position.x, y=this.position.y,px=this.lastPosition?.x || null,py=this.lastPosition?.y || null,radius=this.radius, server=true) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        this.ctx.closePath();
        this.ctx.fill();
        if(px && py) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y)
            this.ctx.lineTo(px, py);
            this.ctx.lineWidth = radius * 2;
            this.ctx.lineCap = "round"; //for rounded courners
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        }
        this.lastPosition = {x:x,y:y};
        if(server){
            this.actions.push({
                mode: "pen",
                color: color,
                radius: radius,
                position: this.position,
                lastPosition: this.lastPosition,
            });
        }
    }
    setColor(color) {
        this.color = color;
    }
    setMode(mode) {
        this.mode = mode;
    }
    setSize(size) {
        this.radius = size;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    floodFill(startX, startY, fillColor = this.color) {
        const startColor = this.getPixelColor(startX, startY);
        if (startColor === fillColor) {
            return; // Already filled with the desired color
        }

        const stack = [[startX, startY]];
        const visited = new Set();

        while (stack.length > 0) {
            const [x, y] = stack.pop();
            if (!this.isValidCoordinate(x, y) || visited.has(`${x},${y}`) || this.getPixelColor(x, y) !== startColor) {
                continue;
            }

            visited.add(`${x},${y}`);
            this.setPixelColor(x, y, fillColor);

            stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
        }
    }
    getPixelColor(x, y) {
        const imageData = this.ctx.getImageData(x, y, 1, 1);
        const data = imageData.data;
        return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    }

    setPixelColor(x, y, color) {
        const imageData = this.ctx.createImageData(1, 1);
        const data = imageData.data;
        const [r, g, b] = this.hexToRgb(color);
        data[0] = r;
        data[1] = g;
        data[2] = b;
        data[3] = 255;
        this.ctx.putImageData(imageData, x, y);
    }

    isValidCoordinate(x, y) {
        return x >= 0 && x < this.canvas.width && y >= 0 && y < this.canvas.height;
    }

    hexToRgb(hex) {
        hex = hex.replace('#', '');

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return [r, g, b, 1];
    }
    recreateActions(actions=[]) {
        for(let action of actions) {
            if(action.mode === "pen") {
                this.executeDraw(
                    action.color,
                    action.position.x,
                    action.position.y,
                    action.previousPosition.x,
                    action.previousPosition.y,
                    action.radius,
                    false
                );
            } else if(action.mode === "fill") {
                this.floodFill(
                    action.position.x,
                    action.position.y,
                    action.color,
                );
            }
        }
    }
}

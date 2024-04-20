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
                this.ctx.fillStyle = this.color;
                this.ctx.beginPath();
                this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, true);
                this.ctx.closePath();
                this.ctx.fill();
                if(this.lastPosition) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.position.x, this.position.y)
                    this.ctx.lineTo(this.lastPosition.x, this.lastPosition.y);
                    this.ctx.lineWidth = this.radius * 2;
                    this.ctx.lineCap = "round"; //for rounded courners
                    this.ctx.strokeStyle = this.color;
                    this.ctx.stroke();
                }
                this.lastPosition = {x:this.position.x,y:this.position.y};
                break;
            }
            case "fill": {
                this.floodFill(this.position.x,this.position.y)
                break;
            }
            case "erase": {
                
                break;
            }
        }
    }
    setColor(color) {
        this.color = color;
    }
    setMode(mode) {
        this.mode = mode;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    floodFill(x, y) {
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        let pixelStack = [{ x, y }];
        const targetColor = this.ctx.getImageData(x, y, 1, 1).data;

        let i = 0;
        while(pixelStack.length > 0) {
            i++;
            let pixel = pixelStack.pop();
            let pixelIndex = (pixel.y * this.canvas.width + pixel.x) * 4;
            let r = imageData.data[pixelIndex];
            let g = imageData.data[pixelIndex + 1];
            let b = imageData.data[pixelIndex + 2];
            if(
                pixel.x >= 0 && pixel.y >= 0 &&
                pixel.x < this.canvas.width && pixel.y < this.canvas.height &&
                isSameColor(r, g, b, targetColor[0], targetColor[1], targetColor[2])
            ) {
                console.log(pixel)
                //this.setPixel(imageData.data, pixel.x, pixel.y, this.color);
                this.ctx.fillStyle = this.color;
                this.ctx.fillRect(pixel.x, pixel.y, 1, 1);
                console.log(distance(x,y,pixel.x,pixel.y) < distance(x,y,pixel.x - 1, pixel.y))
                if(distance(x,y,pixel.x,pixel.y) < distance(x,y,pixel.x - 1, pixel.y)) pixelStack.push({ x: pixel.x - 1, y: pixel.y });
                if(distance(x,y,pixel.x,pixel.y) < distance(x,y,pixel.x + 1, pixel.y)) pixelStack.push({ x: pixel.x + 1, y: pixel.y });
                if(distance(x,y,pixel.x,pixel.y) < distance(x,y,pixel.x, pixel.y - 1)) pixelStack.push({ x: pixel.x, y: pixel.y - 1 });
                if(distance(x,y,pixel.x,pixel.y) < distance(x,y,pixel.x, pixel.y + 1)) pixelStack.push({ x: pixel.x, y: pixel.y + 1 });
            }
        }
    }
    setPixel(data, x, y, color) {
        let pixelIndex = (y * this.canvas.width + x) * 4;
        data[pixelIndex] = parseInt(color.substring(1, 3), 16);
        data[pixelIndex + 1] = parseInt(color.substring(3, 5), 16);
        data[pixelIndex + 2] = parseInt(color.substring(5, 7), 16);
    }
}
function distance(x1,y1,x2,y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
function isSameColor(r1, g1, b1, r2, g2, b2) {
    /*let r2 = parseInt(color.substring(1, 3), 16);
    let g2 = parseInt(color.substring(3, 5), 16);
    let b2 = parseInt(color.substring(5, 7), 16);*/
    return r1 === r2 && g1 === g2 && b1 === b2;
}
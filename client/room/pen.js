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
                this.ctx.beginPath();
                this.ctx.arc(this.position.x, this.position.y, 0, 2 * Math.PI, true);
                this.ctx.fill();
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
        
    }
}
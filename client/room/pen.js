class Pen {
    ctx;
    constructor(canvas){
        this.canvas = canvas;
        if(this.canvas) this.ctx = this.canvas.getContext('2d');
        this.position = {x:0,y:0};
        this.mode = "stroke";
        this.radius = 5;
        this.color = "#000000";
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
            x: 
        }
    }
}
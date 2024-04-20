class InputManager {
    inputType = "keyboard";
    listening = false;
    constructor(config = {}){
        this.userType = config?.userType || (/iPhone|iPad|iPod|Android|BlackBerry|Windows Phone/i.test(navigator.userAgent) ? "touchScreen" : (navigator.maxTouchPoints > 0 ? "touchScreen" : "keyboard"));
        this.mouse = {
            down: false,
            onMouseDown: config?.onMouseDown || function(){},
            onMouseMove: config?.onMouseMove || function(){},
            onMouseUp: config?.onMouseUp || function(){},
            onMouseLeave: config?.onMouseLeave || config?.onMouseUp || function(){},
        }
    }
    listen(bindedElement = document.body){
        this.listening = true;
        if(this.userType === "keyboard"){
            document.addEventListener("keydown", this.keyDown.bind(this));
            document.addEventListener("keyup", this.keyUp.bind(this));
            bindedElement.addEventListener("mousedown", this.mouse.onMouseDown);
            bindedElement.addEventListener("mousemove", this.mouse.onMouseMove);
            bindedElement.addEventListener("mouseup", this.mouse.onMouseUp);
            bindedElement.addEventListener("onmouseout", this.mouse.onMouseLeave);
        } else {
            bindedElement.addEventListener("touchstart", this.mouse.onMouseDown);
            bindedElement.addEventListener("touchmove", this.mouse.onMouseMove);
            bindedElement.addEventListener("touchend", this.mouse.onMouseUp);
            bindedElement.addEventListener("touchcancel", this.mouse.onMouseLeave);
        }
      }
      stop(){
        this.listening = false;
        if(this.userType === "keyboard"){
            document.removeEventListener("keydown",this.keyDown.bind(this));
            document.removeEventListener("keyup",this.keyUp.bind(this));
            document.body.removeEventListener("mousedown", this.mouse.onMouseDown);
            document.body.removeEventListener("mousemove", this.mouse.onMouseMove);
            document.body.removeEventListener("mouseup", this.mouse.onMouseUp);
        } else {
            document.body.removeEventListener("touchstart", this.mouse.onMouseDown);
            document.body.removeEventListener("touchmove", this.mouse.onMouseMove);
            document.body.removeEventListener("touchend", this.mouse.onMouseUp);
            document.body.removeEventListener("touchcancel", this.mouse.onMouseUp);
        }
      }
}


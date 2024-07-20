var l = console.log

var userAvatar = [5,2,6]

/**
 * 
 * @param {PointerEvent} event 
 */
function clickArrow(event){
    var target = event.target
    var direction = (target.classList.contains("left"))?-1:1;
    var property = parseInt(target.getAttribute("data-avatar-index"));
    userAvatar[property] += direction;
    updateAvatar()
}
var arrows = $(".arrow")
for (let i = 0; i < arrows.length; i++) {
    const arrow = arrows[i];
    arrow.addEventListener("click",clickArrow)
    
}
function randomAvatar(){
    userAvatar = [Math.floor(Math.random() * 27),Math.floor(Math.random() * 58),Math.floor(Math.random() * 52)]
    updateAvatar();
}

function updateAvatar(){
    if(userAvatar[0] == 26){
        userAvatar[0] = 0;
    }
    if(userAvatar[0] == -1){
        userAvatar[0] = 25;
    }
    $(".avatar-customizer .container .avatar .color")[0].style = `background-position: -${userAvatar[0]%10}00% -${Math.floor(userAvatar[0]/10)}00%`
    if(userAvatar[1] == 57){
        userAvatar[1] = 0;
    }
    if(userAvatar[1] == -1){
        userAvatar[1] = 56;
    }
    $(".avatar-customizer .container .avatar .eyes")[0].style = `background-position: -${userAvatar[1]%10}00% -${Math.floor(userAvatar[1]/10)}00%`

    if(userAvatar[2] == 51){
        userAvatar[2] = 0;
    }
    if(userAvatar[2] == -1){
        userAvatar[2] = 50;
    }
    $(".avatar-customizer .container .avatar .mouth")[0].style = `background-position: -${userAvatar[2]%10}00% -${Math.floor(userAvatar[2]/10)}00%`
}

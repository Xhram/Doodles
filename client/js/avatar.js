var l = console.log

if(localStorage.getItem("user.avatar") != undefined){
    user.avatar = localStorage.getItem("user.avatar").split(",")
    for (let i = 0; i < user.avatar.length; i++) {
        user.avatar[i] = parseInt(user.avatar[i]);
    }
    updateAvatar();
} else {
    randomAvatar()
}
/**
 * 
 * @param {PointerEvent} event 
 */
function clickArrow(event){
    var target = event.target
    var direction = (target.classList.contains("left"))?-1:1;
    var property = parseInt(target.getAttribute("data-avatar-index"));
    user.avatar[property] += direction;
    updateAvatar()
}
var arrows = $(".arrow")
for (let i = 0; i < arrows.length; i++) {
    const arrow = arrows[i];
    arrow.addEventListener("click",clickArrow)
    
}
function randomAvatar(){
    user.avatar = [Math.floor(Math.random() * 27),Math.floor(Math.random() * 58),Math.floor(Math.random() * 52)]
    updateAvatar();
}

function updateAvatar(){
    if(user.avatar[0] == 26){
        user.avatar[0] = 0;
    }
    if(user.avatar[0] == -1){
        user.avatar[0] = 25;
    }
    $(".avatar-customizer .container .avatar .color")[0].style = `background-position: -${user.avatar[0]%10}00% -${Math.floor(user.avatar[0]/10)}00%`
    if(user.avatar[1] == 57){
        user.avatar[1] = 0;
    }
    if(user.avatar[1] == -1){
        user.avatar[1] = 56;
    }
    $(".avatar-customizer .container .avatar .eyes")[0].style = `background-position: -${user.avatar[1]%10}00% -${Math.floor(user.avatar[1]/10)}00%`

    if(user.avatar[2] == 51){
        user.avatar[2] = 0;
    }
    if(user.avatar[2] == -1){
        user.avatar[2] = 50;
    }
    $(".avatar-customizer .container .avatar .mouth")[0].style = `background-position: -${user.avatar[2]%10}00% -${Math.floor(user.avatar[2]/10)}00%`

    localStorage.setItem("user.avatar",user.avatar.toString())
}

var username = ""
if(localStorage.getItem("username") != undefined){
    username = localStorage.getItem("username");
    $("#username")[0].value = username
}

function updateUsername(){
    username = $("#username")[0].value
    localStorage.setItem("username",username)
}
$("#username")[0].addEventListener("input",updateUsername)




async function createRoom(){
    $("#play-button")[0].classList.add("loading")
    
}

function joinGame(){
    l("join game")
    setRoomURL()
}

function connectToRoom(){
    $("#play-button")[0].classList.remove("loading")
}
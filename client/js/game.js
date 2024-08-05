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
    var response = await post({type:"create room"},"create-room")
    connectWebsocket(`${window.location.origin}/?${response.code}`)

}

function joinGame(){
    l("join game")
    setRoomURL()
    connectWebsocket(`${window.location.href}`)
}

function connectToRoom(){
    $("#play-button")[0].classList.remove("loading")
    
}
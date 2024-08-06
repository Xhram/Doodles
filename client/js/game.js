var playersList = []


function updateUsername(){
    user.username = $("#username")[0].value
    localStorage.setItem("user.username",user.username)
}
$("#username")[0].addEventListener("input",updateUsername)




async function createRoom(){
    $("#play-button")[0].classList.add("loading")
    var response = await post({type:"create room"},"create-room")
    user.roomCode = response.code;
    setRoomURL()
    connectWebsocket(`${window.location.origin}/?${response.code}`)

}

function joinGame(){
    l("join game")
    setRoomURL()
    connectWebsocket(`${window.location.href}`)
    setRoomURL()
}

function connectToRoom(){
    $("#play-button")[0].classList.remove("loading")
    
}
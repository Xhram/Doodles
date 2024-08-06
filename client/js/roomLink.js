function setRoomURL(){
    $("#game-link")[0].innerHTML = window.location.origin + "/?" + user.roomCode;
}

function copyLink(){
    navigator.clipboard.writeText(window.location.origin + "/?" + user.roomCode)
    $("#game-link")[0].innerHTML = "Copyed...";
    setTimeout(setRoomURL,250)
}
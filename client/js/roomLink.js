var roomCode = "TgRtHke"

function setRoomURL(){
    $("#game-link")[0].innerHTML = window.location.origin + "/?" + roomCode;
}

function copyLink(){
    navigator.clipboard.writeText(window.location.origin + "/?" + roomCode)
    $("#game-link")[0].innerHTML = "Copyed...";
    setTimeout(setRoomURL,250)
}
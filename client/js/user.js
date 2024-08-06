var user = {
    avatar:[0,0,0],
    username:"",
    id:"",
    roomCode:"",
}


if(localStorage.getItem("user.username") != undefined){
    user.username = localStorage.getItem("user.username");
    $("#username")[0].value = user.username
}
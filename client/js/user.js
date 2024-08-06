var user = {
    avatar:[0,0,0],
    username:"",
    id:"",
    roomCode:"",
}

if(localStorage.getItem("user.avatar") != undefined){
    user.avatar = localStorage.getItem("user.avatar").split(",")
    for (let i = 0; i < user.avatar.length; i++) {
        user.avatar[i] = parseInt(user.avatar[i]);
    }
    updateAvatar();
} else {
    randomAvatar()
}
if(localStorage.getItem("username") != undefined){
    user.username = localStorage.getItem("username");
    $("#username")[0].value = username
}
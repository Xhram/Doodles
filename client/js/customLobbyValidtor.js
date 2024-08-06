$("#play-button")[0].setAttribute("onClick","createRoom()")

if(window.location.search != ""){
    $("#play-button")[0].innerHTML = "Join Party";
    $("#play-button")[0].setAttribute("onClick","joinGame()")
    partyCodeValidationCheck()
}
async function partyCodeValidationCheck(){
    user.roomCode = window.location.search.slice(1);
    var response = await post({type:"party code validation check",code:window.location.search.slice(1)},"party-code-validation-check")
    console.log(response)
    if(response.valid == false){
        user.roomCode = "";
        $("#play-button")[0].innerHTML = "Create Room";
        $("#play-button")[0].setAttribute("onClick","createRoom()")
    }
}


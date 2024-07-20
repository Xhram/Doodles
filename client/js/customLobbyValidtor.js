

if(window.location.search != ""){
    $("#play-button")[0].innerHTML = "Join Party";
    partyCodeValidationCheck()
}
async function partyCodeValidationCheck(){

    var response = await post({type:"party code validation check",code:window.location.search.slice(1)},"party-code-validation-check")
    console.log(response)
    if(response.valid == false){
        $("#play-button")[0].innerHTML = "Create Room";
    }
}


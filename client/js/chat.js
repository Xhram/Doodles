function addChatMessage(message,options){
    $(".game-chat-messages").html($(".game-chat-messages").html() + `<div class="chat-message ${options!=""&&!options.startsWith("*")?options:""}" ${options.startsWith("*")?`style="${options.slice(1)}"`:""}>${message.replace(/</g,"").replace(/>/g,"")}</div>`)
}
function addChatMessageFromUser(message="undefined",username="undefined",optionsMessage="",optionsUsername=""){
    
    $(".game-chat-messages").html($(".game-chat-messages").html() + `<div class="chat-message ${optionsMessage!=""&&!optionsMessage.startsWith("*")?optionsMessage:""}" ${optionsMessage.startsWith("*")?`style="${optionsMessage.slice(1)}"`:""}><span class="chat-username ${optionsUsername!=""&&!optionsUsername.startsWith("*")?optionsUsername:""}" ${optionsUsername.startsWith("*")?`style="${optionsUsername.slice(1)}"`:""}>${username.replace(/</g,"").replace(/>/g,"")}: </span>${message.replace(/</g,"").replace(/>/g,"")}</div>`)
}

$(".game-chat-input input").on("keydown",(e)=>{
    if(e.key == "Enter"){
        addChatMessageFromUser($(".game-chat-input input").val(),user.username)
        sendWsMessage({
            type:"message",
            message:$(".game-chat-input input").val()
        })
        $(".game-chat-input input").val("")
    }
})
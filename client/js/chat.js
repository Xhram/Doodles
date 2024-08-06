function addChatMessage(message,type){
    $(".game-chat-messages").html($(".game-chat-messages").html() + `<div class="chat-message ${type!=""&&!type.startsWith("*")?type:""}" ${type.startsWith("*")?`style="${type.slice(1)}"`:""}>${message.replace(/</g,"").replace(/>/g,"")}</div>`)
}
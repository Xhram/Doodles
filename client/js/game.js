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

function gameInitalized(){
    $("#setup-page").hide();
    $("#game-container").show();
}

function writePlayerListHtml(users){
    var scoreRanks = [...users].sort((a,b)=>{return b.score-a.score}).map((s) => {return s.id})
    let playerListHtml = "";
    for(let i = 0;i < users.length;i++){
        let player = users[i];
        playerListHtml += `<div class="player-listing" id="player-listing-id-${player.id}">
                        <div class="player-info">
                            <div class="left-info">
                                <span class="rank">#${scoreRanks.indexOf(player.id)}</span>
                                <div class="drawing" alt="drawing" style="${player.isDrawing?"":"display:none;"}"></div>
                            </div>
                            <div class="right-info">
                                <span class="username">${player.username}</span>

                                <span class="points">${player.score} points</span>
                            </div>
                        </div>
                        <div class="avatar">
                            <div
                                class="color"
                                style="${`background-position: -${player.avatar[0]%10}00% -${Math.floor(player.avatar[0]/10)}00%`}"
                            ></div>
                            <div
                                class="eyes"
                                style="background-position: ${`background-position: -${player.avatar[1]%10}00% -${Math.floor(player.avatar[1]/10)}00%`}"
                            ></div>
                            <div
                                class="mouth"
                                style="background-position: ${`background-position: -${player.avatar[2]%10}00% -${Math.floor(player.avatar[2]/10)}00%`}"
                            ></div>
                            <div class="owner" style="${player.isHost?"":"display:none;"}"></div>
                        </div>
                    </div>`
    }
    $(".game-player-list").html(playerListHtml)
}
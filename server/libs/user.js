import WebSocket from 'ws';
import { GameServer } from './gameServer.js';



class User{
    /**
     * @property {string} id
     * @property {string} username
     * @property {number} score
     * @property {boolean} isDrawing
     * @property {boolean} isHost
     * @property {boolean} hasSolved
     * @property {number} joinTime
     * @property {WebSocket} ws
     * @property {GameServer} gameServer
     * @property {number[3]} cosmetics
     */
    id;
    username;
    score;
    isDrawing;
    isHost;
    hasSolved;
    joinTime;
    cosmetics;
    ws;
    gameServer;
    /**
     * 
     * @param {WebSocket} ws 
     * @param {GameServer} gameServer 
     */
    constructor(ws,gameServer){
        this.joinTime = Date.now()
        this.id = Math.floor(Date.now() * (Math.random() * 5)).toString(36)+Date.now().toString(36);
        this.score = 0;
        this.isDrawing = false;
        this.isHost = false;
        this.ws = ws;
        this.gameServer = gameServer;
        this.cosmetics = [0,0,0];
        this.username = "";
        this.hasSolved = false;
        if(this.gameServer.users.length == 0){
            this.isHost = true;
        }//switch to client side inshation of init package
        ws.user = this
        ws.onmessage = (...args) => {
            console.log(ws.user)
            ws.user.onMessage.apply(ws.user,args);
        };

    }
    sendToUser(data){
        this.ws.send(JSON.stringify(data))
    }
    getUserData(){
        return {
            id:this.id,
            name:this.username,
            score:this.score,
            cosmetics:this.cosmetics,
            isHost:this.isHost,
            isDrawing:this.isDrawing,
            
        }
    }
    /**
     * 
     * @param {WebSocket.MessageEvent} message 
     */
    onMessage(message){
        var data;
        try {
            data = JSON.parse(message.data);

            if(data.type == "init"){
                this.username = data.username
                this.cosmetics = data.avatar
                this.sendToUser({
                    type:"init",
                    roomCode:this.gameServer.code,
                    id:this.id,
                    users: this.gameServer.users.map((user) => {
                        return user.getUserData()
                    })
                })
            }
            if(data.type == "message"){
                this.gameServer.users.forEach((user) => {
                    if(!(user.hasSolved == false && this.hasSolved == true) && this.id != user.id){
                        user.sendToUser({
                            type:"message",
                            author:{
                                username:this.username,
                                id:this.id,
                                hasSolved:this.hasSolved
                            },
                            message:data.message.replace(/</g,"").replace(/>/g,"")
                        })
                    }
                })
            }
        } catch (error){
            console.log(error)
        }
    }
}

export {User};
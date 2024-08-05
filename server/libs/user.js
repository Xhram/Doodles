import WebSocket from 'ws';
import { GameServer } from './gameServer.js';



class User{
    /**
     * @property {string} id
     * @property {string} name
     * @property {number} score
     * @property {boolean} isDrawing
     * @property {boolean} isHost
     * @property {number} joinTime
     * @property {WebSocket} ws
     * @property {GameServer} gameServer
     * @property {number[3]} cosmetics
     */
    id;
    name;
    score;
    isDrawing;
    isHost;
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
        if(this.gameServer.users.length == 0){
            this.isHost = true;
        }
    }
    getUserData(){
        return {
            id:this.id,
            name:this.name,
            score:this.score,
            cosmetics:this.cosmetics,
            isHost:this.isHost,
            isDrawing:this.isDrawing,
            
        }
    }
}

export {User};
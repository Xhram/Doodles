import { DoodleServer } from "../server.js";
import {generateUrlSafeString} from "../utils/randomStringGen.js"
import WebSocket from 'ws';
import { User } from "./user.js";



class GameServer{
    /**
     * @property {string} code
     * @property {DoodleServer} doodleServer
     * @property {User[]} users
     */
    code;
    doodleServer;
    users;
    /**
     * 
     * @param {DoodleServer} doodleServer 
     */
    constructor(doodleServer){
        this.doodleServer = doodleServer;
        this.generateCode();
        this.users = [];
    }
    generateCode(){
        this.code = generateUrlSafeString(7)
        codeSearch: while(true){
            /**
             * @var {boolean} isCodeUnique
             */
            let isCodeUnique = true;
            for(var i = 0;i < this.doodleServer.gameServers.length;i++){
                if(this.code == this.doodleServer.gameServers[i].code){
                    isCodeUnique = false;
                }
            }
            if(isCodeUnique == true){
                break codeSearch;
            }

            this.code = generateUrlSafeString(7)

        }
        
        
    }
    /**
     * 
     * @param {WebSocket} ws 
     */
    userConnect(ws){
        let newUser = new User(ws,this)
        this.users.push(newUser)
        console.log(this)
    }

    


}


export {GameServer}
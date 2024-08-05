import { DoodleServer } from "../server.js";
import {generateUrlSafeString} from "../utils/randomStringGen.js"


class GameServer{
    /**
     * @property {string} code
     * @property {DoodleServer} doodleServer
     */
    code;
    doodleServer;
    /**
     * 
     * @param {DoodleServer} doodleServer 
     */
    constructor(doodleServer){
        this.doodleServer = doodleServer;
        generateCode();
    }
    generateCode(){
        this.code = generateUrlSafeString(7)
        codeSearch: while(true){
            /**
             * @let {boolean} isCodeUnique
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


}


export {GameServer}
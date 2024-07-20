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
        this.code = generateUrlSafeString(7)
        this.doodleServer = doodleServer;
    }


}


export {GameServer}
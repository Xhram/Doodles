import {generateUrlSafeString} from "../utils/randomStringGen.js"


class GameServer{
    code;
    constructor(){
        this.code = generateUrlSafeString(7)
    }


}


export {GameServer}
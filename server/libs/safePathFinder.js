import * as fs from "node:fs"


class SafePathFinder{
    safePaths;
    constructor(domainFolder){
        this.safePaths = [];
        this.recursiveFindeFunc(domainFolder)
        for (let i = 0; i < this.safePaths.length; i++) {
            this.safePaths[i] = this.safePaths[i].slice(domainFolder.length)
            
        }
        
    }
    /**
     * 
     * @param {string} path 
     */
    isPathSafe(path){
        for (let i = 0; i < this.safePaths.length; i++) {
            if(path.startsWith(this.safePaths[i])){
                return true;
            }
        }
        return false;
    }
    getSafePath(path){
        for (let i = 0; i < this.safePaths.length; i++) {
            if(path.startsWith(this.safePaths[i])){
                return this.safePaths[i];
            }
        }
    }

    /**
     * 
     * @param {string} path 
     */
    recursiveFindeFunc(path){
        var subPaths = fs.readdirSync(path)
        for (let i = 0; i < subPaths.length; i++) {
            const subPath = subPaths[i];
            const stats = fs.statSync(path + "/" + subPath);
            if(stats.isFile()){
                this.safePaths.push(path + "/" + subPath)
            }
            if(stats.isDirectory()){
                this.recursiveFindeFunc(path + "/" + subPath)
            }
        }

    }
}
export {SafePathFinder}
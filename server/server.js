import * as fs from "node:fs";

import * as http from "node:http";

import * as url from "node:url";

import { SafePathFinder } from "./libs/safePathFinder.js";

import { convertFileEndingToContentTypes } from "./utils/fileEnding2contentTypes.js";

import { l } from "./utils/fastLog.js";

import { GameServer } from "./libs/gameServer.js";

import WebSocket, { WebSocketServer } from 'ws';
//MIGHT CHANGE
import generalConfig from "./configs/generalConfig.json" with { type: "json" };
import path from "node:path";
//IF STOP WORKING
/*
var generalConfig = JSON.parse(fs.readfileSync("./configs/generalConfig.json",{encoding:"utf8"}))

*/

class DoodleServer {
    /**
     * @property {DoodleServer} instance
     * @property {numbers} port
     * @property {http.Server} httpServer
     * @property {SafePathFinder} safePathFinder
     * @property {GameServer[]} gameServers
     * @property {WebSocketServer} wss
     */
    static instance = undefined;
    port;
    httpServer;
    safePathFinder;
    wss;
    gameServers;

    constructor(options) {
        if (DoodleServer.instance != undefined) {
            return DoodleServer.instance;
        }
        options = options == undefined ? {} : options;
        this.port = options.port;
        this.gameServers = [];
        this.gameServers.push(new GameServer(this));
        l(this.gameServers[0].code);

        this.safePathFinder = new SafePathFinder(generalConfig.clientFilesPath);
        l(this.safePathFinder.safePaths);

        this.httpServer = http.createServer();

        this.httpServer.addListener("request", this.request);
        this.httpServer.listen(this.port);
        console.log("Connect Localy At:");
        console.log(
            "http://localhost" + (this.port != undefined ? ":" + this.port : "")
        );
        this.wss = new WebSocketServer({server:this.httpServer})
        this.wss.on("connection",this.onWebsocketConnection);

        DoodleServer.instance = this;
    }
    /**
     * 
     * @param {WebSocket} ws 
     * @param {http.IncomingMessage} request
     */
    onWebsocketConnection(ws,request){
        /**
         * @var {DoodleServer} doodleServer
         * @var {string} code
         */
        var doodleServer = DoodleServer.instance;

        var code = url.parse(request.url).query;
        if(code == undefined){
            ws.close(400,"code is needed")
        }
        for (let i = 0; i < doodleServer.gameServers.length; i++) {
            /**
             * @var {GameServer} gameServer
            */
            var gameServer = doodleServer.gameServers[i];
            if(gameServer.code == code){
                gameServer.userConnect(ws);
                return;
            }
        }
        ws.close(404,"game server with provided code was not found")
        
    }


    /**
     *
     * @param {http.ServerResponse} httpResponse
     */
    writeHeaders(httpResponse) {
        httpResponse.setHeader("Access-Control-Allow-Origin", "*");
        httpResponse.setHeader("Access-Control-Request-Method", "*");
        httpResponse.setHeader(
            "Access-Control-Allow-Methods",
            "OPTIONS, GET, POST"
        );
        httpResponse.setHeader("Access-Control-Allow-Headers", "*");
    }
    /**
     *
     * @param {http.IncomingMessage} httpRequest
     * @param {http.ServerResponse} httpResponse
     */
    request(httpRequest, httpResponse) {
        var doodleServer = DoodleServer.instance;

        httpResponse.hasEnded = false;
        httpResponse.properEnd = (...args) => {
            if (httpResponse.hasEnded == false) {
                httpResponse.end(...args);
                httpResponse.hasEnded = true;
            }
        };
        httpResponse.writeJSON = (...args) => {
            l(args)
            for (let index = 0; index < args.length; index++) {
                httpResponse.write(JSON.stringify(args[index]));
            }
        };

        doodleServer.writeHeaders(httpResponse);

        if (httpRequest.method == "GET") {
            var pathname = url.parse(httpRequest.url).pathname;
            if (pathname.endsWith("/")) {
                pathname += "index.html";
            }

            if (!doodleServer.safePathFinder.isPathSafe(pathname)) {
                if (!pathname.endsWith("jquery")) {
                    pathname = generalConfig.clientFilesPath + "/404.html";
                    httpResponse.statusCode = 404;
                } else {
                    httpResponse.statusCode = 200;
                    pathname = "./node_modules/jquery/dist/jquery.min.js";
                }
            } else {
                httpResponse.statusCode = 200;
                pathname = generalConfig.clientFilesPath + "/" + pathname;
            }
            httpResponse.setHeader(
                "Content-Type",
                convertFileEndingToContentTypes(pathname.split(".").at(-1))
            );
            httpResponse.write(fs.readFileSync(pathname));
            httpResponse.properEnd();
        }
        if (httpRequest.method == "POST") {
            let body = "";
            let ReciveData = (chunk) => {
                body += chunk.toString();
            };
            httpRequest.on("data", ReciveData);

            let EndDataReviving = () => {
                try {
                    doodleServer.handleApiCall(JSON.parse(body), httpResponse);
                } catch (error) {
                    console.error(error);
                    httpResponse.statusCode = 400;
                    httpResponse.write(
                        "\n<br><h1>Server Has Had an Internal Error While Processing Your Request</h1><br><h1>Error Code:400</h1>"
                    );
                    httpResponse.properEnd();
                }
                if (httpResponse.hasEnded) {
                    return;
                }
            };
            httpRequest.on("end", EndDataReviving);
        }
    }

    /**
     *
     * @param {Object} package
     * @param {http.ServerResponse} httpResponse
     */
    handleApiCall(data, httpResponse) {
        var doodleServer = DoodleServer.instance;
        if (data.type == "party code validation check") {
            httpResponse.writeJSON({
                type: "party code validation check",
                valid:doodleServer.partyCodeValidationCheck(data.code)
            });
            httpResponse.properEnd();
        }
        if (data.type == "create room"){
            httpResponse.writeJSON({
                type: "connect code",
                code:doodleServer.createRoom()
            });
            httpResponse.properEnd();
        }
    }
    /**
     * 
     * @param {string} code 
     * @returns {boolean}
     */
    partyCodeValidationCheck(code) {
        var doodleServer = DoodleServer.instance;

        for (let i = 0; i < doodleServer.gameServers.length; i++) {
            var gameServer = doodleServer.gameServers[i];
            if (gameServer.code == code) {
                return true;
            }
        }
        return false;
    }
    /**
     * 
     * @returns {string}
     */
    createRoom(){
        var doodleServer = DoodleServer.instance;
        let newServer = new GameServer(doodleServer)
        doodleServer.gameServers.push(newServer)
        return newServer.code;
    }
}

export { DoodleServer };

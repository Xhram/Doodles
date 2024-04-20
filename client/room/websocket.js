class SocketManager {
  constructor(data){
    this.socket = null;
    this.connectedToServer = false;
    this.socketURL = "";
    this.socketID = -1;
    this.sendBatch = [];
    this.batchIntervalTime = data?.batchIntervalTime || 16;
    this.batchInterval = null;
    this.packageHandler = function(event){console.log(`Package Received: ${event}`);}
    this.onConnectionEstablished = function(event){console.log(`Connection Established: ${event}`);}
    this.onConnectionClose = function(event){console.log(`Connection Close: ${event}`);}
    this.timeSynced = false;
    this.syncTimeOffset = data?.syncTimeOffset || 0;//how far ahead or behind the server is from the client
    this.timeOrigin = performance.timeOrigin;
    this.serverTimeOrigin = 0;
  }
  connect(url){
    const socketUrl = url || window.location.href.replace(/^http/, 'ws');
    this.socket = new WebSocket(socketUrl);
    if(!this.socket){return;}

    this.socket.addEventListener('open', (event) => {
      this.onConnectionEstablished(event);
      this.connectedToServer = true;
      this.batchSendInterval();
    });

    this.socket.addEventListener('message', (event) => {
      this.packageHandler(event);
    });

    this.socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
      this.socket = null;
      this.connectedToServer = false;
      this.onConnectionClose(event);
    });
  }
  onConnect(callback){
    this.onConnectionEstablished = callback;
  }
  onDisconnect(callback){
    this.onConnectionClose = callback;
  }
  disconnect(){
    this.socket.close(1000, 'Connection closed by client');
  }
  onPackage(func,parseData){
    this.packageHandler = function(event){
      if(parseData){
        func(JSON.parse(event.data),event.timeStamp)
      } else {
        func(event,event.timeStamp);
      }
    };
  }
  send(data){
    if (this.socket == undefined) { return; }
    this.socket.send(JSON.stringify(data));
  }
  batch(data = {}){
    data.sender = {
      sent: this.getServerTime(),
    };
    this.sendBatch.push(
      data
    );
  }
  batchSendInterval(){
    this.batchInterval = setInterval(function(){
      if(this.sendBatch.length > 0 && this.connectedToServer){
        this.send(this.sendBatch);
        this.sendBatch.splice(0,this.sendBatch.length);
      }
    }.bind(this),this.batchIntervalTime);
  }
  stopBatchSendInterval(){
    clearInterval(this.batchInterval);
  }
  setSyncTimeOffset(serverTimeOrigin){
    this.serverTimeOrigin = serverTimeOrigin;
    this.syncTimeOffset = this.timeOrigin - serverTimeOrigin;
    this.timeSynced = true;
    return this.syncTimeOffset;
  }
  getLatency(packageTimeStamp){
    if(!this.timeSynced || !packageTimeStamp) return 0;
    //console.log(performance.now(), packageTimeStamp)
    return this.getServerTime() - packageTimeStamp;
  }
  getServerTime(){
    if(!this.timeSynced) return 0;
    return performance.now() + this.syncTimeOffset;
  }
}
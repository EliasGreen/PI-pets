class SocketList {
  getUserIDBySocket(socketList, socket) {
      return Object.keys(socketList).find(key => socketList[key] === socket);
  }
  
  constructor() {
    this.socketList = {};
  }

  getList() {
    return this.socketList;
  }
  
  getSocketsCount() {
    return Object.keys(this.socketList).length;
  }
  
  setList(socketList) {
    this.socketList = socketList;
  }
  
  addNewSocket(userID, socket) {
    this.socketList[userID] = socket;
  }
  
  deleteSocket(socket) {
    const userID = this.getUserIDBySocket(this.socketList, socket);
    delete this.socketList[userID];
  }
  
  getSocket(userID) {
    return this.socketList[userID];
  }
}

let listOfUsersSockets = new SocketList();

module.exports = listOfUsersSockets;
interface ISocketAdminData {
  socketId: string,
  uuid: string,
}

interface ISocketMap {
  sockets: Set<string>,
  games: Set<string>,
  adminSocket?: ISocketAdminData,
}

const userSocketIdMap = new Map<string, ISocketMap>(); //a map of online usernames and their clients

export const addUserToMap = (userName: string, socketId: string, gameId: string): void => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    //user had already joined from one client and now joining using another client
    user.sockets.add(socketId);
    user.games.add(gameId);
  } else {
    //when user is joining first time
    userSocketIdMap.set(userName, { sockets: new Set([socketId]), games: new Set([gameId])});
  }
  // console.log(userSocketIdMap);
};

export const removeUserFromMap = (userName: string, socketId: string, gameId: string): void => {
  if (userSocketIdMap.has(userName)) {
    const userSocketIdSet = userSocketIdMap.get(userName);
    if (userSocketIdSet) {
      userSocketIdSet.sockets.delete(socketId);
      userSocketIdSet.games.delete(gameId);
      userSocketIdSet.adminSocket = undefined;

      //if there are no clients for a user, remove that user from online list (map)
      if (userSocketIdSet.sockets.size === 0) {
        userSocketIdMap.delete(userName);
      }
    }
  }
  // console.log(userSocketIdMap);
};

export const getUserNameFromMapBySocket = (socketId: string): string | null => {
  let name = null;
  userSocketIdMap.forEach(function(value, key) {
    // console.log(value);
    const sockets = Array.from(value.sockets);
    if (sockets.some(socket => socket === socketId)) {
      name = key;
    }
  });
  return name;
};

export const getUserSocketsFromMap = (userName: string): Set<string> | undefined => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    return user.sockets;
  }
};

export const getUserGamesFromMap = (userName: string): Set<string> | undefined => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    return user.games;
  }
};

export const isUserConnected = (userName: string): boolean => {
  return userSocketIdMap.has(userName);
};

export const setUserAsAdmin = (userName: string, socketId: string, uuid: string) => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    user.adminSocket = { socketId: socketId, uuid: uuid } as ISocketAdminData;
  } else {
    userSocketIdMap.set(userName, {
      sockets: new Set([socketId]),
      games: new Set(),
      adminSocket: { socketId: socketId, uuid: uuid } as ISocketAdminData,
    });
  }
};

export const unsetUserAsAdmin = (userName: string) => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    user.adminSocket = undefined;
  }
};

export const isUserAdmin = (userName: string, socketId: string, uuid: string): boolean => {
  const user = userSocketIdMap.get(userName);
  if (user && user.adminSocket) {
    return user.adminSocket.socketId === socketId && user.adminSocket.uuid === uuid;
  }
  return false;
};

// export default userSocketIdMap;

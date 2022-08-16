interface ISocketMap {
  sockets: Set<string>,
  games: Set<string>,
}

const userSocketIdMap = new Map<string, ISocketMap>(); //a map of online usernames and their clients

export const addUserToMap = (userName: string, socketId: string, gameId: string): void => {
  if (!userSocketIdMap.has(userName)) {
    //when user is joining first time
    userSocketIdMap.set(userName, { sockets: new Set([socketId]), games: new Set([gameId])});
  } else {
    //user had already joined from one client and now joining using another client
    userSocketIdMap.get(userName)?.sockets.add(socketId);
    userSocketIdMap.get(userName)?.games.add(gameId);
  }
  console.log(userSocketIdMap);
};

export const removeUserFromMap = (userName: string, socketId: string, gameId: string): void => {
  if (userSocketIdMap.has(userName)) {
    const userSocketIdSet = userSocketIdMap.get(userName);
    if (userSocketIdSet) {
      userSocketIdSet.sockets.delete(socketId);
      userSocketIdSet.games.delete(gameId);

      //if there are no clients for a user, remove that user from online list (map)
      if (userSocketIdSet.sockets.size === 0) {
        userSocketIdMap.delete(userName);
      }
    }
  }
  console.log(userSocketIdMap);
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
  if (userSocketIdMap.has(userName)) {
    return userSocketIdMap.get(userName)?.sockets;
  }
};

export const getUserGamesFromMap = (userName: string): Set<string> | undefined => {
  if (userSocketIdMap.has(userName)) {
    return userSocketIdMap.get(userName)?.games;
  }
};

export const isUserConnected = (userName: string): boolean => {
  return userSocketIdMap.has(userName);
};

// export default userSocketIdMap;

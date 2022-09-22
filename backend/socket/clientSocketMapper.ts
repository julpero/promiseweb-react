interface ISocketAdminData {
  socketId: string,
  uuid: string,
}

interface ISocketMap {
  sockets: Set<string>,
  game?: string,
  adminSocket?: ISocketAdminData,
  lastTimestamp: number,
}

const userSocketIdMap = new Map<string, ISocketMap>(); //a map of online usernames and their clients

export const addUserToMap = (userName: string, socketId: string, timestamp: number, gameId?: string | null): void => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    //user had already joined from one client and now joining using another client
    if (!user.sockets.has(socketId)) user.sockets.add(socketId);
    user.game = gameId ?? undefined;
    user.lastTimestamp = timestamp;
  } else {
    //when user is joining first time
    userSocketIdMap.set(userName, {
      sockets: new Set([socketId]),
      game: gameId ?? undefined,
      lastTimestamp: timestamp,
    });
  }
  // console.log(userSocketIdMap);
};

// export const removeUserFromMap = (userName: string, socketId: string, gameId?: string | null): void => {
//   const userSocketIdSet = userSocketIdMap.get(userName);
//   if (userSocketIdSet) {
//     userSocketIdSet.sockets.delete(socketId);
//     if (gameId === null) {
//       userSocketIdSet.game = undefined;
//     } else if (gameId !== undefined) {
//       userSocketIdSet.game = gameId;
//     }
//     userSocketIdSet.adminSocket = undefined;

//     //if there are no clients for a user, remove that user from online list (map)
//     if (userSocketIdSet.sockets.size === 0) {
//       userSocketIdMap.delete(userName);
//     }
//   }
// };

export const removeUserSocketsAndGames = (userName: string) => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    user.game = undefined;
    user.sockets = new Set([]);
  }
};

export const removeUserFromGame = (userName: string, gameId: string): void => {
  const user = userSocketIdMap.get(userName);
  if (user && user.game === gameId) {
    user.game = undefined;
  }
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

export const getUserGameFromMap = (userName: string): string | undefined => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    return user.game;
  }
};

export const isUserConnected = (userName: string): boolean => {
  return userSocketIdMap.has(userName);
};

export const setUserAsAdmin = (userName: string, socketId: string, uuid: string, timestamp: number) => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    user.adminSocket = { socketId: socketId, uuid: uuid } as ISocketAdminData;
    user.lastTimestamp = timestamp;
  } else {
    userSocketIdMap.set(userName, {
      sockets: new Set([socketId]),
      game: undefined,
      adminSocket: { socketId: socketId, uuid: uuid } as ISocketAdminData,
      lastTimestamp: timestamp,
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

export const setLastTimestamp = (userName: string, socketId: string, timestamp: number) => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    user.lastTimestamp = timestamp;
  } else {
    userSocketIdMap.set(userName, {
      sockets: new Set([socketId]),
      game: undefined,
      adminSocket: undefined,
      lastTimestamp: timestamp,
    });
  }
};

export const getLastTimestamp = (userName: string): number | null => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    return user.lastTimestamp;
  }
  return null;
};

export const getPlayersOfTheGame = (gameId: string): string[] => {
  const players: string[] = [];
  userSocketIdMap.forEach((val, key) => {
    if (val.game === gameId) players.push(key);
  });
  return players;
};

// export default userSocketIdMap;

import { IuiObserver } from "../../frontend/src/interfaces/IuiPlayingGame";

interface ISocketAdminData {
  socketId: string,
  uuid: string,
}

interface ISocketWaitingToJoin {
  socketId: string,
  gameId: string,
  asAPlayer: string,
}

interface ISocketObserving {
  socketId: string,
  gameId: string,
  isWaiting: boolean,
}

interface ISocketMap {
  sockets: Set<string>,
  game?: string,
  adminSocket?: ISocketAdminData,
  lastTimestamp: number,
  waitingToJoin?: ISocketWaitingToJoin,
  observing?: ISocketObserving,
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

export const removeUserSocketsAndGames = (userName: string) => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    user.game = undefined;
    user.sockets = new Set([]);
  }
};

export const addUserToGame = (userName: string, socketId: string, gameId: string): void => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    if (!user.sockets.has(socketId)) user.sockets.add(socketId);
    user.game = gameId;
  }
};

export const removeUserFromGame = (userName: string, gameId: string): void => {
  const user = userSocketIdMap.get(userName);
  if (user && user.game === gameId) {
    user.game = undefined;
  }
  const players = getPlayersOfTheGame(gameId);
  if (players.length === 0) {
    userSocketIdMap.forEach(user => {
      if (user.observing?.gameId === gameId) user.observing = undefined;
      if (user.waitingToJoin?.gameId === gameId) user.waitingToJoin = undefined;
    });
  }
};

export const getUserNameFromMapBySocket = (socketId: string): string | null => {
  let name = null;
  userSocketIdMap.forEach((value, key) => {
    // console.log(value);
    const sockets = Array.from(value.sockets);
    if (sockets.some(socket => socket === socketId)) {
      name = key;
    }
  });
  console.log(`getUserNameFromMapBySocket - mapped socket ${socketId} to ${name}`);
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
    if (!user.sockets.has(socketId)) user.sockets.add(socketId);
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

export const setWaiting = (userName: string, timestamp: number, socketId: string, asAPlayer: string, gameId: string) =>  {
  const user = userSocketIdMap.get(userName);
  if (user) {
    user.waitingToJoin = {
      socketId: socketId,
      asAPlayer: asAPlayer,
      gameId: gameId,
    } as ISocketWaitingToJoin;
    if (!user.sockets.has(socketId)) user.sockets.add(socketId);
  } else {
    userSocketIdMap.set(userName, {
      sockets: new Set([socketId]),
      game: undefined,
      adminSocket: undefined,
      lastTimestamp: timestamp,
      waitingToJoin: {
        socketId: socketId,
        asAPlayer: asAPlayer,
        gameId: gameId,
      } as ISocketWaitingToJoin,
    });
  }
};

export const isWaitingGame = (userName: string, socketId: string, asAPlayer: string, gameId: string): boolean => {
  const user = userSocketIdMap.get(userName);
  if (user && user.waitingToJoin) {
    return user.waitingToJoin.socketId === socketId && user.waitingToJoin.asAPlayer === asAPlayer && user.waitingToJoin.gameId === gameId;
  }
  return false;
};

export const getWaitingGame = (userName: string) => {
  const user = userSocketIdMap.get(userName);
  if (user && user.waitingToJoin) {
    return user.waitingToJoin.gameId;
  }
  return null;
};

export const clearWaiting = (userName: string) => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    user.waitingToJoin = undefined;
  }
};

export const setObserving = (userName: string, timestamp: number, socketId: string, gameId: string, waiting: boolean): void => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    user.observing = {
      socketId: socketId,
      gameId: gameId,
      isWaiting: waiting,
    } as ISocketObserving;
  } else {
    userSocketIdMap.set(userName, {
      sockets: new Set([socketId]),
      game: undefined,
      adminSocket: undefined,
      lastTimestamp: timestamp,
      observing: {
        socketId: socketId,
        gameId: gameId,
        isWaiting: waiting,
      } as ISocketObserving,
    });
  }
};

export const clearObserving = (userName: string): void => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    user.observing = undefined;
  }
};

export const getGameObserversForUi = (gameId: string): IuiObserver[] => {
  const obsArr: IuiObserver[] = [];
  getGameObservers(gameId).forEach((val, key) => {
    obsArr.push({
      name: key,
      waiting: val.isWaiting,
    } as IuiObserver);
  });
  return obsArr;
};

export const getGameObservers = (gameId: string): Map<string, ISocketObserving> => {
  const observers = new Map<string, ISocketObserving>();
  userSocketIdMap.forEach((val, key) => {
    if (val.observing?.gameId === gameId) {
      observers.set(key, val.observing);
    }
  });
  return observers;
};

export const getObservingGame = (userName: string): ISocketObserving | null => {
  const user = userSocketIdMap.get(userName);
  if (user) {
    return user.observing ?? null;
  }
  return null;
};

export const userIsCurrentlyObserving = (userName: string, gameId?: string): boolean => {
  const user = userSocketIdMap.get(userName);
  if (user && user.observing?.isWaiting === false) {
    if (gameId) {
      return user.observing.gameId === gameId && !getPlayersOfTheGame(gameId).some(player => player === userName);
    } else {
      return true;
    }
  }
  return false;
};

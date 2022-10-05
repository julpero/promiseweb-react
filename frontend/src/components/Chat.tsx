import React, { createRef, CSSProperties, useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
import { colorize, increase_brightness } from "../common/commonFunctions";
import { CHAT_TYPE, IuiChatNotification } from "../interfaces/IuiChat";
import { useSocket } from "../socket";

/**
 * Chat and log
 */
const Chat = () => {
  const [chatObjects, setChatObjects] = useState<IuiChatNotification[]>([]);

  const { socket } = useSocket();
  const divChatRef = createRef<HTMLDivElement>();

  useEffect(() => {
    socket.on("new chat line", (chatObj: IuiChatNotification) => {
      // console.log("new chat line", chatLine);
      setChatObjects((prevState) => ([...prevState, chatObj]));
    });

    return () => {
      socket.off("new chat line");
    };
  }, [socket]);

  useEffect(() => {
    const scrollHeight = divChatRef.current?.scrollHeight ?? 1;
    if (divChatRef.current) {
      divChatRef.current.scrollTop = scrollHeight;
    }
  }, [divChatRef]);

  const highlightPlayer = (chatLine: string, playerName: string | undefined) => {
    if (!playerName) return chatLine;
    const playerNameS = chatLine.indexOf(playerName);
    if (playerNameS < 0) return chatLine;
    const playerNameE = playerNameS + playerName.length;
    const firstStr = chatLine.substring(0, playerNameS);
    const secondStr = chatLine.substring(playerNameE+1);
    const bgColor = window.getComputedStyle(document.body, null).getPropertyValue("background-color");
    return (
      <React.Fragment>
        {firstStr} <span style={{"backgroundImage": `linear-gradient(90deg, ${increase_brightness(colorize(playerName), 50)}, ${bgColor})`}}>{playerName}</span> {secondStr}
      </React.Fragment>
    );
  };

  const highlightType = (className: string, style: CSSProperties, chatLine: string, playerName?: string | undefined) => {
    return (
      <span className={className} style={style}>{highlightPlayer(chatLine, playerName)}</span>
    );
  };

  const renderTextLine = (chatObj: IuiChatNotification) => {
    const {type, chatLine, focusedPlayer} = chatObj;
    switch (type) {
      case CHAT_TYPE.promiseError:
      case CHAT_TYPE.leavedObserving:
      case CHAT_TYPE.requestToObserve:
      case CHAT_TYPE.requestToJoin: {
        return highlightType("", {color: "darkred", fontWeight: "bold"}, chatLine, focusedPlayer);
      }
      case CHAT_TYPE.roundStart: {
        return highlightType("", {fontWeight: "bold"}, chatLine, focusedPlayer);
      }
      case CHAT_TYPE.join: {
        return highlightType("", {color: "darkgreen", fontWeight: "bold"}, chatLine, focusedPlayer);
      }
      case CHAT_TYPE.leave:
      case CHAT_TYPE.disconnect: {
        return highlightType("", {color: "red", fontWeight: "bold"}, chatLine, focusedPlayer);
      }
      case CHAT_TYPE.overPoints: {
        return highlightType("", {color: "red"}, chatLine, focusedPlayer);
      }
      case CHAT_TYPE.gameOver: {
        return highlightType("gameOver", {fontWeight: "bold"}, chatLine);
      }
      default: return highlightPlayer(chatLine, focusedPlayer);
    }
  };

  const renderChatLines = () => {
    return chatObjects.map((row, i) => {
      return <React.Fragment key={i}>{renderTextLine(row)}<br /></React.Fragment>;
    });
  };

  return (
    <div id="chatArea">
      <div className="chatBox scrollBars"
        ref={divChatRef}
        contentEditable
        suppressContentEditableWarning={true}
      >
        {renderChatLines()}
      </div>
      {/* <input type="text" />
      <Button
        size="sm"
      >
        Send
      </Button> */}
    </div>
  );
};

export default Chat;

import React, { createRef, useEffect, useState } from "react";
import { useSocket } from "../socket";

/**
 * Chat and log
 */
const Chat = () => {
  const [textRows, setTextRows] = useState<string[]>([]);

  const { socket } = useSocket();
  const divChatRef = createRef<HTMLDivElement>();

  useEffect(() => {
    socket.on("new chat line", (chatLine: string) => {
      console.log("new chat line", chatLine);
      setTextRows((prevState) => ([...prevState, chatLine]));
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

  const renderChatLines = () => {
    return textRows.map((row, i) => {
      return <React.Fragment key={i}>{row}<br /></React.Fragment>;
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
    </div>
  );
};

export default Chat;

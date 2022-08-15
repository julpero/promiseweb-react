import React, { createRef, useEffect, useState } from "react";
import { useSocket } from "../socket";

/**
 * Chat and log
 */
function Chat () {
  const [textRows, setTextRows ] = useState<string[]>([]);

  useEffect(() => {
    socket.on("new chat line", (chatLine: string) => {
      console.log("got new chat line", chatLine);
      setTextRows(textRows.concat(chatLine));
      const scrollHeight =chatRef.current?.scrollHeight ?? 1;
      if (chatRef.current) {
        chatRef.current.scrollTop = scrollHeight;
      }
    });
  }, []);

  const { socket } = useSocket();

  const chatRef = createRef<HTMLTextAreaElement>();

  const renderChatLines = (): string => {
    return textRows.join("\n")+"\n";
  };

  return (
    <textarea
      rows={5}
      ref={chatRef}
      readOnly
      value={renderChatLines()}
    ></textarea>
  );
}

export default Chat;

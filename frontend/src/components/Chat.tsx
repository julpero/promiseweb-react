import React, { createRef, useEffect, useState } from "react";
import { useSocket } from "../socket";

/**
 * Chat and log
 */
const Chat = () => {
  const [textRows, setTextRows] = useState<string[]>([]);

  const { socket } = useSocket();
  const chatRef = createRef<HTMLTextAreaElement>();

  useEffect(() => {
    socket.on("new chat line", (chatLine: string) => {
      setTextRows((prevState) => ([...prevState, chatLine]));
    });

    return () => {
      socket.off("new chat line");
    };
  }, [socket]);

  useEffect(() => {
    const scrollHeight = chatRef.current?.scrollHeight ?? 1;
    if (chatRef.current) {
      chatRef.current.scrollTop = scrollHeight;
    }
  }, [chatRef]);

  const renderChatLines = (): string => {
    return textRows.join("\n");
  };

  return (
    <textarea
      cols={40}
      rows={5}
      ref={chatRef}
      readOnly
      value={renderChatLines()}
    ></textarea>
  );
};

export default Chat;

import React, { createRef, useEffect, useState } from "react";
import { useSocket } from "../socket";

/**
 * Chat and log
 */
const Chat = () => {
  const [textRows, setTextRows] = useState<string[]>([]);

  const { socket } = useSocket();

  useEffect(() => {
    socket.on("new chat line", (chatLine: string) => {
      setTextRows((prevState) => ([...prevState, chatLine]));
    });

    return () => {
      socket.off("new chat line");
    };
  }, []);

  useEffect(() => {
    const scrollHeight = chatRef.current?.scrollHeight ?? 1;
    if (chatRef.current) {
      chatRef.current.scrollTop = scrollHeight;
    }
  }, [textRows]);

  const chatRef = createRef<HTMLTextAreaElement>();

  const renderChatLines = (): string => {
    return textRows.join("\n");
  };

  return (
    <textarea
      rows={5}
      ref={chatRef}
      readOnly
      value={renderChatLines()}
    ></textarea>
  );
};

export default Chat;

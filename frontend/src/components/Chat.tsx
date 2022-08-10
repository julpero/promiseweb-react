import React, { createRef } from "react";
import { socket, SocketContext } from "../socket";

interface IState {
  textRows: string[],
}

/**
 * Chat and log
 */
class Chat extends React.Component<Record<string, never>, IState> {
  state: IState = {
    textRows: [],
  };

  componentDidMount() {
    socket.on("new chat line", (chatLine: string) => {
      console.log("got new chat line", chatLine);
      this.setState({textRows: this.state.textRows.concat(chatLine)});
      const scrollHeight = this.chatRef.current?.scrollHeight ?? 1;
      if (this.chatRef.current) {
        this.chatRef.current.scrollTop = scrollHeight;
      }
    });
  }

  static socket = SocketContext;

  private chatRef = createRef<HTMLTextAreaElement>();

  renderChatLines = (): string => {
    return this.state.textRows.join("\n")+"\n";
  };

  render(): React.ReactNode {
    return (
      <textarea rows={5} ref={this.chatRef} readOnly value={this.renderChatLines()}></textarea>
    );
  }
}

export default Chat;

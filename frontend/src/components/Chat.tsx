// @flow
import * as React from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

type Props = {};
//memory
interface Message {
  name: string;
  message: string;
}

export const Chat = (props: Props) => {
  const location = useLocation();
  const queryParams = React.useMemo(() => {
    const query = new URLSearchParams(location.search);
    return {
      room_id: query.get("room_id"),
      name: query.get("name"),
    };
  }, [location]);

  //   const socket = React.useMemo<SocketIOClient.Socket>(
  //     () => io("http://localhost:3000/room", { query: { name: queryParams.name } }),
  //     [queryParams]
  //   );
  const socket = React.useMemo<SocketIOClient.Socket>(
    () => io("http://localhost:3000/room"),
    []
  );
  const inputRef = React.useRef() as React.MutableRefObject<any>;

  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    socket.on(
      "receive-message",
      (content: { message: string; name: string }) => {
        console.log(content);
        setMessages((prevState) => [...prevState, content]);
      }
    );

    socket.on("connect", () => {
      console.log("abriu a conexão");
      socket.emit('join', {
          name: queryParams.name,
          room_id: queryParams.room_id
      })
    });
  }, [socket, queryParams]);

  function sendMessage() {
    const message = inputRef.current.value;
    socket.emit("send-message", { message });
    const name = queryParams.name as string;
    const content = { message, name };
    setMessages((prevState) => [...prevState, content]);
  }

  return (
    <div>
      <h1>Chat Fullcycle</h1>
      <ul>
        {messages.map((message, key) => (
          <li key={key}>
            {message.name} - {message.message}
          </li>
        ))}
      </ul>
      <p>
        <label htmlFor="message">Message</label>
        <input type="text" id="message" ref={inputRef} />
        <button type="button" onClick={() => sendMessage()}>
          Enviar
        </button>
      </p>
    </div>
  );
};

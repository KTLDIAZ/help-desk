import React from "react";
import { useSelector } from "react-redux";
import { Message } from "./Message";

export const Messages = () => {
  const { tickets, auth } = useSelector((state) => state);
  const { messages } = tickets;
  const { displayName } = auth;
  console.log(messages);
  return (
    <div style={{ width: "100%" }}>
      {messages &&
        messages.map((message, index) => (
          <Message
            key={index}
            left={message.author !== displayName}
            {...message}
          />
        ))}
    </div>
  );
};

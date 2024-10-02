import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {
  const [userName, setuserName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName) {
      return alert("username is required");
    }
    const msg = { userName, content: message };
    socket.emit("chat message", msg);
    setMessage("");
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>chat app</h1>
        <div style={{ marginBottom: "20px" }}>
          <ul>
            {chat.map((elt, idx) => {
              <li key={idx}>
                {elt.userName} : {elt.message}
              </li>;
            })}
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <input
              value={userName}
              onChange={(e) => {
                setuserName(e.target.value);
              }}
              type="text"
              placeholder="Enter user username"
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            {" "}
            <input
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              type="text"
              placeholder="Enter user message"
            />
          </div>

          <button type="submit">send</button>
        </form>
      </div>
    </>
  );
}

export default App;

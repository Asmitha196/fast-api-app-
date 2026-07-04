import { useState } from "react";
import { sendMessage } from "../Services/ChatServices";

function Chat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
    { sender: string; text: string }[]
  >([]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage = {
      sender: "You",
      text: query,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await sendMessage({
        query,
      });

      const aiMessage = {
        sender: "AI",
        text: response.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setQuery("");
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: "Something went wrong.",
        },
      ]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>TalentSpark Chat Assistant</h1>

      <div
        style={{
          border: "1px solid #ccc",
          height: "400px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask something..."
        style={{
          width: "80%",
          padding: "10px",
        }}
      />

      <button
        onClick={handleSend}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default Chat;
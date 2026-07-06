import { useState } from "react";
import { askCareerChat } from "../Services/ChatServices";
import type { ChatMessage } from "../types/chat";

function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sessionId] = useState(() => "session_" + Date.now());

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: ChatMessage = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await askCareerChat(input, sessionId);
            const botMessage: ChatMessage = { role: "bot", content: response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: ChatMessage = { role: "bot", content: "Error: Could not get response" };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-layout">
            <aside className="chat-sidebar">
                <div className="chat-sidebar-header">
                    <p className="eyebrow">Active chats</p>
                    <h3>Career Support</h3>
                </div>
                <div className="chat-user-card active">
                    <strong>Career Coach</strong>
                    <span>Online</span>
                </div>
                <div className="chat-user-card">
                    <strong>Resume Review</strong>
                    <span>Available</span>
                </div>
                <div className="chat-user-card">
                    <strong>Interview Prep</strong>
                    <span>Pending</span>
                </div>
            </aside>

            <section className="chat-panel">
                <div className="chat-panel-header">
                    <div>
                        <p className="eyebrow">AI Career Assistant</p>
                        <h2>Career Chat</h2>
                    </div>
                    <div className="chat-status">Online</div>
                </div>

                <div className="chat-messages-panel">
                    {messages.length === 0 && (
                        <div className="chat-empty-state">
                            <h3>Ask anything about your career journey</h3>
                            <p>Get career guidance, resume feedback, and job-search suggestions in real time.</p>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div key={i} className={`chat-bubble ${msg.role === "user" ? "user" : "bot"}`}>
                            <strong>{msg.role === "user" ? "You" : "Assistant"}</strong>
                            <p>{msg.content}</p>
                        </div>
                    ))}

                    {loading && (
                        <div className="chat-bubble bot typing">
                            <strong>Assistant</strong>
                            <p>Thinking...</p>
                        </div>
                    )}
                </div>

                <form className="chat-input-panel" onSubmit={handleSend}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>Send</button>
                </form>
            </section>
        </div>
    );
}

export default Chat;
import { useState } from "react";
import { askCareerChat } from "../Services/ChatServices";
import { analyzeResume, askRag, matchJobs, searchJobs } from "../Services/RagServices";
import type { ChatMessage } from "../types/chat";

function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sessionId] = useState(() => "session_" + Date.now());
    const [semanticQuery, setSemanticQuery] = useState("");
    const [semanticResults, setSemanticResults] = useState<Array<{ title: string; description: string; salary?: number | null; score: number }>>([]);
    const [ragQuestion, setRagQuestion] = useState("");
    const [ragAnswer, setRagAnswer] = useState("");
    const [resumeText, setResumeText] = useState("");
    const [resumeAnalysis, setResumeAnalysis] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [jobMatches, setJobMatches] = useState<Array<{ title: string; description: string; salary?: number | null; match_score: number }>>([]);

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

    const handleSemanticSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!semanticQuery.trim()) return;

        try {
            const response = await searchJobs(semanticQuery);
            setSemanticResults(response.results);
        } catch (error) {
            console.error("Semantic search error:", error);
            setSemanticResults([]);
        }
    };

    const handleRagAsk = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ragQuestion.trim()) return;

        try {
            const response = await askRag(ragQuestion);
            setRagAnswer(response.answer);
        } catch (error) {
            console.error("RAG ask error:", error);
            setRagAnswer("Unable to get an answer right now.");
        }
    };

    const handleResumeAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resumeText.trim()) return;

        try {
            const response = await analyzeResume(resumeText);
            setResumeAnalysis(response.analysis);
        } catch (error) {
            console.error("Resume analysis error:", error);
            setResumeAnalysis("Unable to analyze the resume right now.");
        }
    };

    const handleJobMatch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!skills.trim() || !experience.trim()) return;

        try {
            const response = await matchJobs(skills, experience);
            setJobMatches(response.matches);
        } catch (error) {
            console.error("Job match error:", error);
            setJobMatches([]);
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

                <div className="rag-stack">
                    <div className="section-card rag-card">
                        <div className="section-header">
                            <div>
                                <h2>Semantic Job Search</h2>
                                <p>Search jobs with natural language.</p>
                            </div>
                        </div>
                        <form className="rag-form" onSubmit={handleSemanticSearch}>
                            <input value={semanticQuery} onChange={(e) => setSemanticQuery(e.target.value)} placeholder="Try: remote frontend roles" />
                            <button className="action-btn primary" type="submit">Search</button>
                        </form>
                        <div className="data-list">
                            {semanticResults.map((result, index) => (
                                <div className="data-card" key={`${result.title}-${index}`}>
                                    <div className="data-top">
                                        <div>
                                            <h3>{result.title}</h3>
                                            <p className="data-subtitle">Score: {result.score}</p>
                                        </div>
                                        <div className="section-pill soft">{result.salary ?? "N/A"}</div>
                                    </div>
                                    <p className="data-meta">{result.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="section-card rag-card">
                        <div className="section-header">
                            <div>
                                <h2>RAG Assistant</h2>
                                <p>Ask job-related questions.</p>
                            </div>
                        </div>
                        <form className="rag-form" onSubmit={handleRagAsk}>
                            <input value={ragQuestion} onChange={(e) => setRagQuestion(e.target.value)} placeholder="What roles fit my background?" />
                            <button className="action-btn primary" type="submit">Ask</button>
                        </form>
                        {ragAnswer && <div className="rag-response">{ragAnswer}</div>}
                    </div>

                    <div className="section-card rag-card">
                        <div className="section-header">
                            <div>
                                <h2>Resume Analysis</h2>
                                <p>Paste a resume and get an analysis.</p>
                            </div>
                        </div>
                        <form className="rag-form rag-form-stack" onSubmit={handleResumeAnalyze}>
                            <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder="Paste resume text here..." rows={6} />
                            <button className="action-btn primary" type="submit">Analyze</button>
                        </form>
                        {resumeAnalysis && <div className="rag-response">{resumeAnalysis}</div>}
                    </div>

                    <div className="section-card rag-card">
                        <div className="section-header">
                            <div>
                                <h2>Job Match</h2>
                                <p>Match your profile to jobs.</p>
                            </div>
                        </div>
                        <form className="rag-form rag-form-stack" onSubmit={handleJobMatch}>
                            <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills" />
                            <input value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Experience" />
                            <button className="action-btn primary" type="submit">Match</button>
                        </form>
                        <div className="data-list">
                            {jobMatches.map((match, index) => (
                                <div className="data-card" key={`${match.title}-${index}`}>
                                    <div className="data-top">
                                        <div>
                                            <h3>{match.title}</h3>
                                            <p className="data-subtitle">Match: {match.match_score}</p>
                                        </div>
                                        <div className="section-pill soft">{match.salary ?? "N/A"}</div>
                                    </div>
                                    <p className="data-meta">{match.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
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
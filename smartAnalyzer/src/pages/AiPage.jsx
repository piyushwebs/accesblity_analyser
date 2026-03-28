import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import "./AiPage.css";

function AiPage() {
  const { scanId, index } = useParams();
  const location = useLocation();
  const mode = location.state?.mode;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (mode === "structured") {
      fetchAi();
    }
  }, [mode]);

  const fetchAi = async (userMessage = null) => {
    setLoading(true);
    setError("");

    try {
      const requestMode = userMessage ? "chat" : mode;

      const body =
        requestMode === "chat"
          ? { mode: "chat", userQuestion: userMessage || question }
          : { mode: "structured" };

      const response = await fetch(
        `http://localhost:1104/api/ai/example/${scanId}/${index}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) throw new Error("AI request failed");

      const data = await response.json();

      const aiText =
        requestMode === "chat"
          ? data.answer
          : `Summary:\n${data.summary}\n\nWhy it matters:\n${data.why_it_matters}\n\nHow to fix:\n${data.how_to_fix}\n\nCode:\n${data.code_examples?.good_example}`;

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: aiText },
      ]);
    } catch (err) {
      setError("Failed to get AI response");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!question.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
    ]);

    fetchAi(question);
    setQuestion("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span className="header-icon">✨</span>
        AI Assistant ({mode})
        <span className="header-pulse"></span>
      </div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.role} message-animate`}>
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}

        {loading && (
          <div className="chat-message ai message-animate">
            <span className="typing-indicator">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder={loading ? "Please wait until the response is generated..." : "Ask a follow-up question..."}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && handleSubmit()}
          className="chat-input"
          disabled={loading}
        />
        <button 
          onClick={handleSubmit} 
          className="send-button"
          disabled={loading}
        >
          <span className="button-text">Send</span>
          <span className="button-icon">→</span>
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default AiPage;
import React, { useState } from 'react';
import './FixSuggestionPanel.css';

export const FixSuggestionPanel = ({ issue, onClose, scanId, index }) => {
  const [isAiExpanded, setIsAiExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [aiExplanation, setAiExplanation] = useState(issue?.aiExplanation || null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Handle code snippet copying
  const handleCopy = () => {
    if (!issue?.codeExample) return;
    navigator.clipboard.writeText(issue.codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAiClick = async () => {
    setIsAiExpanded(!isAiExpanded);
    
    // Fetch if expanding, and no explanation exists yet
    if (!isAiExpanded && !aiExplanation && scanId !== undefined && index !== undefined) {
      setIsAiLoading(true);
      try {
        const body = { mode: "chat", userQuestion: "Explain this accessibility issue and provide a fix in a concise way." };
        const response = await fetch(
          `http://localhost:1104/api/ai/example/${scanId}/${index}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        const data = await response.json();
        setAiExplanation(data.answer || "No response received.");
      } catch (err) {
        setAiExplanation("Failed to generate AI response. Please try again.");
      } finally {
        setIsAiLoading(false);
      }
    }
  };

  if (!issue) return null;

  const severityClass = issue.severity ? `fsp-badge ${issue.severity.toLowerCase()}` : 'fsp-badge unknown';
  const displaySeverity = issue.severity || 'Unknown';

  return (
    <div className="fsp-container">
      
      {/* Close Button (X) */}
      {onClose && (
        <button 
          onClick={onClose}
          className="fsp-close-btn"
          aria-label="Close panel"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Header Section */}
      <div className="fsp-header-row">
        <h2 className="fsp-title">
          {issue.title}
        </h2>
        <div>
          <span className={severityClass}>
            {displaySeverity}
          </span>
        </div>
      </div>

      {/* Problem Description */}
      <p className="fsp-desc">
        {issue.description}
      </p>

      {/* Fix Suggestion Highlight */}
      <div className="fsp-highlight">
        <span className="fsp-highlight-icon" role="img" aria-label="lightbulb">💡</span>
        <div>
          <h3 className="fsp-highlight-title">How to fix</h3>
          <p className="fsp-highlight-text">
            {issue.fixSuggestion}
          </p>
        </div>
      </div>

      {/* Code Example Section */}
      {issue.codeExample && (
        <div className="fsp-code-section">
          <div className="fsp-code-header">
            <span className="fsp-code-label">Example HTML Code</span>
            <button 
              onClick={handleCopy}
              className="fsp-btn-copy"
            >
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <pre className="fsp-code-pre">
            <code>{issue.codeExample}</code>
          </pre>
        </div>
      )}

      {/* AI Section (Optional) */}
      <div className="fsp-ai-section">
        <button 
          onClick={handleAiClick}
          className="fsp-ai-btn"
        >
          <span>✨</span>
          <span>Explain with AI</span>
          <svg 
            className={`fsp-ai-chevron ${isAiExpanded ? 'expanded' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {/* Expanded AI Description */}
        <div className={`fsp-ai-content ${isAiExpanded ? 'expanded' : ''}`}>
          <div className="fsp-ai-box">
            {isAiLoading ? (
              <div className="fsp-pulse">
                <div className="fsp-pulse-bar"></div>
                <div className="fsp-pulse-bar"></div>
                <div className="fsp-pulse-bar"></div>
              </div>
            ) : aiExplanation ? (
              <p className="fsp-ai-text">
                {aiExplanation}
              </p>
            ) : (
              <p className="fsp-ai-text">Click "Explain with AI" to generate an explanation.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

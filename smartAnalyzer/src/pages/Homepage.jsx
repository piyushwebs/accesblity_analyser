import React, { useState } from "react";
import "./HomePage.css";
import HomeFoot from "./HomeFoot";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateUrl = (urlString) => {
    return urlString.startsWith("http://") || urlString.startsWith("https://");
  };

  const handleSubmit = async () => {
    // Reset states
    setError("");

    // Validate URL
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("URL must start with http:// or https://");
      return;
    }

    // Set loading state
    setIsLoading(true);

    try {
      // API call to backend
      const response = await fetch("http://localhost:1102/api/analyse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze website");
      }

      const data = await response.json();

      console.log("Analyse response:", data);

      if (!data.scanId) {
        throw new Error("Scan ID not received from server");
      }
      //As we get data we will navigate to our result page
      navigate(`/result/${data.scanId}`);
    } catch (err) {
      setError(err.message || "An error occurred while analyzing the website");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="homepage">
      <div className="homepage__container">
        {/* Header Section */}
        <header className="homepage__header">
          <div className="homepage__logo">
            <svg
              className="homepage__logo-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 10H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="7" cy="8" r="0.5" fill="currentColor" />
              <circle cx="9" cy="8" r="0.5" fill="currentColor" />
              <circle cx="11" cy="8" r="0.5" fill="currentColor" />
            </svg>
            <h1 className="homepage__title">Website Analyzer</h1>
          </div>
          <p className="homepage__subtitle">
            Analyze any website's performance, SEO, and technical details
          </p>
        </header>

        {/* Main Card */}
        <div className="homepage__card">
          <div className="homepage__form">
            {/* Input Group */}
            <div className="homepage__input-group">
              <label htmlFor="url-input" className="homepage__label">
                Enter Website URL
              </label>
              <div className="homepage__input-wrapper">
                <div className="homepage__input-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 11C13.5705 10.4259 13.0226 9.9508 12.3934 9.60704C11.7642 9.26328 11.0685 9.05886 10.3533 9.00765C9.63819 8.95643 8.92037 9.05965 8.24861 9.3102C7.57685 9.56076 6.96684 9.95295 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.542 3.52086 20.4691C4.4479 21.3961 5.70197 21.9219 7.01295 21.9333C8.32393 21.9447 9.58694 21.4407 10.53 20.53L12.24 18.82"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input
                  id="url-input"
                  type="text"
                  value={url}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  placeholder="https://example.com"
                  className={`homepage__input ${
                    error ? "homepage__input--error" : ""
                  }`}
                  disabled={isLoading}
                  autoComplete="off"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="homepage__error" role="alert">
                  <svg
                    className="homepage__error-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 8V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="16"
                      r="0.5"
                      fill="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="homepage__error-text">{error}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="homepage__button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="homepage__spinner"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="homepage__spinner-circle"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg
                    className="homepage__button-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Analyze Website
                </>
              )}
            </button>
          </div>
        </div>

        {/* Features Section */}
        <HomeFoot />
      </div>
    </div>
  );
};

export default HomePage;

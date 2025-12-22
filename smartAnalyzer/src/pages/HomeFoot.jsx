import "./HomePage.css";

function HomeFoot() {
  return (
    <>
      <div className="homepage__features">
        <div className="homepage__feature">
          <div className="homepage__feature-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="homepage__feature-title">Fast Analysis</h3>
          <p className="homepage__feature-text">
            Get instant insights about website performance
          </p>
        </div>
        <div className="homepage__feature">
          <div className="homepage__feature-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 11L12 14L22 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="homepage__feature-title">Comprehensive</h3>
          <p className="homepage__feature-text">
            Detailed technical and SEO analysis
          </p>
        </div>
        <div className="homepage__feature">
          <div className="homepage__feature-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 6V12L16 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="homepage__feature-title">Real-time</h3>
          <p className="homepage__feature-text">
            Live data from active websites
          </p>
        </div>
      </div>
      {/* Footer */}
        <footer className="homepage__footer">
          <p className="homepage__footer-text">
            Powered by advanced web scraping technology
          </p>
        </footer>
    </>
  );
}

export default HomeFoot;

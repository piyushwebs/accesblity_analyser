import './ResultPage.css';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ResultPage() {
  const { scanId } = useParams();
  const [data, setData] = useState(null);
  const [loadingViolation, setLoadingViolation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:1102/api/analyse/${scanId}`)
      .then((res) => res.json())
      .then(setData);
  }, [scanId]);

  const handleViewDetails = (index) => {
    setLoadingViolation(index);
    // Navigate after a brief delay to show loading state
    setTimeout(() => {
      navigate(`/result/${scanId}/violations/${index}`);
    }, 200);
  };

  if (!data) {
    return (
      <div className="result-page">
        <div className="result-page__container">
          <div className="result-page__loading">
            <div className="result-page__spinner"></div>
            <p className="result-page__loading-text">Loading result...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="result-page">
      <div className="result-page__container">
        {/* Header Section */}
        <div className="result-page__header">
          <h1 className="result-page__title">Accessibility Analysis Results</h1>
          <p className="result-page__subtitle">Scan ID: {scanId}</p>
        </div>

        {/* Summary Section */}
        <div className="result-page__summary">
          <div className="summary-card summary-card--success">
            <div className="summary-card__label">Passed</div>
            <div className="summary-card__value">{data.summary.passes}</div>
            <div className="summary-card__description">Tests passed successfully</div>
          </div>

          <div className="summary-card summary-card--error">
            <div className="summary-card__label">Failed</div>
            <div className="summary-card__value">{data.summary.violations}</div>
            <div className="summary-card__description">Violations detected</div>
          </div>

          <div className="summary-card summary-card--neutral">
            <div className="summary-card__label">Inapplicable</div>
            <div className="summary-card__value">{data.summary.inapplicable}</div>
            <div className="summary-card__description">Tests not applicable</div>
          </div>
        </div>

        {/* Violations Section */}
        {data?.violations && data.violations.length > 0 && (
          <div className="result-page__violations">
            <div className="violations__header">
              <h2 className="violations__title">Detected Violations</h2>
              <p className="violations__subtitle">
                {data.violations.length} violation{data.violations.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="violations-table">
              <div className="violations-table__wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Violation ID</th>
                      <th>Impact Level</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.violations.map((v, index) => (
                      <tr key={index}>
                        <td className="violations-table__id" data-label="Violation ID">
                          {v.id}
                        </td>
                        <td className="violations-table__impact" data-label="Impact Level">
                          <span className={`impact-badge impact-badge--${v.impact || 'minor'}`}>
                            {v.impact || 'Unknown'}
                          </span>
                        </td>
                        <td className="violations-table__actions" data-label="Actions">
                          <div className="violations-table__actions-group">
                            <button
                              className={`btn btn--primary ${loadingViolation === index ? 'btn--loading' : ''}`}
                              onClick={() => handleViewDetails(index)}
                              disabled={loadingViolation === index}
                            >
                              View Details
                            </button>
                            <button className="btn btn--secondary" disabled>
                              Ask AI
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Empty State - When no violations */}
        {data?.violations && data.violations.length === 0 && (
          <div className="result-page__empty">
            <div className="result-page__empty-icon">✓</div>
            <h3 className="result-page__empty-title">No Violations Found!</h3>
            <p className="result-page__empty-text">
              Great news! Your website passed all accessibility checks.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultPage;
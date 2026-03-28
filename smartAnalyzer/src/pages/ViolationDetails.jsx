import './ViolationDetails.css';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FixSuggestionPanel } from '../components/FixSuggestionPanel';

function ViolationDetails() {
  const { scanId, index } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [mode,setMode] = useState();

  useEffect(() => {
    fetch(`http://localhost:1104/api/analyse/${scanId}`)
      .then((res) => res.json())
      .then(data => {
        setData(data.violations[index])
      });
  }, [scanId, index]);


  const handleNavigation = (mode1) =>{
      setMode(mode1);
      navigate(`/result/${scanId}/violations/${index}/ai`,{
        state:{mode:mode1}
      })
  }

  if (!data) return (
    <div className="violation-details">
      <div className="violation-details__container">
        <div className="violation-details__loading">
          <div className="violation-details__spinner"></div>
          <h1 className="violation-details__loading-text">Loading Results</h1>
        </div>
      </div>
    </div>
  );

  return (
    <div className="violation-details">
      <div className="violation-details__container">
        {/* Back Button */}
        <div className="violation-details__back">
          <button 
            className="btn btn--back"
            onClick={() => navigate(`/result/${scanId}`)}
          >
            ← Back to Results
          </button>
        </div>

        {/* Header Section */}
        <div className="violation-details__header">
          <div className="violation-details__header-top">
            <h1 className="violation-details__title">Violation Details</h1>
            <span className={`impact-badge impact-badge--${data.impact || 'minor'}`}>
              {data.impact || 'Unknown'}
            </span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="violation-details__content">
          
          {/* Violation ID Section */}
          <div className="detail-section">
            <h2 className="detail-section__title">Violation ID</h2>
            <p className="detail-section__id">{data.id}</p>
          </div>

          {/* Impact Section */}
          <div className="detail-section">
            <h2 className="detail-section__title">Impact Level</h2>
            <p className="detail-section__text">{data.impact}</p>
          </div>

          {/* Description Section */}
          <div className="detail-section">
            <h2 className="detail-section__title">Description</h2>
            <p className="detail-section__text">{data.description}</p>
          </div>

          {/* Help Section */}
          <div className="detail-section">
            <h2 className="detail-section__title">How to Fix</h2>
            <div style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <FixSuggestionPanel 
                scanId={scanId}
                index={index}
                issue={{
                  title: data.help,
                  severity: data.impact,
                  description: data.description,
                  fixSuggestion: data.help,
                  codeExample: data.nodes && data.nodes.length > 0 ? data.nodes[0].html : null
                }} 
              />
            </div>
          </div>

          {/* Documentation Link */}
          <div className="detail-section">
            <h2 className="detail-section__title">Learn More</h2>
            <a 
              href={data.helpUrl} 
              target="_blank" 
              rel="noreferrer"
              className="detail-section__link"
            >
              📚 View Documentation
              <span className="detail-section__link-icon">→</span>
            </a>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="violation-details__actions">
          <button 
            className="btn btn--primary"
            onClick={() => navigate(`/result/${scanId}`)}
          >
            Back to All Violations
          </button>
          <button className="btn btn--secondary" onClick={()=>{handleNavigation('chat')}}>
           Ask Related questions
          </button>
          <button className="btn btn--secondary" onClick={()=>{handleNavigation('structured')}}>
          Get quick fix
          </button>
        </div>

      </div>
    </div>
  );
}

export default ViolationDetails;
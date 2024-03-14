import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCog, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [responses, setResponses] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    // Placeholder for API call
    const response = await getResponseFromAPI(inputText);
    setResponses([...responses, { query: inputText, response: response }]);
    setInputText(""); // Clear input after submission
  };

  // Placeholder function for API call
  async function getResponseFromAPI(query) {
    // Simulate API call
    return `Response to: ${query}`;
  }

  return (
    <div className="app-container">
      <div className="navigation-sidebar">
        <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Company Logo" />
        </div>
        {/* Spacer div to push icons to the bottom */}
        <div className="spacer"></div>
        {/* Container for icons */}
        <div className="icons-container">
          <div className="icon">
            <FontAwesomeIcon icon={faCog} />
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </div>
      <div className="main-work-area">
        <div className="panel panel-left">
          <div className="output-area">
            {responses.map((entry, index) => (
              <div key={index}>
                <p>
                  <strong>Question:</strong> {entry.query}
                </p>
                <p>
                  <strong>Answer:</strong> {entry.response}
                </p>
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Ask me anything..."
            />
            <button onClick={handleSubmit} aria-label="Submit">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        <div className="panel panel-right">
          {/* Document viewing functionality goes here */}
          <p>Document Viewer Panel</p>
        </div>
      </div>
    </div>
  );
}

export default App;

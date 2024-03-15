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

  // Correctly placed handleKeyDown function
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && inputText.trim()) {
      event.preventDefault(); // Prevent the default action to avoid line breaks on Enter
      handleSubmit(); // Trigger the form submission logic
    }
  };

  // Function to animate text for a given response
  const animateText = (text, index) => {
    let animatedText = "";
    const intervalId = setInterval(() => {
      animatedText += text[animatedText.length];
      const newResponses = [...responses];
      newResponses[index] = {
        ...newResponses[index],
        animatedResponse: animatedText,
      };
      setResponses(newResponses);

      if (animatedText.length === text.length) {
        clearInterval(intervalId);
      }
    }, 10); // Adjust the speed of typing by changing the interval duration
  };

  const handleSubmit = async () => {
    const responseText = (await getResponseFromAPI(inputText)).trim();
    const newResponse = {
      query: inputText,
      response: responseText,
      animatedResponse: "",
    };
    const newResponses = [...responses, newResponse];
    setResponses(newResponses);
    setInputText("");
    animateText(responseText, newResponses.length - 1);
  };

  // Placeholder function for API call
  async function getResponseFromAPI(query) {
    // Simulate API call
    return `Estamos trabajando en ello :)`;
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
          <div className="input-area">
            <textarea
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
            ></textarea>
            <button
              onClick={handleSubmit}
              aria-label="Submit"
              className={`submit-icon ${!inputText.trim() ? "disabled" : ""}`}
              disabled={!inputText.trim()} // Disable button if inputText is empty
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div className="output-area">
            {responses.map((entry, index) => (
              <div key={index} className="response-entry">
                <p>{entry.animatedResponse}</p>
              </div>
            ))}
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


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import "./dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [correctedSentence, setCorrectedSentence] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const  handleLogout= ()=>{
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    if (!inputText.trim()) {
      setIncorrectWords([]);
      setCorrectedSentence("");
      setIsButtonDisabled(true);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/check-grammar`, {
            text: inputText,
        });
        const incorrectWordsList = response.data.identifiedIncorrectWords ? response.data.identifiedIncorrectWords.split(",").map((word) => word.trim()) : [];
        setIncorrectWords(incorrectWordsList);
        setCorrectedSentence(response.data.correctedSentence);
        setIsButtonDisabled(false);
      } catch (error) {
        console.error("Error checking grammar:", error);
        setIncorrectWords([]);
        setCorrectedSentence("");
        setIsButtonDisabled(true);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [inputText]);

  const saveToChat = () => {
    if (!correctedSentence) return;
    const newMessage = {
      input: inputText,
      incorrectWords,
      correctedSentence,
    };
    setChatHistory((prev) => [...prev, newMessage]);
    setInputText("");
    setIncorrectWords([]);
    setCorrectedSentence("");
    setIsButtonDisabled(true);
    setIsHistoryVisible(true); // Show history after saving
  };

  const highlightText = (text, wordsToHighlight) => {
    if (!text || wordsToHighlight.length === 0) return text;

    let highlightedText = text;
    wordsToHighlight.forEach((word) => {
      if (!word) return;
      const escapedWord = word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedWord}\\b`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        `<span class="highlight">${word}</span>`
      );
    });

    return highlightedText;
  };

  return (
    <div className="dashboardContainer">
      <button onClick={handleLogout} className="logoutButton btn btn-danger">Logout</button>
      <h2 className="dashboardTitle">Grammar Checker</h2>
      {isHistoryVisible && (
        <div className="historyBox">
          <h3 className="outputTitle">History</h3>
          {chatHistory.map((msg, index) => (
            <div key={index}>
              <div className="historyMessage returnMessage">
                <p><strong>You:</strong> {msg.input}</p>
                <p><strong>Incorrect:</strong> {msg.incorrectWords.join(", ") || "None"}</p>
                <p><strong>Corrected:</strong> {msg.correctedSentence}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="outputBox">
        <h3 className="outputTitle">Output</h3>
        <span
          className="outputText"
          dangerouslySetInnerHTML={{
            __html: highlightText(inputText, incorrectWords),
          }}
        ></span>
        {correctedSentence && (
          <div className="correctedSentence">
            <p className="outputSentenceTitle">Corrected Sentence: <span className="outputCorrectedSentence">"{correctedSentence}"</span></p>
          </div>
        )}
      </div>
      <textarea
        className="inputBox"
        placeholder="Type a sentence..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>

      {!isButtonDisabled && (
        <button className="saveButton" onClick={saveToChat} disabled={isButtonDisabled}>
          Save History
        </button>
      )}
    </div>
  );
};

export default Dashboard;

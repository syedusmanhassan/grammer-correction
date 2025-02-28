import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [incorrectWords, setIncorrectWords] = useState([]);

  const  handleLogout= ()=>{
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    if (!inputText.trim()) {
      setIncorrectWords([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/check-grammar`, {
          text: inputText,
        });
        const incorrectWordsList = response.data.identifiedIncorrectWords.split(",").map((word) => word.trim());
        setIncorrectWords(incorrectWordsList);
      }
      catch (error) {
        console.error("Error checking grammar:", error);
        setIncorrectWords([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputText]);

  const highlightText = (text, wordsToHighlight) => {
    if (!text || wordsToHighlight.length === 0) return text;

    let highlightedText = text;
    wordsToHighlight.forEach((word) => {
      if (!word) return;
      const escapedWord = word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"); //Source: http://stackoverflow.com
      const regex = new RegExp(`\\b${escapedWord}\\b`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        `<span class="highlight">${word}</span>`
      );
    });


    return highlightedText;
  };


  return (
    <div className='dashboardContainer'>
        <button onClick={handleLogout} className="logoutButton btn btn-danger">Logout</button>
        <h2 className='dashboardTitle'>Grammer Checker</h2>
        <div className="outputBox">
          <h3 className="outputTitle">Output</h3>
          <span className="outputText" dangerouslySetInnerHTML={{ __html: highlightText(inputText, incorrectWords), }}></span>
        </div>
        <textarea className="inputBox" placeholder="Please input your text here." value={inputText}
          onChange={(e) => setInputText(e.target.value)}></textarea>
    </div>
  )
}

export default Dashboard

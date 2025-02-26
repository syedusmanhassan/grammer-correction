import React from "react";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className='dashboardContainer'>
        <h2 className='dashboardTitle'>Grammer Checker</h2>
        <div className='outputBox'>
            <h3 className='outputTitle'>Output</h3>
            <p className='outputText'>Output text goes here, with <span className="highlight">incorrect</span> words highlighted as shown.</p>
        </div>
        <textarea className='inputBox' placeholder='Please input your text here.'></textarea>
    </div>
  )
}

export default Dashboard
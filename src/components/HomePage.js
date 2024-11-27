import React from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'

function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div className="home-container">
      <button className="home-button" onClick={() => handleNavigate('/attendance')}>Attendance</button>
      <button className="home-button" onClick={() => handleNavigate('/inventory')}>Inventory</button>
      <button className="home-button" onClick={() => handleNavigate('/schedule')}>Schedule</button>
    </div>
  );
}
  
  export default HomePage;
  
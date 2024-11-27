import React, { useState } from 'react';
import '../styles/Schedule.css';

function Schedule() {
  // Generate a variety of events for demonstration
  const [schedules, setSchedules] = useState([...Array(100).keys()].map(k => ({
    id: k + 1,
    name: `Event ${k + 1}`,
    date: `2024-02-${10 + k % 20}`,  // This will create a variety of dates in February
    time: `${(9 + k % 8).toString().padStart(2, '0')}:00 AM to ${(4 + k % 5).toString().padStart(2, '0')}:00 PM`
  })));

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSchedules = schedules.filter(schedule =>
    schedule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.date.includes(searchTerm)
  );

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <input 
          className="search-bar" 
          type="search" 
          placeholder="Search schedules by name or date..." 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="add-button">Add New</button>
      </div>
      <div className="schedule-list">
        {filteredSchedules.map(schedule => (
          <div key={schedule.id} className="schedule-item">
            <div className="schedule-details">
              <strong className="event-name">{schedule.name}</strong>
              <span className="event-time">{schedule.date} {schedule.time}</span>
            </div>
            <div className="schedule-actions">
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;

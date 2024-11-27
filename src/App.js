import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import Schedule from './components/Schedule';

// import RestaurantForm from './RestaurantForm';

// function App() {
//     return (
//         <div className="App">
//             <RestaurantForm />
//         </div>
//     );
// }
function App() {
    return (
      <Router basename="/resto">
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/schedule" element={<Schedule />} />
          {/* <Route path="/login" component={LoginPage} />
          <Route path="/home" component={HomePage} />
          <Route exact path="/" component={LoginPage} /> */}
        </Routes>
      </Router>
    );
  }

export default App;

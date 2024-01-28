import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MyCollection from './pages/myCollection';
import FamousForm from './pages/FamousInput';
import Navigation from './components/navigation/Navigation';

function App() {
  return (
    <Router>
      <div className="app">

        {/* Navigation */}
        <Navigation />

        {/* Routes */}
        <div className="app-routes">
        <Routes>
          <Route path="/" element={<MyCollection />} />
          <Route path="/famous" element={<FamousForm />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
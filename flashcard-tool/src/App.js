import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlashcardList from './components/FlashcardList';
import AdminDashboard from './components/AdminDashboard'; // Ensure correct import

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FlashcardList />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;

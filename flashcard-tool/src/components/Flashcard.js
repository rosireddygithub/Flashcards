import React from 'react';
import './Flashcard.css'; // Import the CSS file

const Flashcard = ({ flashcard, flipped, onClick }) => {
    return (
        <div className="flashcard" onClick={onClick}>
            {flipped ? flashcard.answer : flashcard.question}
        </div>
    );
};

export default Flashcard;

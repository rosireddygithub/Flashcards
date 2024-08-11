import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import './FlashcardList.css'; // Import the CSS file

const FlashcardList = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        const fetchFlashcards = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/flashcards`);
            setFlashcards(response.data);
        };
        fetchFlashcards();
    }, []);

    const nextCard = () => {
        setCurrentIndex((currentIndex + 1) % flashcards.length);
        setFlipped(false); // Reset the flip state
    };

    const prevCard = () => {
        setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
        setFlipped(false); // Reset the flip state
    };

    if (!flashcards.length) return <div>Loading...</div>;

    return (
        <div className="flashcard-container">
            <Flashcard flashcard={flashcards[currentIndex]} flipped={flipped} onClick={() => setFlipped(!flipped)} />
            <div className="navigation-buttons">
                <button onClick={prevCard}>Previous</button>
                <button onClick={nextCard}>Next</button>
            </div>
        </div>
    );
};

export default FlashcardList;

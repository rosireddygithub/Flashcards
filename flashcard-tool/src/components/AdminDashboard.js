import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });

    useEffect(() => {
        const fetchFlashcards = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/flashcards`);
            setFlashcards(response.data);
        };
        fetchFlashcards();
    }, []);

    const addFlashcard = async () => {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/flashcards`, newFlashcard);
        setFlashcards([...flashcards, response.data]);
        setNewFlashcard({ question: '', answer: '' });
    };

    const updateFlashcard = async (id, updatedFlashcard) => {
        const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/flashcards/${id}`, updatedFlashcard);
        setFlashcards(flashcards.map(fc => (fc._id === id ? response.data : fc)));
    };

    const deleteFlashcard = async (id) => {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/flashcards/${id}`);
        setFlashcards(flashcards.filter(fc => fc._id !== id));
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <input
                type="text"
                value={newFlashcard.question}
                onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
                placeholder="Question"
            />
            <input
                type="text"
                value={newFlashcard.answer}
                onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
                placeholder="Answer"
            />
            <button onClick={addFlashcard}>Add Flashcard</button>

            <ul>
                {flashcards.map(fc => (
                    <li key={fc._id}>
                        <input
                            type="text"
                            value={fc.question}
                            onChange={(e) => updateFlashcard(fc._id, { ...fc, question: e.target.value })}
                        />
                        <input
                            type="text"
                            value={fc.answer}
                            onChange={(e) => updateFlashcard(fc._id, { ...fc, answer: e.target.value })}
                        />
                        <button onClick={() => deleteFlashcard(fc._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;

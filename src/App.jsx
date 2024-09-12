import axios from 'axios';
import React, { useEffect, useState } from 'react';


const App = () => {
    const [quiz, setQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(''); // Make sure the default is an empty string
    const [score, setScore] = useState(0); // Track score
    const [quizCompleted, setQuizCompleted] = useState(false); // Track when the quiz is done

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios('https://the-trivia-api.com/v2/questions');
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        }
        getData();
    }, []);

    function nextQuestion() {
        if (selectedAnswer === '') {
            alert('Please select an answer before proceeding.');
        } else {
            // Check if the selected answer is correct
            if (selectedAnswer === quiz[index].correctAnswer) {
                setScore(score + 1);
            }

            // Move to next question or show results if quiz is done
            if (index < quiz.length - 1) {
                setIndex(index + 1);
                setSelectedAnswer(''); // Reset selected answer for next question
            } else {
                setQuizCompleted(true); // End of the quiz
            }
        }
    }

    function handleAnswerSelection(event) {
        setSelectedAnswer(event.target.value); // Set the selected answer from the input
    }

    return (
        <>
            <h1 className='text-5xl font-bold text-center mt-5 mb-20'>Quiz App</h1>

            {quizCompleted ? (
                <div className='text-center'>
                    <h2 className='text-4xl'>Quiz Completed!</h2>
                    <p className='text-2xl'>Your score is: {score} / {quiz.length}</p>
                    <p className='text-xl mt-4'>
                        {score >= quiz.length / 2 ? 'Congratulations! You passed!' : 'Better luck next time!'}
                    </p>
                </div>
            ) : (
                <div className='text-2xl m-2'>
                    {quiz.length > 0 ? (
                        <>
                            <h1>
                                Q{index + 1}: {quiz[index].question.text}
                            </h1>
                            <ul className='mt-5'>
                                {quiz[index].incorrectAnswers.map((incorrectAnswer, i) => (
                                    <li key={i}>
                                        <input
                                            type="radio"
                                            name='select'
                                            value={incorrectAnswer}
                                            onChange={handleAnswerSelection}
                                            checked={selectedAnswer === incorrectAnswer}
                                        /> {incorrectAnswer}
                                    </li>
                                ))}
                                <li>
                                    <input
                                        type="radio"
                                        name='select'
                                        value={quiz[index].correctAnswer}
                                        onChange={handleAnswerSelection}
                                        checked={selectedAnswer === quiz[index].correctAnswer}
                                    /> {quiz[index].correctAnswer}
                                </li>
                            </ul>
                        </>
                    ) : (
                        <h1>Loading...</h1>
                    )}
                    <div className='mt-5'>
                        <button className='btn btn-sm btn-success rounded-3xl px-6' onClick={nextQuestion}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}


export default App;



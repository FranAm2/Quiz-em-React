import React from 'react'
import './Welcome.css';
import quiz from '../img/quiz.svg';
import { useContext } from 'react';
import { QuizContext } from '../context/quiz';

const Welcome = () => {
    const [quizState, dispatch] =  useContext(QuizContext);
  
  return (
    <div id='welcome'>
        <h2>Seja bem vindo</h2>
        <p>Clique no botão abaixo para começar:</p>
        <button onClick={() => dispatch({type: "Change_State"})}>Iniciar</button>
        <img src={quiz} alt="Inicio do Quiz" />
    </div>
  )
}

export default Welcome
import React from 'react'
import './PickCategory.css';
import { useContext } from 'react';
import { QuizContext } from '../context/quiz';
import Category from '../img/category.svg'
import Question from './Question';

const PickCategory = () => {
    const [quizState, dispatch] = useContext(QuizContext);

    const chooseCategoryAndReorderQuestions = (category) =>{
        dispatch({type:"Start_Game", payload: category});

        dispatch({type:"Reorder_Questions"});
    }

  return (
    <div id='category'>
        <h2>Escolha uma categoria</h2>
        <p>As perguntas serão referentes a uma das linguagens abaixo:</p>
        <p>linguagens</p>
        <div>
            {quizState.questions.map((question) => (<button onClick={() => chooseCategoryAndReorderQuestions(question.category)} key={question.category}>{question.category}</button>))}
        </div>
        <img src={Category} alt="Categoria" />
    </div>
  )
}

export default PickCategory
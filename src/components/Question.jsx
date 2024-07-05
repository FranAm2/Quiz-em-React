import React from 'react';
import './Question.css';
import { useContext } from 'react';
import { QuizContext } from '../context/quiz';
import { Option } from './Option';


const Question = () => {
    const [quizState, dispatch] =  useContext(QuizContext);
    const currentQuestion = quizState.questions[quizState.currentQuestion];

    const onSelectOption = (option) =>{
      dispatch({
        type: "Check_Answer",
        payload: { answer: currentQuestion.answer, option },
      });
    }

  return (
    <div id='question'>
        <p>Pergunta de {quizState.currentQuestion + 1} de {quizState.questions.length}</p>
        <h2>{currentQuestion.question}</h2>
        <div id='options-container'>
        {currentQuestion.options.map((option) => (
          <Option option={option}
          key={option} 
          answer={currentQuestion.answer}
          selectOption={() => onSelectOption(option)} 
          hide={quizState.optionToHide === option ? "hide" : null}
          />))}
        </div>
        {!quizState.answerSelected && !quizState.help && (
          <>
            {currentQuestion.tip && (
             <button onClick={() => dispatch({type: "Show_Tip"})}>Dica</button> 
            )}
            <button onClick={() => dispatch({type: "Remove_Option"})}>Excluir uma</button>
          </>
        )}
        {!quizState.answerSelected && quizState.help === 'tip' && (<p>{currentQuestion.tip}</p>)
        }

        {quizState.answerSelected && <button onClick={(() => dispatch({type: "Change_Question"}))
        }>Continuar</button>}
    </div>
  )
}

export default Question
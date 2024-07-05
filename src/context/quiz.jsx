import { createContext, useReducer } from "react";
import questions from '../data/questions_complete';


const Stages = ["Start", "Category" , "Playing", "End"];
const initialStage = {
    gameStage: Stages[0],
    questions,
    currentQuestion: 0,
    score: 0,
    answerSelected: false,
    help: false,
    optionToHide: null
}

const quizReducer = (state, action) =>{
    switch(action.type){
        case "Change_State":
            return {
                ...state,
                gameStage: Stages[1],
            }
        case "Start_Game":
            let quizQuestions = null;
            state.questions.forEach((question) =>{
                if(question.category === action.payload){
                    quizQuestions = question.questions
                }
            });
            return{
                ...state,
                questions: quizQuestions,
                gameStage: Stages[2]
            }

        case "Reorder_Questions":
            const reorderedQuestions = state.questions.sort(() => {
                return Math.random() - 0.5;
            });
            return {
                ...state,
                questions: reorderedQuestions,
                
            };
        case "Change_Question":
            const nextQuestion = state.currentQuestion + 1;
            
            let endGame = false;
            if(!state.questions[nextQuestion]){
                endGame = true;   
            }
            return{
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endGame ? Stages[3] : state.gameStage,
                answerSelected : false,
                help: false,
            };
        case "New_Game":
            return initialStage;
        case "Check_Answer": {
                if (state.answerSelected) return state;
                const answer = action.payload.answer;
                const option = action.payload.option;
                let correctAnswer = 0;
                if (answer === option) correctAnswer = 1;
                return {
                  ...state,
                  score: state.score + correctAnswer,
                  answerSelected: option,
                };
            }
        case "Show_Tip":
            return{
                ...state,
                help: "tip"
            }
        case "Remove_Option":
            const questionWithoutOption = state.questions[state.currentQuestion];
            
            let repeat = true;
            let optionToHide 
            questionWithoutOption.options.forEach((option) =>{
                if(option !== questionWithoutOption.answer && repeat){
                    optionToHide = option;
                    repeat = false;
                }
            });
            return{
                ...state,
                optionToHide,
                help: true,
            }

        default:
            return state;
    }
}

export const QuizContext = createContext();

export const QuizProvider = ({children}) =>{
    const value = useReducer(quizReducer,initialStage);

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}
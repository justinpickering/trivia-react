import React from "react";
import "./index.css"

export default function App() {

  const [inGame, setInGame] = React.useState(false)

  const [triviaQuestions, setTriviaQuestions] = React.useState([])

  function startGame() {
    setInGame(true)
  }

  return (
    <div className="app">
      {inGame ? 
      
      
      null 
      : 
      <div className="start-quiz">
        <h1>Quizzical</h1>
        <button onClick={startGame}>Start Quiz</button>
      </div>
      }



    </div>
  );
}



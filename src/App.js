import React from "react";
import "./index.css";
import Questions from "./components/Questions";

export default function App() {
  const [inGame, setInGame] = React.useState(false);

  const [triviaQuestions, setTriviaQuestions] = React.useState([]);

  const [triviaAnswersHeldState, setTriviaAnswersHeldState] =
    React.useState([]);

  //useLayoutEffect instead of useEffect so it runs after the DOM mutations, and avoid double rendering
  React.useLayoutEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => setTriviaQuestions(data.results));
  }, []);

  // triviaQuestions.forEach(question => {
  //   console.log(question);
  // });

function startGame() {
  setInGame(true);
  const triviaAnswersHeld = test();
  setTriviaAnswersHeldState(triviaAnswersHeld);
  console.log(triviaAnswersHeld);
}

  //to decode html from api
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  const decodedQuestions = triviaQuestions.map((question) => ({
    ...question,
    question: decodeHtml(question.question),
    incorrect_answers: question.incorrect_answers.map((answer) =>
      decodeHtml(answer)
    ),
    correct_answer: decodeHtml(question.correct_answer),
  }));

  //to shuffle/randomize answers order in multiplechoice array (so correct answer is not always same position)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

function test() {
  const tester = decodedQuestions.map((question, index) => {
    const multipleChoiceAnswers = question.incorrect_answers;
    multipleChoiceAnswers.push(question.correct_answer);
    const multipleChoiceAnswersRandom = shuffleArray(
      multipleChoiceAnswers.map((answer) => ({
        answer,
        isHeld: false,
      }))
    );
    return multipleChoiceAnswersRandom;
  });
  return tester;
}

  const questionElements = decodedQuestions.map((question, index) => {
    return (
      <Questions
        question={question.question}
        multipleChoiceAnswersRandom={triviaAnswersHeldState[index]}
        correct_answer={question.correct_answer}
        key={index}
      />
    );
  });

  return (
    <div className="app">
      {inGame ? (
        <div>
          {questionElements}
          <button className="button1">Check Answers</button>
        </div>
      ) : (
        <div className="start-quiz">
          <h1>Quizzical</h1>
          <button className="button1" onClick={startGame}>
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
}

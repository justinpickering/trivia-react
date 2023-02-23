import React from "react";
import "./index.css";
import Questions from "./components/Questions";
import { nanoid } from "nanoid";

export default function App() {
  //decide if game is started or not
  const [inGame, setInGame] = React.useState(false);

  //holds all api data from question
  const [triviaQuestions, setTriviaQuestions] = React.useState([]);

  //will hold answers (randomized later) and will hold 'isHeld' and each an ID to display per component to the user
  const [triviaAnswersHeldState, setTriviaAnswersHeldState] = React.useState(
    []
  );

  const [choiceNotChosenError, setChoiceNotChosenError] = React.useState(false)

  function startGame() {
    setInGame(true);
    const triviaAnswersHeld = getAnswers();
    setTriviaAnswersHeldState(triviaAnswersHeld);
  }

  //creates new array using the triviaQuestions (Decoded), with answers in random order
  // each with a isHeld value and unique id
  function getAnswers() {
    //shuffles through 5 questions (index = 5)
    const answerArray = decodedQuestions.map((question) => {
      const multipleChoiceAnswers = question.incorrect_answers;
      multipleChoiceAnswers.push(question.correct_answer);
      const multipleChoiceAnswersRandom = shuffleArray(
        //shuffles through 4 answers per question
        multipleChoiceAnswers.map((answer) => ({
          answer,
          isHeld: false,
          id: nanoid(),
        }))
      );
      //return 4 element array of answers per question
      return multipleChoiceAnswersRandom;
    });
    //return whole 5 element array of questions
    return answerArray;
  }

  //api fetch to receive questions from database
  //useLayoutEffect instead of useEffect so it runs after the DOM mutations, and avoid double rendering
  React.useLayoutEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => setTriviaQuestions(data.results));
  }, []);

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

  //function initialized when clicked on a button per question component
  // sends unique button id (id), and questionIndex (whether it is question 1,2,3,4 or 5)
  function toggleAnswer(id, questionIndex) {
    //shuffle through the 4 answers from the specific question (use questionIndex here to specify exact question)
    // and to shuffle through only the answers from the question
    setChoiceNotChosenError(false)
    const updatedArray = triviaAnswersHeldState[questionIndex].map(
      (instance) => {
        //if already clicked, don't let unclick
        if (instance.id === id && instance.isHeld) {
          return {
            ...instance,
            isHeld: true,
          };
        }
        //if not clicked yet, change isHeld value . Conditional rendering of class in Questions component solves the styles
        if (instance.id === id) {
          return {
            ...instance,
            isHeld: !instance.isHeld,
          };
        }
        //makes so only 1 button per question can be 'isHeld === true'
        if (instance.id !== id && instance.isHeld) {
          return {
            ...instance,
            isHeld: false,
          };
        }
        //returns the whole instance to the updatedArray variable, we will use this lower. To update state.
        //updating state will let the user see the change since above we are just making a 'copy',
        //not actually doing anything to state
        return instance;
      }
    );

    //Now, we update state. It shuffle through the 5 elements. It will only update the related element
    // at the specific index by comparing with question Index. The rest of the elements at other index
    // stay the same, hence the else section
    setTriviaAnswersHeldState((prevState) => {
      return prevState.map((instance2, index) => {
        if (index === questionIndex) {
          return updatedArray;
        } else {
          return instance2;
        }
      });
    });
  }

  function checkAnswers() {

    setChoiceNotChosenError(false);

    // for (let i = 0; i < triviaAnswersHeldState.length; i++) {
    //   if (triviaAnswersHeldState[i].every((answer) => !answer.isHeld)) {
    //     console.log("All answers are false!");
    //     setChoiceNotChosenError(true)
    //     return;
    //     // do something if all answers are false
    //   }
    // }
    
    triviaAnswersHeldState.forEach((answer, index) => {
      if (answer.every((instance) => !instance.isHeld)) {
        console.log("All answers are false!");
        setChoiceNotChosenError(true);
        return;
      }
    })
    if (choiceNotChosenError === false) {
      console.log(triviaAnswersHeldState)
      const fart = "Fart"
    }
  }

  //shuffles through the questions which will be used to render 5 instances of Questions component
  const questionElements = decodedQuestions.map((question, index) => {
    return (
      <Questions
        question={question.question}
        multipleChoiceAnswersRandom={triviaAnswersHeldState[index]}
        correct_answer={question.correct_answer}
        key={index}
        id={index}
        toggleAnswer={toggleAnswer}
      />
    );
  });

  return (
    <div className="app">
      {inGame ? (
        <div>
          {questionElements}
          <button className="button1" onClick={checkAnswers}>
            Check Answers
          </button>
          {choiceNotChosenError ? (
            <span>
              <h3 className="choice-not-chosen">
                Please select an answer for each question before checking answers
              </h3>
            </span>
          ) : (
            ""
          )}
        </div>
      ) : (
        //if inGame is false, render start page
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

import React from "react";

export default function Questions(props) {
  let styles = {};
  console.log(props.multipleChoiceAnswersRandom);
  const multipleChoiceElements = props.multipleChoiceAnswersRandom.map(
    (answer) => {
      const isHeldColor = answer.isHeld ? "isHeldColor" : "";

      if (props.checkAnswerState) {
        if (props.correct_answer === answer.answer) {
          console.log("yes");
          styles = {
            backgroundColor: "#94D7A2",
              border: "transparent",
            fontWeight: "bold"
          };
        } else if (
          answer.isHeld === true &&
          props.correct_answer !== answer.answer
        ) {
          styles = {
            backgroundColor: "#F8BCBC",
            border: "transparent",
            color: "#293264",
          };
        } else {
          console.log("no");
          styles = {
            color: "#4D5B9E",
          };
        }
      }

      return (
        <button
          className={`answer-text ${isHeldColor}`}
          style={styles}
          onClick={() => props.toggleAnswer(answer.id, props.id)}
        >
          {answer.answer}
        </button>
      );
    }
  );

  // console.log(multipleChoiceElements)
  return (
    <div className="question-element">
      <div className="question-text">{props.question}</div>
      <div className="multiple-choice">{multipleChoiceElements}</div>
      <hr className="line"></hr>
    </div>
  );
}

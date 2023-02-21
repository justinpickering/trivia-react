import React from "react";
import App from "../App"

export default function Questions(props) {



    const multipleChoiceElements = props.multipleChoiceAnswersRandom.map((answer, index) => {
        return(

                <button className="answer-text" onClick={()=>{props.holdAnswer(index)}}>
                    {answer.answer}
                </button>
        )
    })

    // console.log(multipleChoiceElements)
    return(
        <div className="question-element">
            <div className="question-text">
                {props.question}
            </div>
            <div className="multiple-choice">
                {multipleChoiceElements}
            </div>
            <hr className="line"></hr>
            
        </div>
    )
}
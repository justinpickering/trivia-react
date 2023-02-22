import React from "react";
import App from "../App"

export default function Questions(props) {

    console.log(props)
    
    

    const multipleChoiceElements = props.multipleChoiceAnswersRandom.map(answer => {

        const isHeldColor = answer.isHeld ? "isHeldColor" : "";

        return(

            <button className={`answer-text ${isHeldColor}`} onClick={()=>props.toggleAnswer(answer.id, props.id)}>
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
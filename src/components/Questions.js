import React from "react";
import App from "../App"

export default function Questions(props) {

    console.log(props)

    const multipleChoiceElements = props.multipleChoiceAnswersRandom.map(answer => {
        return(
                <button>
                    {answer}
                </button>

        )
    })

    // console.log(multipleChoiceElements)
    return(
        <div>
            <div>
                {props.question}
            </div>
            {multipleChoiceElements}
        </div>
    )
}
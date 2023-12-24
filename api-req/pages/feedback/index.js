import React from 'react'
import { buildFeedbackPath, extractFeedback} from '../api/feedback'

const feedbackPage = (props) => {
  return (
    <div>
        {props.loadedFeedbacks.map((item) => (
            <li key={item.id}>{item.feedback}</li>
        ))}
    </div>
  )
}

export async function getStaticProps () {
    
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    return {
        props: {    
            loadedFeedbacks: data
        },
    };
}

export default feedbackPage
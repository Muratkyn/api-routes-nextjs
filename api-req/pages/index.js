import { useRef, useState } from "react"


export default function Home() {
  const [loadedFeedbacks, setLoadedFeedbacks] = useState([])
  const emailRef = useRef()
  const feedbackRef = useRef()

  const submitHandler = (event) => {
  event.preventDefault();

  const enteredEmail = emailRef.current.value;
  const enteredFeedback = feedbackRef.current.value;

  const reqBody = {
    email: enteredEmail,
    feedback: enteredFeedback
  }

  fetch('/api/feedback', {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: {
      'Content-Type': 'application/json'
      }, 
    })
      .then((response) => response.json())
      .then((data) => console.log(data))

    
  }
  const loadFeedbackHandler = () => {
    fetch('/api/feedback')
        .then((response) => response.json())
        .then((data) => {
          setLoadedFeedbacks(data.feedback)
        })
    }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>

      <form onSubmit={submitHandler} style={{margin:'150px', display:'flex', flexDirection:'column', width:'300px'}}>
      <h1>Send Feddback!</h1>
        <label>email</label>
        <input ref={emailRef}></input>
        <label>feedback</label>
        <textarea ref={feedbackRef} title='feedback' rows={10} ></textarea>
        <button  style={{width:"100px", marginTop:'10px'}}>Submit</button>
        <hr />
      <button onClick={loadFeedbackHandler} style={{width:"100px", marginTop:'10px'}}>Load Feedback</button>
      {loadedFeedbacks.map((item) => (
          <li key={item.id}>{item.feedback}</li>
      ))}
      </form>
      

    </div>
  )
}

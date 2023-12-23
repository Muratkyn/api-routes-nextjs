import fs from 'fs'
import path from 'path'


function buildFeedbackPath  () {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

function extractFeedback (filePath) {
  const fileData = fs.readFileSync(filePath)
  const data = JSON.parse(fileData)
  return data;
}

function handler(req, res) {
  if( req.method === "POST" ) {
     const email = req.body.email
     const feedback = req.body.feedback

     const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback
     }
     const filePath = buildFeedbackPath() //construct that path
     const data = extractFeedback(filePath)
     data.push(newFeedback) // we push in that array in the json file
     fs.writeFileSync(filePath, JSON.stringify(data)) // and we write that file 
     res.status(201).json({message: "success!", feedback: newFeedback})
  } else {
    const filePath = buildFeedbackPath() 
    const data = extractFeedback(filePath)
    res.status(200).json({ feedback: data })
}}

export default handler;

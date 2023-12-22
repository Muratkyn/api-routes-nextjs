import fs from 'fs'
import path from 'path'

function handler(req, res) {
  if( req.method === "POST" ) {
     const email = req.body.email
     const feedback = req.body.feedback

     const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback
     }
     //store in the file or database
     const filePath = path.join(process.cwd(), 'data', 'feedback.json' ) //construct that path
     const fileData = fs.readFileSync(filePath) //read that file
     const data = JSON.parse(fileData) //convert to js object to work with it
     data.push(newFeedback) // we push in that array in the json file
     fs.writeFileSync(filePath, JSON.stringify(data)) // and we write that file 
     res.status(201).json({message: "success!", feedback: newFeedback})
  } else {
  res.status(200).json({ name: 'John Doe' })
}}

export default handler;

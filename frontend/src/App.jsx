import { useState } from 'react'
import './App.css'



function App() {
  const [input, setInput] = useState("")
  const [submitTxt, setSubmitTxt] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
      }),
    });
    const data = await response.json();
    setSubmitTxt(data.text);
    setInput("");
  }


  return (
    <>
      <h1>Text and Image Chat</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} placeholder="What do you say?" onChange={(e) => setInput(e.target.value)} />
        <button type="submit" >
          Submit
        </button>
      </form>
      {submitTxt && (<p>{submitTxt}</p>)}
    </>
  )

}
export default App

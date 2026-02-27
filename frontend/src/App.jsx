import { useState } from 'react'
import './App.css'



function App() {
  const [input, setInput] = useState("What is in this image?")
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState([])

  async function handleSubmit(e) {
    e.preventDefault();
    const userInput = input;
    setIsLoading(true)
    // setChatHistory([...chatHistory, { prompt: input, image: image }])
    setChatHistory(prev => [...prev, { role: "user", text: userInput }]);
    const formData = new FormData();
    formData.append("prompt", userInput);
    if (image) {
      formData.append("image", image);
    }
    const response = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    //setChatHistory([...chatHistory, { prompt: data.answer }])
    setChatHistory(prev => [...prev, { role: "system", text: data.answer }]);


    setInput("");
    setImage(null);
    setIsLoading(false)
  }


  return (
    <>
      <h1>Text and Image Chat</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} placeholder="What is in this image?" onChange={(e) => setInput(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit" disabled={isLoading}>{isLoading ? "Sending..." : "Submit"}</button>
      </form>
      {isLoading && <p>Processing...</p>}
      {chatHistory.map((chat, index) => (
        <div key={index}>
          <p>{chat.role}: {chat.text}</p>
          {/* {chat.image && <img src={URL.createObjectURL(chat.image)} alt="" />} */}
        </div>
      ))}
    </>
  )

}
export default App

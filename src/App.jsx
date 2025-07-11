import { useState } from 'react'

import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)



  const generateImage= async()=>{
    if(!prompt) return;

    setLoading(true);
   setResult('');
  try {
    const response = await fetch('http://localhost:5000/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    if (data.url) {
      setResult(data.url);
    } else {
      setResult('');
      console.error('No image URL returned:', data);
    }
    } catch (error) {
      console.error("Error generating image:", error);
      setResult('');
    }
    setLoading(false);
  }

  return (
    <>
      <div className="App">
        <h1>AI Image Generator</h1>
        {loading ? (
          <h2> Image generation in progress...</h2>):(<></>)
        }
        <div className="card">
          <textarea
          className="text-input"
          placeholder="Enter your prompt here"
          onChange={(e)=>setPrompt(e.target.value)}
          row="5"
          cols="50"/>
          <div className="button-container">
          <button className="button" onClick={generateImage}>generate an image</button>
          </div>
          {result.length>0 ? (
            <img className="result-img" src={result} alt="generate image"/>):(<></>)}
        </div>
      <p className="read-the-docs">
        Powered by OpenAI
      </p>
      </div>
    </>
  )
}

export default App;

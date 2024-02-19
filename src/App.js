
//to run this: npm run start:frontend
import { useState, useEffect } from "react"


// continue tutorial from here: "https://youtu.be/JJ9fkYX7q4A?si=oo5ZmZ6p_8h174f1&t=3184"

const App =() => {
  const [value, setValue] = useState(null)
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats ] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try{
        const response = await fetch('http://localhost:8000/completions', options)
        const data = await response.json()
        setMessage(data.choices[0].message)

    }catch (error){
      console.error(error)
    }
  }


  useEffect(() =>{
    console.log(currentTitle, value, message)
    if(!currentTitle && value && message){
      setCurrentTitle(value)
    }
    if(currentTitle && value && message){
      setPreviousChats(prevChats => ( //how to update an array using useState
        [...prevChats, 
          {
            title: currentTitle,
            role: "user",
            content: value
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content
          }
        ]
      ))
    }
  }, [message, currentTitle])

  console.log(previousChats)

  return (
    <div className="app">

      {/* ------------SIDE BAR----------------  */}
      <section className="side-bar">
        <button>+ New chat</button>
        <ul className="history">
          <li>test element</li>
        </ul>
        <nav>
            <p>Made by Ehiane</p>
        </nav>
      </section>

      {/* ------------Main----------------  */}
      <section className="main">
        {!currentTitle && <h1>EhianeGPT</h1>}
        <ul className="feed">

        </ul>
        <div className="bottom-section">
          
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessages}>➡️</div>
          </div>

          <p className="info">
            EhianeGPT Latest Version. Free Experiment Preview.
            My goal is to use this project in understanding AI systems and 
            hopefully building a useful GenAI project. Your feedback will help me improve
          </p>


        </div>
      </section>
    </div>
  );
}

export default App;

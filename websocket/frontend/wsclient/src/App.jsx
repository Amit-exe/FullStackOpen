import { use, useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [socket , setSocket] = useState(null)
  const [ messages, setMessages] = useState([])
  const [im,setIM] = useState('')

  useEffect(()=>{
    const socket = new WebSocket("ws://localhost:8080")
    socket.onopen= ()=>{
      console.log("connected");
      setSocket(socket)
      
    }
    socket.onmessage = (msg)=>{
console.log(`message recieved: ${msg.data}`);
      setMessages((m)=>[...m, msg.data])
    }

     return () => {
    socket.close(); 
  };
  },[])

  const handleSend = (e)=>{
      socket.send(im)
      setIM('')
  }

  if(!socket)
    return <>Loading...</>
  return (
    <>
    <input value={im} onChange={(e)=>setIM(e.target.value)}/>
    <button onClick={handleSend}>send</button>
    <ul>
      {messages.map((m,i)=><li key={i} >{m}</li>)}
    </ul>
     
    </>
  )
}

export default App

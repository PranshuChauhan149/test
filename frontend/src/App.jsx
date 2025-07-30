import React from 'react'
import Message from './components/Message'
import Show from './components/Show'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [all, setAll] = useState([]);
    const [count,setCount] = useState(0); 

    const getAllMessage = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/create/all", {
        withCredentials: true,
      });
      if (res.data.ress && res.data.ress) {
        setAll(res.data.ress); // assuming your backend sends { messages: [...] }
        console.log(res.data.ress);
      }
    } catch (error) {
      console.log("error in getAllMessage", error);
    }
  };
  useEffect(()=>{
getAllMessage();
  },[count])
  return (
    <div>App
      <div>
        <Message setCount={setCount} count={count}/>
        <Show all={all} />
      </div>
    </div>
  )
}

export default App
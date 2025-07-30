import React, { useState } from 'react';
import axios from "axios"

const Message = ({setCount,count}) => {
  const [value, setValue] = useState('');

  const handleBtn = async()=>{
    try{
      const res = await axios.post("http://localhost:8000/api/create/message",{message:value},{withCredentials:true})
      if(res){
        setCount(count+1)        
      }
    }
    catch(error){
      console.log("error in create Message");
      
    }
  }
  


 
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={handleBtn}>Submit</button>
    </div>
  );
};

export default Message;

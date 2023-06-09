import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './SingUp.css';
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./Firebase"


export default function SingUp() {

  const naviget = useNavigate();
  const [value, setValue] = useState({
    name : "",
    email: "",
    password: ""
  })

  const [error, setError] = useState("");
  const [submitButtonDis, setSubmitButtonDis]= useState(false)

  const HandelSubmission =async (e) =>{
      e.preventDefault() 
      const{email,name}=value;

    if (!value.name || !value.email || !value.password) {
      setError("fill all fields");
      return;
    }
    setError("")
    console.log(value);

    setSubmitButtonDis(true)

    createUserWithEmailAndPassword(auth, value.email, value.password).then(async(res)=>{
      setSubmitButtonDis(false);
      const user = res.user;
      await updateProfile(user,{
        displayName:value.name
      })
      console.log(user);
    naviget("/login")

    })
    .catch((err)=>{
      setSubmitButtonDis(false);
      setError(err.message);
    })

    const res = await fetch("https://fairbas-auth-1-default-rtdb.firebaseio.com/userSingup.json",{
      method: 'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        email,
        name
      })
    })
  };

  return (
    <div className='container'>
        <div className='inner-box'>
          <h1 className='heading'>SingUp</h1>
          <label>
            Name:
          <input type='text' placeholder='enter your Namne' onChange={(e)=>{
            setValue((prev)=>({...prev , name: e.target.value}))
          }} />
          </label>
          <label>
            Email:
          <input type='text' placeholder='enter your email' onChange={(e)=>{
            setValue((prev)=>({...prev , email: e.target.value}))
          }}/>
          </label>
          <label>
            Password:
          <input type='password' placeholder='enter your password'onChange={(e)=>{
            setValue((prev)=>({...prev , password: e.target.value}))
          }}/>
          </label>
          <div className='btn'>
            <b className='err'>{error}</b>
            <button onClick={HandelSubmission} disabled={submitButtonDis}>SingUp</button>
            <p>
              Already have an Account?{''}
              <span>
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
    </div>
  )
}

import React, { useEffect, useState }  from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from "./Firebase"
import { signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup,GoogleAuthProvider , signInWithRedirect} from "firebase/auth";



export default function Login() {


  const naviget = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState("");
  const [submitButtonDis, setSubmitButtonDis]= useState(false)

  const HandelSubmission = async(e) =>{
        e.preventDefault()
        const{password,email}=value;

    if ( !value.email || !value.password) {
      setError("fill all fields");
      return;
    }
    setError("")
    console.log(value);

    setSubmitButtonDis(true)

    signInWithEmailAndPassword(auth, value.email, value.password).then(async(res)=>{
      setSubmitButtonDis(false);
      localStorage.setItem("email",res.user.email);

     naviget("/")

    })
    .catch((err)=>{
      setSubmitButtonDis(false);
      setError(err.message);
      console.log(setError);
    })

    const res = await fetch("https://fairbas-auth-1-default-rtdb.firebaseio.com/userform.json",{
      method: 'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        password,
        email
      })
    })
  };

  //google login

  const loginGoogle = () =>{
    signInWithPopup(auth, provider)
    .then((res) => {
          setValue(res.user.email)
          localStorage.setItem("email",res.user.email);


    }).catch((error) => {

    });
  }

  useEffect(()=>{
    setValue(localStorage.getItem('email'))
  },[])
  return (
    <>
    <div className='container'>
        <div className='inner-box'>
          <h1 className='heading'>Login</h1>
          <label>
            Email:
          <input type='text'  placeholder='enter your email'  onChange={(e)=>{
            setValue((prev)=>({...prev , email: e.target.value}))
          }}/>
          </label>
          <label>
            Password:
          <input type='password'   placeholder='enter your password'  onChange={(e)=>{
            setValue((prev)=>({...prev , password: e.target.value}))
          }}/>
          </label>
          <div className='btn'>
          <b className='err'>{error}</b>
            <button onClick={HandelSubmission} disabled={submitButtonDis}>Login</button>
            <p className='p-or'>or</p>
              <button className='gogl' onClick={loginGoogle}>Google</button>
            </div>
            <p>
              Don't have an Account?{''}
              <span>
                <Link to="/singup">SingUp</Link>
              </span>
            </p>
          </div>
          </div>  
   
  </>
  )
}

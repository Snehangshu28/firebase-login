import React, { useEffect, useState }  from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider, database } from "./Firebase"
import { signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup,GoogleAuthProvider , signInWithRedirect} from "firebase/auth";
import LinearIndeterminate from './mui/LinearIndeterminate';
import { ref, set } from "firebase/database";
import { useLocalStorage } from '../hooks/useLocalStorage';



export default function Login() {

  const [user, setUser] = useLocalStorage();


  const naviget = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: ""
  })
 
  const [error, setError] = useState("");
  const [submitButtonDis, setSubmitButtonDis]= useState(false)

  const updateUserCollection = ({displayName, uid, email, photoURL}) => {
    const userData = {
      uid,
      displayName,
      email,
      photoURL,
      lastLogin: Date.now(),
      loggedin: true
    }
    set(ref(database, 'userLogin/' + uid), userData).then(() => {
      setUser(userData)
    })
  }

  useEffect(()=>{
    if(user){
    naviget('/')
    }
  },[user])

  


  const HandelSubmission = async(e) =>{
    e.preventDefault()

    if ( !value.email || !value.password) {
      setError("fill all fields");
      return;
    }
    setError("")
    setSubmitButtonDis(true)

    signInWithEmailAndPassword(auth, value.email, value.password).then(async(res)=>{
      setSubmitButtonDis(false);
      localStorage.setItem("email", value.email);
      updateUserCollection(res.user)
    })
    .catch((err)=>{
      setSubmitButtonDis(false);
      setError(err.message);
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
       <div className='lineindeter'>
          <LinearIndeterminate/>
       </div>
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
            <button onClick={HandelSubmission} disabled={submitButtonDis} use={HandelSubmission}>Login</button>
            <p className='p-or'>or</p>
              <button className='gogl' onClick={loginGoogle} >Google</button>
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

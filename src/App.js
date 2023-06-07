import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SingUp from './components/SingUp';
import About from './components/About';
import { useEffect, useState } from 'react';
import { auth } from './components/Firebase';
import Contact from './components/Contact';

function App() {
  const [userName, setUserName] = useState("")
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if (user) {
        setUserName(user.displayName)
      }else{
        setUserName("")
      }
    })
  })


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/log' element={<Home name={userName}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/singup' element={<SingUp/>}/>
        <Route path='/' element={<About name={userName}/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

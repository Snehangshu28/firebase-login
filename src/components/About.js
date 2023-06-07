import React from 'react';
import "./About.css";
import { auth } from "./Firebase"
import { signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import logo from "./hand.png";



export default function About() {

    const naviget = useNavigate();

    const deleteUser = () => {
        console.log("click");
        signOut(auth).then(() => {
            // Sign-out successful.
        naviget("/") 

        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <>
         <div className='nav-bar'>
            <div className='logo'><img className='logo-png' src={logo}/></div>
            <div><input type='text'/><button>search</button></div>
            <div className='obj'>
                <div>profile</div>
                <Link to="/contact"><div className='cnt'>contact us</div></Link>
                <Link to="/login"><div className='cnt'>log-in</div></Link> 
               {/* <div className='profile' onClick={deleteUser}>Log-Out</div> */}
            </div>
        </div>
        <div>
        </div>
        </>
    )
}

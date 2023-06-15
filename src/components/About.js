import React, { useEffect, useState } from 'react';
import "./About.css";
import { auth, database } from "./Firebase"
import { signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import logo from "./hand.png";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExtensionIcon from '@mui/icons-material/Extension';
import SchoolIcon from '@mui/icons-material/School';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PeopleIcon from '@mui/icons-material/People';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import AccountMenu from './mui/AccountMenu';
import ChatBox from './chatBox/ChatBox';


export default function About(props) {

    const [openBox, setOpenBox] = useState(true);

    const naviget = useNavigate();

    

    const deleteUser = () => {
        console.log("click");
            signOut(auth).then(() => {
                // Sign-out successful.
                naviget("/login") 
                
            }).catch((error) => {
                // An error happened.
            });
    }


    const listedUser = () =>{
        console.log("click");
        setOpenBox(false)
    }


    return (
        <>
         <div className='nav-bar'>
            <div className='logo'><img className='logo-png' src={logo}/></div>
            <div className='ser-box'>
                <input className='serch-input' type='text'/>
                <button className='ser-btn'><SearchIcon/></button>
            </div>
            <div className='obj'>
                <Link to="/login"><div className='cnt'>log-in</div></Link> 
               <div className='profile-logout' onClick={deleteUser}>Log-Out</div>
               <div><AccountMenu/></div>
            </div>
        </div>
        <div className='main-container'>
            <div className='game-type'>
               <li><PlayArrowIcon/> Play</li>
               <li><ExtensionIcon/> Puzzles</li>
               <li><SchoolIcon/> Learn</li>
               <li><TheaterComedyIcon/> Watch</li>
               <li><NewspaperIcon/> News</li>
               <li><PeopleIcon/> Social</li>
               <li><MoreHorizIcon/> more</li>
            </div>
            <div className='game-list'>
            <div className="grid-container">
                    <div className="grid-item">1</div>
                    <div className="grid-item">1</div>
                    <div className="grid-item">1</div>  
                    <div className="grid-item">1</div>
                    <div className="grid-item">1</div>
                    <div className="grid-item">1</div>  
                    <div className="grid-item">1</div>
                    <div className="grid-item">1</div>
                    <div className="grid-item">1</div>  
            </div>
            </div>
            <div className='login-user'>
               <ChatBox/>
            </div>
          
        </div>
     </>
    )
}

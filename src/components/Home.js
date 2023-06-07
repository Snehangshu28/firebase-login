import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom'

export default function Home(props) {
  return (
    <div className='container'>
        <div>
            <h1 className='log'>
                <Link to="/login">Login</Link>
            </h1>
            <h1 className='sing'>
            <Link to="/singup">SingUp</Link>
            </h1>
        </div>
        <h2 className='caption'>{props.name ? `welcome - ${props.name}` : "login please"}</h2>
    </div>
  )
}

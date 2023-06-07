import React from 'react'
import "./Contact.css";

export default function Contact() {
  return (
    <div> 
      <div className='container1'>
        <div className='inner-box1'>
          <h1 className='heading1'>Contact Us</h1>
          <label>
            Name:
          <input type='text' placeholder='enter your Namne' />
          </label>
          <label>
            Email:
          <input type='text' placeholder='enter your email'/>
          </label>
          <label>
            Number:
          <input type='number' placeholder='enter your phone No.'/>
          </label>
          <div className='btn1'>
            <button>Submit</button>
          </div>
        </div>
    </div>
    </div>
  )
}

import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets.js'

function Footer() {
  return (
    <div className='footer' id='contact'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.app_logo} />
          <p>Feel free to reach us in our social media platforms. Use the links below</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon}/>
            <img src={assets.twitter_icon}/>
            <img src={assets.linkedin_icon}/>
          </div>
        </div>
        <div className="footer-content-center">
          <h3>COMPANY</h3>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Private policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h3>GET IN TOUCH</h3>
          <ul>
            <li>+25471962372</li>
            <li>namoyo302@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <small className='footer-copyright'>Copyright 2025 @ Postly.com - All Right Reserved</small>
    </div>
  )
}

export default Footer
import React, { Component } from 'react';
import {Link } from 'react-router-dom'; 
import UserNavBar from './PagesNavbar'
import './PagesStyle.css'




class Aboutus extends Component {
    constructor(props) {
        super(props);
     
        
    }

    
   
    render() {
        return (
<div >
    <UserNavBar></UserNavBar>
    
    
    <h1 style={{color:'#ffffff'}}>Family Match</h1>
    <div className="container">
        <div className="col-md-9">      <div id="LinksContainer">
            <br/>
            <br/>
            <br/>
<h1 >Site Map</h1>  
<hr></hr>
<br/>
</div>
<p>Member Login- <a href="#">http://familymatch.com/login</a><br/>

Register- <a href="#">http://familymatch.com/login</a><br/>
Get Started -<a href="#">http://familymatch.com/login</a> </p>

<p>Privacy and security -<a href="#">http://familymatch.com/page/privacy-and-security</a> <br/>
Privacy policy Template <a href="#">https://privacypolicytemplate.net/</a><br/>
Policy on Cookies - <a href="#">http://familymatch.com/page/form</a><br/>
Terms and Conditions -<a href="#"> http://familymatch.com/page/terms-and-condition</a><br/>
Help/ FAQ -<a href="#">http://familymatch.com/page/faq</a> 
    <br/>
    

    How It Works -<a href="#">http://familymatch.com/page/how-it-works</a><br/>
    Matching Tips - <a href="#">http://familymatch.com/page/matching-tips</a><br/>
    Profile Assistance -<a href="#">http://familymatch.com/page/profile-assistance</a><br/>
 </p>
      </div>
      </div>
  
      </div>

);
}
}

export default Aboutus;
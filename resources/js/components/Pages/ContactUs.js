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
        <div className="col-md-10">      <div id="LinksContainer">
            <br/>
            <br/>
            <br/>
<h1 > <strong>Contact Us</strong></h1>  
<hr></hr>
<br/>
</div>


<p>We welcome everyone to contact us with any information that can help us better serve the families that count on us all<br/>
around the world. If there is anything that you would like to suggest that can make our FamilyMatch program better,<br/>
please do not hesitate to contact us!<br/>
 
    <hr></hr>

    Making family connections is what we do best. We are confident that with the voice of the community, we can perfect the <br/>
    experience that every family has upon their encounter with our organization. If you have any questions, comments,<br/>
    concerns, or would like to simply complement our efforts, please contact us via phone, mail or email. You can also shoot<br/>
    us a DM via Facebook, Instagram, and Twitter. Our team does the best to ensure that your voice is heard.<br/>
    <br/>
  <hr></hr>
  <strong>Contact Us : <a href="#">contact@familymatch.com</a></strong> <br/>
  <strong>For General Info : <a href="#">info@familymatch.com</a></strong> 
  <br/>
  <strong>Address: 3073 Lawrence Expressway, Santa Clara CA, 95051 email
</strong>
  </p>
  <div class="formconteiner">
      <div className="col-md-12">
  <form >
  <input type="text" id="name" name="firstname" placeholder="Your name.."/>
  <input type="text" id="emale" name="lastname" placeholder="Your Email.."/>
  <textarea id="subject" name="subject" placeholder="Feedback.." rows="5"  cols="100"/>
  
    
    {/* <input type="text" id="fname" name="firstname" placeholder="Your name.."/>

    <input type="text" id="lname" name="lastname" placeholder="Your Email.."/>

    <textarea id="subject" name="subject" placeholder="Feedback.." style="height:200px"></textarea>

    
    <input type="submit" value="Submit"/> */}
   <button type="button" class="    ">Submit</button>

  </form>
</div>
      </div>
      </div>
  </div>
  </div>

);
}
}

export default Aboutus;
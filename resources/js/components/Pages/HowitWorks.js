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
<h1 >How it Works</h1>  
<hr></hr>
<br/>
</div>
<p>Step 1: Create A Profile; 
<br/>Step 2: Fill Out Values & Characteristics Matching Survey; <br/>
Step 3: FamilyMatch's patented algorithm goes to work; and,<br/>
Step 4: Browse matching families and start planning family gatherings and events</p>
<hr></hr>
<p>Start by creating a FamilyMatch™ profile and remember a completed profile is easier to find a fitting Family connection<br/>
for. Then proceed to take the family survey where we will ask you a few questions about your values and characteristics<br/>
that we feel will help us find the best family match for your family.<br/>
   
   
    <br/>
    <hr></hr>

    Once you have made a Family profile our website will begin to analyze other families that we think your family would <br/>
    match with. We will present this to you in the recommended families tab along with recommended activities that you<br/>
    both enjoy.
  
  <br/>
  <hr></hr>

  You can also take the matching into your own hands by joining Family groups in your area, or by attending FamilyMatch™<br/>
  events and FamilyMatch™ sponsored playdates where we offer family friendly activities.<br/>
  
    <br/>
    <hr></hr>


    Once you have found a Family that you seem to click with you can share profiles with each other, or scan the QR code off<br/>
    of the FamilyMatch™ app and your families will be able to message each other, send invites to future FamilyMatch™<br/>
    events, invites to groups, send electronic birthday and holiday cards, and play games together on the FamilyMatch™ app<br/>
    (If you have children this ability can be turned on or off for the kids, as well as amount of time spent playing games or<br/>
   what types of games can all be controlled by the parental account, also a complete history of their messages and what
   <br/>
   they have been playing will be available for the parental accounts to view).
   <br/>

This is why we created FamilyMatch!</p>
      </div>
      </div>
  
      </div>

);
}
}

export default Aboutus;
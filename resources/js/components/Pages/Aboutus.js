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
<h1 >About FamilyMatch™</h1>  
<hr></hr>
<br/>
</div>
<p>FamilyMatch is the world’s first Web Service to develop a universal process where families can match
<br/>with other families! Parents can go well beyond their limited boundaries and be matched so families<br/>
can develop healthy social relations for their children and community.</p>
<hr></hr>
<p>FamilyMatch is founded, operated and driven by parents who are confronting the dramatic changes that<br/>
 our modern-day world forces upon us. This includes parents who have lived, worked, and even had their<br/>
  children enrolled in schools located in the United States, Australia, India, Pakistan, Dominican Republic, and<br/>
   England. Not only did they find it time-consuming and difficult to identify the right families to get together<br/>
    with, but they witnessed that around the globe, parents encounter the same issue.
    <br/>
    <br/>
    <br/>

Technology has changed the face and the nature of families more than ever. From children being <br/>
disconnected from the world and glued to their electronics; and from parents being overworked by their<br/>
 jobs. These demands isolate us from having the healthy physical connections that past families have<br/>
  enjoyed.
  <br/>
  <br/>
  <br/>

The Founders of FamilyMatch recognizes these issues that society forces upon families. Some of the<br/>
 founders even participated in the earliest matching systems since 2010 and have used that knowledge<br/>
  and experience to create FamilyMatch. We truly aim to dramatically improve a family's social and<br/>
   community life. We want to use technology for the better and connect families instead of allowing<br/>
    technology to further disconnect families.
    <br/>
    <br/>
    <br/>
FamilyMatch spent roughly 14 months conducting focus-group surveys to over 2,600 parents. According to<br/>
 the results, 98.3% of parents claimed that FamilyMatch is a matching service that they need to help them<br/>
  find suitable families with whom they can be matched with.
  <br/>
  <br/>
  <br/>

The Founders of FamilyMatch aim to use this technology to give families the control to expand their<br/>
 family's orbit with other families whim they would not otherwise be able to connect with. The system is<br/>
  currently in the prototype pre-beta stage! It is designed to accurately identify those who would be suitable<br/>
   for each other and to be a safer way for families to get together. Every family in our system is pre-<br/>
   screened and FamilyMatch does not give away private information (all information is secured).
   <br/>
   <br/>
   <br/>

This is why we created FamilyMatch!</p>
      </div>
      </div>
  
      </div>

);
}
}

export default Aboutus;
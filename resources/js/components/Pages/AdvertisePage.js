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
<h1 ><a href="#">Advertise on familymatch.com</a></h1>  
<hr></hr>
<br/>
</div>
<p>Want to reach the hundreds of individuals that roam through our website? By advertising through FamilyMatch, people
<br/>from all over the world will be exposed to your product. Please feel free to contact us for more information.<br/>
</p> <br/>
<hr></hr>
<p>

<strong>Phone: (408) 498-8045</strong><br/>
<strong>Email: contact@familymatch.com</strong><br/>
<strong>Address: 3073 Lawrence Expressway, Santa Clara CA, 95051</strong><br/> <br/>
<strong>Phone: (408) 498-8045</strong><br/>
<strong>Email: interns@familymatch.com</strong><br/>
<strong><a href="#">Facebook</a></strong>
    <br/>
    <br/>
    </p>
      </div>
      </div>
  
      </div>

);
}
}

export default Aboutus;
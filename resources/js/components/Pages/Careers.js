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
<h1 ><a href="#">Careers</a></h1>  
<hr></hr>
<br/>
</div>
<p>As our family grows in the heart of Silicon Valley, more career opportunities will soon emerge. Our family match program
<br/>always welcomes individuals that are eager to seek development in their professional career. We look for strong minded<br/>
individuals that hold the virtue of ‘Family’ as a pillar in their persona.</p> <br/>
<hr></hr>
<p>If you feel like you would like to contribute to the work that we do for families, please reach out to us. The following<br/>
positions are currently available:<br/>
<hr></hr>

<strong>Social Media Marketing expert</strong><br/>
<strong>Data Analyst</strong><br/>
<strong>Webpage designer</strong><br/> <br/>
<strong>Phone: (408) 498-8045</strong><br/>
<strong>Email: interns@familymatch.com</strong><br/>
    <br/>
    </p>
      </div>
      </div>
  
      </div>

);
}
}

export default Aboutus;
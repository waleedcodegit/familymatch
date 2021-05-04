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
            </div>
            
<h1 > Terms and Condition</h1>  
<hr></hr>
<p>This page will be published during our Beta testing phase.</p>
<br/>




  
      </div>
      </div>
      </div>
  
      

);
}
}

export default Aboutus;
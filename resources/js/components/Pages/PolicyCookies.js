import React, { Component } from 'react';
import {Link } from 'react-router-dom'; 
import UserNavBar from './PagesNavbar'
import CenterImage from '../../Images/form-bg.png';
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
        <div className="col-md-5">      <div id="LinksContainer">
           
            <img src={CenterImage}></img>
            <br/>
            <br/>
            <br/>
            
  
<hr></hr>

</div>
</div>
<p>At FamilyMatch™ our first and last efforts must be focused on the safety and security of all
<br/>participating families. We must authenticate every user in our system to do our best to<br/>
determine whether or not they are real people who are not only established in our community<br/>
but more importantly are safe for our families to interact with.

</p>
<hr></hr>
<p>Nonetheless, there are some users who may wish to go beyond our screening in order to have<br/>
further assurance that the families whom they interact with are of a certain character and so<br/>
we offer our families a discounted way to anonymously conduct background checks upon<br/>
those who they are matched with. NOTE: No user will receive personal or financial information<br/>
of another, but only a result indicating whether the proposed parent whom you are being<br/>
matched with has been reported as having violence or reports of violence or other crimes.<br/>


<br/>
Although we do not make it mandatory for parents to give the needed details for conducting<br/>
such a search, if a family whom you are matched with attempts to conduct background<br/>
check upon you and you have not provided sufficient information to conduct such, they will be<br/>
notified that you have not provided such and can then make the choice to forgo the<br/>
background check or send us a request to ask you provide such.
   </p>
   <br/>
   <br/>
   <br/>
   <button type="button" class="block">Click to here Authorize background clearance</button>
   <br/>
   <br/>
      </div>
      </div>
  
      

);
}
}

export default Aboutus;
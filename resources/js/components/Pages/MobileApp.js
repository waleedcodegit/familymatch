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
<h1 > <strong><a href="#">Mobile App</a></strong></h1>  
<hr></hr>
<br/>
</div>
<p>Our Android and iPhone Apps Will Be Here Soon. Stay Tune!
<br/></p>
<hr></hr>
<p>By downloading the FamilyMatch™ app to your mobile device, you won’t have to wait until you are at home to look for the<br/>
family that is most compatible with yours. The same algorithm that is used to give you suggestions for other families out<br/>
there on your laptop or PC can be used at the convenience of your fingertips. All we require you to do is confirm your.<br/>
mobile device by providing the same email that is used for your account.
   
    <br/>
    <hr></hr>

    A personalized password will be required upon the request of accessing your account via a mobile device. This is to <br/>
    ensure that is is truly you that is accessing the information that you entrusted us with. Here at FamilyMatch™, we<br/>
    understand the delicacy of the sensitive information that you provide and will stop at nothing to make sure that your<br/>
    information is secure. The safety features that are installed throughout our service is our way of saying thank you for<br/>
    putting your trust in our hands. <br/><br/><br/>
  <hr></hr>

  </p>
      </div>
      </div>
  
      </div>

);
}
}

export default Aboutus;
import React, { Component } from 'react';
import $ from 'jquery';
import LandingPage from './LandingPage'
import {Link} from 'react-router-dom'
import './HomeNavBar.css'
class HomeNavbar extends Component {
  constructor(props) {
    super(props);
    this.state={
      video:'Images/bg-vid.mp4'
    }
   
  }
  componentDidMount(){
    $(document).ready(function(){
      $(window).scroll(function (){
        if($(window).scrollTop()>250){
          $('nav').addClass('scrollUp');
        }else{
          $('nav').removeClass('scrollUp');
    
        }
      })
    })
  }
 //backgroundColor:'#fab7b7'
  render() {
    return (
      <div >
        <div style={{backgroundImage: "linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%)"}}>
        <nav style={{position:'fixed'}} className="navbar navbar-expand-md home-navbar-2  ">
            <a href="#" className="navbar-brand"><h1 className="Logo" style={{fontFamily:'enjoysummer'}}>FamilyMatch</h1></a>
            <button type="button" style={{color:'black'}} className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span  ><i className="fas fa-bars"></i></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
                {/* <div className="navbar-nav">
                    <a href="#" className="nav-item nav-link active">Home</a>
                    <a href="#" className="nav-item nav-link">Profile</a>
                    
                </div> */}
                <div className="navbar-nav ml-auto">
                    <Link to={'/login'}><button style={{borderRadius:'50px'}} className= " nav-item btn btn-outline-light">Member Login</button></Link>
                    <Link to={'/Register'}> <button style={{borderRadius:'50px'}} className=" nav-item btn btn-light ml-3">Register</button></Link>

                </div>
            </div>
        </nav>
        <div className="container-fluid">
            <video style={{backgroundImage: "linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%)"}} autoPlay={true} preload="metadata" loop id="video-background" muted playsInline>
                    <source src={this.state.video} type="video/mp4"/>
            </video>
            </div>
        </div>
      
            <LandingPage></LandingPage>

      </div>
    );
  }
}

export default HomeNavbar;
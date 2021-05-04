import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Auth.css';
import {Route} from 'react-router-dom'
class AuthNavBar extends Component {

  componentDidMount(){
    $(document).ready(function(){
      $(window).scroll(function (){
        if($(window).scrollTop()>20){
          $('nav').addClass('scrollUp');
        }else{
          $('nav').removeClass('scrollUp');
    
        }
      })
    })
  }
 
  render() {
    return (
      <div >
        <div >
            <nav style={{position:'fixed'}} className="navbar navbar-expand-md loginnav  ">
            <Link to={'/'} className="navbar-brand"><h1 id="logo" className="Logo" style={{fontFamily:'enjoysummer'}} >FamilyMatch</h1></Link>
                <button type="button" style={{color:'black'}} className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span  ><i className="fas fa-bars"></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ml-auto">
                        <Link to={'/login'}><button style={{borderRadius:'50px'}} className= " nav-item btn btn-outline-light">Member Login</button></Link>
                        <Link to={'/Register'}><button style={{borderRadius:'50px'}} className=" nav-item btn btn-light ml-3">Register</button></Link>
                    </div>
                </div>
            </nav>  
        </div>
      </div>
    );
  }
}

export default AuthNavBar;
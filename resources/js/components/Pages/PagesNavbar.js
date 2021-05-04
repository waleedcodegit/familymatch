import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../Auth/Auth.css';
import Axios from 'axios';
class UserNavBar extends Component {
    constructor(props) {
        super(props);
        
    }
    
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
  logout(){
    // history.push('/login');
    window.sessionStorage.setItem('key1','');
    this.props.history.push('/login');
  }
 
  render() {
    return (
      <div >
        <div >
            <nav style={{position:'fixed'}} className="navbar navbar-expand-md loginnav  ">
            <Link to={'/'} className="navbar-brand"><h1 id="logo" className="Logo">Family Match</h1></Link>
                <button type="button" style={{color:'black'}} className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span  ><i className="fas fa-bars"></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ml-auto">
                    <Link to={'/'}>  <button  style={{borderRadius:'50px'}} className= " nav-item btn btn-outline-light">Home</button></Link>
                    </div>
                </div>
            </nav>  
            
        </div>
      </div>
    );
  }
}

export default UserNavBar;
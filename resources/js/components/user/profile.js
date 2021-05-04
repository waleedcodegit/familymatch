import React, { Component } from 'react';
import UserNavbar  from './usernavbar'
import Axios from 'axios';
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Sidebar from './Profile_side_bar'
import {Route,Switch} from 'react-router-dom'
import Personel from './Personel'
import Aboutme from './Aboutme'
import Favorites from './Favorites'
import Likes from './Likes'
import Matchdata from './MatchData'
import Photo from './Photo'
import Views from './Views'
import Winks from './Winks'
import './user.css'
import {connect} from 'react-redux';
import Footer from '../Footer'

const user = [];
class profile extends Component {
    constructor(props) {
        super(props);
     this.state={
        user:[],
        auth:false
     }
        
    }
    componentDidMount(){

    }
   

    render() {
        return (
            <div id="profile_main_div">
             
                    <div className="mb-0">
                    {/* <UserNavbar {...this.props}></UserNavbar> */}
                    <h1 style={{color:'#ffffff'}}>Family Match</h1>
                    <div className="container">
                      <div  className=" row">
                        <div className="col-sm-3 ">
                          <div className="profile-sidebar-div">
                          <Sidebar></Sidebar>
                          </div>
                        </div>
                        <div className="col-md-9">
                        <Switch>
                        <Route exact path="/profile/my" component={Personel} type="public"></Route>
                        <Route  path="/profile/my/About-me" component={Aboutme} type="public"></Route>
                        <Route  path="/profile/my/favorites" component={Favorites} type="public"></Route>
                        <Route  path="/profile/my/likes" component={Likes} type="public"></Route>
                        <Route  path="/profile/my/match-data" component={Matchdata} type="public"></Route>
                        <Route  path="/profile/my/photo" component={Photo} type="public"></Route>
                        <Route  path="/profile/my/views" component={Views} type="public"></Route>
                        <Route  path="/profile/my/winks" component={Winks} type="public"></Route>
    
                        </Switch>
                        </div>
                      </div>
                    </div>
                 
                </div>
               

            </div>
          
        );
    }
}

export default profile;
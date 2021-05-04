import React, { Component } from 'react';
import Axios from 'axios';
import Sidebar from './profile_sidebar'
import {Route,Switch} from 'react-router-dom'
import Personel from './personal'
import Aboutme from './Aboutme'
import '../user.css'
import {connect} from 'react-redux';

const user = [];
class profile extends Component {
    constructor(props) {
        super(props);
     this.state={
        user:[],
        auth:false,
        username:this.props.match.params.username,
        user:[],
        display:false
     }        
    }
    componentDidMount(){
        let senderdata={
            username:this.props.match.params.username,
            access_token:window.localStorage.getItem('key1')
        }
        Axios.post('/api/get_user_by_username',senderdata).then(res=>{
            console.log(res);
            if(res.data==0){
                this.props.history.push('/PageNotFound')
            }else{
                this.setState({
                    user:res.data[0],
                    display:true
                })
            }
           
           
        })
    }
   

    render() {
        return (
            <div>
                {
                    this.state.display?
                        <div className="mb-0">
                        {/* <UserNavbar {...this.props}></UserNavbar> */}
                        <h1 style={{color:'#ffffff'}}>Family Match</h1>
                        <div className="container">
                        <div  className=" row">
                            <div className="col-sm-3">
                            <div className="profile-sidebar-div">
                            <Sidebar {...this.props} profile_user={this.state.user}></Sidebar>
                            </div>
                            </div>
                            <div className="col-md-8">
                            <Switch>
                            <Route exact path="/profile/:username/profile" render={()=><Personel   profile_user={this.state.user}/>}  type="public"></Route>
                            <Route exact path="/profile/:username/profile/About" render={()=><Aboutme  profile_user={this.state.user}/>}  type="public"></Route>

                            </Switch>
                            </div>
                        </div>
                        </div>
                    </div>
                    :
                    <div id="displayspinner" style={{display:'block',marginLeft:'45%',marginTop:'20%'}}>
                    <div className="spinner-border text-info ml-2" style={{width:'100px',height:'100px'}} role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
                   
            </div>
        );
    }
}

export default profile;
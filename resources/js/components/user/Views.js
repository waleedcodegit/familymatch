import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { img_base } from '../Configs/Env';

class Views extends Component {
    constructor(props) {
        super(props);
        this.state={
            views:[],
            uid:this.props.user.uid
        }
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key1'),
            user:this.state.uid
        }
        Axios.post('/api/getviews',senderdata).then(res=>{
            this.setState({
                views:res.data
            })
        })
    }
    
    render() {
        return (
            <div className="container">
                <div className="card content-card">
                    <p id="header-title">Views</p>
                    <p id="header-sub-title">People who viewed your profile.</p>
                    <div className="container">
                        {
                            this.state.views.map((data,index)=>{
                                return(
                                    <div className="row main_div" key={index}>
                                        <img className="profile_sm_img" src={img_base+data.profile_image}></img>
                                        <div className="ml-2 mt-3">
                                            <Link to={`/profile/${data.username}/profile`}><h6>{data.fname} {data.lname}</h6></Link>
                                        </div>
                                        <div className="datediv mt-3">
                                            <p>{data.created_at}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>        
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
export default  connect(mapStateToProps)(Views);  
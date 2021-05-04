import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { img_base } from '../Configs/Env';
class Winks extends Component {
    constructor(props) {
        super(props);
        this.state={
            winks:[],
            uid:this.props.user.uid
        }
    }
    
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key1'),
            user:this.state.uid
        }
        Axios.post('/api/getwinks',senderdata).then(res=>{
            this.setState({
                winks:res.data
            })
        })
    }
    render() {
        return (
            <div className="container">
                <div className="card content-card">
                    <p id="header-title">Winks</p>
                    <p id="header-sub-title">Lists of people winks at you</p>
                    <div className="container">
                        {
                            this.state.winks.map((data,index)=>{
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
export default connect(mapStateToProps)(Winks);
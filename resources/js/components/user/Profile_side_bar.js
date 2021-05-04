import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './user.css'
import Axios from 'axios'
import { isNull } from 'lodash';
import {connect} from 'react-redux';
import { img_base } from '../Configs/Env';

class Profile_side_bar extends Component {
    constructor(props) {
        super(props);
        this.state={
            fname:'',
            lname:'',
            seeking:'',
            gender:'',
            username:'',
            uid:this.props.user.uid,
            profile_img_url:img_base+'user.png'
        }
    }
    componentDidMount(){
        let user =  window.localStorage.getItem('key1');
        let senderdata = {
            access_token:user
        }
        Axios.post('/api/get_user_by_id/'+this.state.uid,senderdata).then(res=>{
            if(res.data == 0){

            }else{
                this.setState({
                    fname: res.data[0].fname,
                    lname: res.data[0].lname,
                    gender: isNull(res.data[0].gender) ? '1': res.data[0].gender,
                    seeking: isNull(res.data[0].seeking) ? '1' : res.data[0].seeking,
                    username:res.data[0].username,
                    profile_img_url:img_base +res.data[0].profile_image
                },function(){
                    if(isNull(this.state.fname) ){
                        this.setState({
                            fname:this.state.username,
                            lname:this.state.username
                        })
                    }
                })
            }
        })
    }

    
    render() {
        return (
            <div>
                <div className="card sidebar">
                    <div >
                        <div className="mt-4 ">
                            <img style={{width:'70%',height:'70%',margin:'0px auto',display:'block',borderRadius:'50%'}} src={this.state.profile_img_url}></img>
                        </div>
                        <div className="profile-usertitle-name">
                            {this.state.fname} {this.state.lname}
                        </div>
                        <div className="profile-user-gender">
                            {this.state.gender== "1" ? 'Man' : ''}
                            {this.state.gender== "2" ? 'Woman' : ''}
                            {this.state.gender== "3" ? ' Wife & Husband' : ''}
                            {this.state.gender== "4" ? 'Woman & Man' : ''} 
                            {this.state.gender== "5" ? 'family' : ''}
                            {this.state.gender== "6" ? 'father' : ''}
                            {this.state.gender== "7" ? 'mother' : ''}
                            {this.state.gender== "8" ? 'brother' : ''}
                            {this.state.gender== "9" ? 'sister' : ''}
                        </div>
                        <div className="profile-user-gender">
                            {this.state.seeking== "1" ? 'looking for Man' : ''}
                            {this.state.seeking== "2" ? 'looking for Woman' : ''}
                            {this.state.seeking== "3" ? 'looking for Wife & Husband' : ''}
                            {this.state.seeking== "4" ? 'looking for Woman & Man' : ''}
                            {this.state.seeking== "5" ? 'looking for family' : ''}
                            {this.state.seeking== "6" ? 'looking for father' : ''}
                            {this.state.seeking== "7" ? 'looking for mother' : ''}
                            {this.state.seeking== "8" ? 'looking for brother' : ''}
                            {this.state.seeking== "9" ? 'looking for sister' : ''}
                        </div>
                        <div className="profile-usermenu">
                            <ul className="nav" style={{display:'block'}}>
                                <li className='overview'>
                                    <Link to="/profile/my/">
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                        Personal</Link>
                                </li>
                                <li className='overview'>
                                    <Link to="/profile/my/About-me">
                                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                                        About Me </Link>
                                </li>
                                <li className='overview'>
                                    <Link to="/profile/my/match-data">
                                        <i className="fa fa-list-alt" aria-hidden="true"></i>
                                       Match Data </Link>
                                </li>
                                <li className='overview'>
                                    <Link to="/profile/my/photo">
                                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                                        Photo </Link>
                                </li>
                                <li className='overview'>
                                    <Link to="/profile/my/views">
                                        <i className="fa fa-group" aria-hidden="true"></i>
                                        Views </Link>
                                </li>
                                <li className='overview'>
                                    <Link to="/profile/my/likes">
                                        <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                        Likes  </Link>
                                </li>
                                <li className='overview'>
                                    <Link to="/profile/my/favorites">
                                        <i className="fa fa-heart-o" aria-hidden="true"></i>
                                        Favorites </Link>
                                </li>
                                <li className='overview'>
                                    <Link to="/profile/my/winks">
                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                        Winks </Link>
                                </li>
                            </ul>
                        </div>
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
export default connect(mapStateToProps)(Profile_side_bar);
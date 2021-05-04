import React, { Component } from 'react';
import Swal from 'sweetalert2'
import {connect} from 'react-redux';
import Axios from 'axios';
import {Link} from 'react-router-dom'
import { img_base } from '../../Configs/Env';
class Mutual extends Component {
    constructor(props) {
        super(props);
        this.state={
            matches:[],
            uid:this.props.user.uid
        }
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key1'),
            uid:this.state.uid,
            type:'Mutual'
        }
        Axios.post('/api/matches',senderdata).then(res=>{
            console.log(res);
            this.setState({
                matches:res.data
            })
        })
    }
    
    render() {
        return (
            <div className="container mt-5">
                <div className="content-card">
                    <p id="header-title">Mutual Matches</p>
                    <p id="header-sub-title">Here are the Some Matches According to your About Section.</p>

                    <div className="row col" >
                        {
                            this.state.matches.map((data,index)=>{
                                return(
                                    <div key={index} className="col-sm-3 mt-3" >
                                        <div className="results results_content_card ">
                                            <div className="search_profile_cover"></div>
                                            <img className="profile_img" style={{width:'150px',height:'150px',margin:'0px auto',display:'block',borderRadius:'50%'}} src={img_base+data.profile_image}></img>
                                            <div className="profile-usertitle-name">
                                            <Link to={`/profile/${data.username}/profile`}>{data.fname == null && data.lname == null ? data.username :data.fname } 
                                            { data.lname }</Link> 
                                            </div>
                                            <div className="profile-user-gender">
                                                {data.gender== "1" ? 'Man' : ''}
                                                {data.gender== "2" ? 'Woman' : ''}
                                                {data.gender== "3" ? ' Wife & Husband' : ''}
                                                {data.gender== "4" ? 'Woman & Man' : ''} 
                                            </div>
                                            <div className="profile-user-gender">
                                                {data.seeking== "1" ? 'looking for Man' : ''}
                                                {data.seeking== "2" ? 'looking for Woman' : ''}
                                                {data.seeking== "3" ? 'looking for Wife & Husband' : ''}
                                                {data.seeking== "4" ? 'looking for Woman & Man' : ''}
                                            </div>
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
export default connect(mapStateToProps)(Mutual);
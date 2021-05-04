import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../user.css'
import Axios from 'axios'
import { isNull } from 'lodash';
import {connect} from 'react-redux';
import Swal from 'sweetalert2'
import Pusher from 'pusher-js'
import Peer from 'simple-peer'
import './video.css'
import Mediahandler from './Mediahandler'
import {Modal} from 'react-bootstrap'
import { img_base } from '../../Configs/Env';

const App_Key = '97900d00d08711df9f6b';

class Profile_side_bar extends Component {
    constructor(props) {
        super(props);
        this.state={
            fname:'',
            lname:'',
            seeking:'',
            gender:'',
            username:'',
            // uid:this.props.user.uid,
            profile_img_url:img_base+'user.png',
            user:this.props.profile_user,
            uid:this.props.profile_user.id,
            login_user:this.props.user.uid,
            visible:0,
            visiblelike:0,
            display_modal:false,
            hasmedia:false,
            otherUserId:null,
            
        }

        this.stream = null;
        this.peers = {};
        this.mediahandler = new Mediahandler();
        window.sessionStorage.setItem('recipient',this.props.profile_user.id);
        // this.callTo = this.callTo.bind(this);
        this.setUpPusher = this.setUpPusher.bind(this);
        this.startPeer = this.startpeer.bind(this);
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
                    username:res.data[0].name,
                    profile_img_url:img_base +res.data[0].profile_image
                },function(){
                    // this.setUpPusher();
                    if(isNull(this.state.fname) ){
                        this.setState({
                            fname:this.state.username,
                            lname:this.state.username
                        })
                    }
                })
            }
        })
        let sender = {
            access_token:user,
            login_user:this.state.login_user,
            profile_user:this.state.uid
        }
        Axios.post('/api/get_wink_by_userid',sender).then(res=>{
            if(res.data != 0){
                this.setState({
                    visible:res.data[0].visible
                })
            }
        })
        let senderlikes = {
            access_token:user,
            login_user:this.state.login_user,
            profile_user:this.state.uid

        }
        Axios.post('/api/get_like_by_userid',senderlikes).then(res=>{
            if(res.data != 0){
                this.setState({
                    visiblelike:res.data[0].visible
                })
            }
        })
        let senderview = {
            access_token:user,
            viewer:this.state.login_user,
            profile_uid:this.state.uid
        }
        Axios.post('/api/add_profile_view',senderview).then(res=>{

        })
       

    }
    setUpPusher(){
        // Pusher.logToConsole = true;
        this.pusher = new Pusher(App_Key ,{
            authEndpoint:'/api/pusher/auth/'+this.state.login_user+'/'+this.state.username,
            cluster:'ap2',
            auth:{
                params:this.state.login_user,
                headers:{
                    'X-CSRF-Token':window.csrfToken
                }
            }
        });

        this.channel = this.pusher.subscribe('presence-video-channel');

        this.channel.bind(`client-signal-${this.state.login_user}`,(signal) =>{
            let peer = this.peers[signal.userId];
            if(peer === undefined){
               
                this.setState({otherUserId:signal.userId});
                peer = this.startpeer(signal.userId , false);
            }

            peer.signal(signal.data);
        })
    }
    startpeer(userId , initiator = true ){
        const peer = new Peer({
            initiator,
            stream:this.stream,
            trickle:false
        })

       
        this.setState({display_modal:true})
        peer.on('signal', (data) => {
            this.channel.trigger(`client-signal-${userId}`, {
                type: 'signal',
                userId: this.state.login_user,
                data: data
            });
        });

        peer.on('stream', (stream) => {
            try {
                this.uservideo.srcObject = stream;
            } catch (e) {
                this.uservideo.src = URL.createObjectURL(stream);
            }

            this.uservideo.play();
        });

        peer.on('close', () => {
            let peer = this.peers[userId];
            if(peer !== undefined) {
                peer.destroy();
            }

            this.peers[userId] = undefined;
        });

        return peer;
    }

    wink(){
        let senderdata = {
            access_token:window.localStorage.getItem('key1'),
            user_id:this.state.uid,
            winker:this.state.login_user,
            visible: !this.state.visible
        }
        this.setState({
            visible:!this.state.visible
        })
        Axios.post('/api/wink',senderdata).then(res=>{
            if(res.data.visible){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your Winked That Person',
                    showConfirmButton: false,
                    timer: 1000
                  })
            }else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your Un-Winked That Person',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }
    like(){
        let senderdata = {
            access_token:window.localStorage.getItem('key1'),
            user_id:this.state.uid,
            liker:this.state.login_user,
            visible: !this.state.visiblelike
        }
        this.setState({
            visiblelike:!this.state.visiblelike
        })
        Axios.post('/api/like',senderdata).then(res=>{
            if(res.data.visible){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your Liked That Person',
                    showConfirmButton: false,
                    timer: 1000
                })
            }else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your Un-Liked That Person',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }
    open_messages(){
        let senderdata={
            access_token:window.localStorage.getItem('key1'),
            uid:this.state.login_user,
            chat_user:this.state.uid
        }
        Axios.post('/api/make_chat',senderdata).then(res=>{
            console.log(this.props);
            this.props.history.push("/profile/Messages");
        })
    }
    show_modal(){
        this.setState({
            display_modal:false
        })

        window.location.reload();
    }
    start_video_call() {
        
      this.props.start_call();
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
                        <div className="row" style={{marginTop:'10px',display:'block',textAlign:'center'}}>
                            <li  onClick={this.start_video_call.bind(this)} className="fas fa-video sidebar_icons_unclicked"></li>
                            <Link to="#" onClick={this.open_messages.bind(this)}><li  className={"fa fa-envelope ml-3 sidebar_icons_unclicked"}></li></Link>
                            <li onClick={this.like.bind(this)} className={this.state.visiblelike == 1? "fa fa-heart ml-3  sidebar_icons_clicked" :"fa fa-heart ml-3  sidebar_icons_unclicked"}></li>
                            <li onClick={this.wink.bind(this)} className={this.state.visible == 1? "fa fa-eye ml-3  sidebar_icons_clicked" :"fa fa-eye ml-3  sidebar_icons_unclicked"}></li>
                            
                        </div>
                        <div className="profile-usermenu">
                            <ul className="nav" style={{display:'block'}}>
                                <li className='overview'>
                                    <Link to={`/profile/${this.state.user.username}/profile`}>
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                        Profile</Link>
                                </li>
                                <li className='overview'>
                                    <Link to={`/profile/${this.state.user.username}/profile/About`}>
                                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                                        About Me </Link>
                                </li>
                                <li className='overview'>
                                    <Link to="/profile/my/match-data">
                                        <i className="fa fa-list-alt" aria-hidden="true"></i>
                                       Match Data </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.display_modal}  onHide={this.show_modal.bind(this)}>
                            <Modal.Header closeButton>
                            <Modal.Title>Video Call</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <div className="video-container">
                                <video className="my-video" 
                                ref={(ref)=> {this.myvideo = ref;}}> </video>
                                <video className="user-video" 
                                ref={(ref)=> {this.uservideo = ref;}}> </video>
                            </div>
                            </Modal.Body>
                        </Modal>
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
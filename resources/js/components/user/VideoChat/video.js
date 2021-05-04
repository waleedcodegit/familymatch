import React, { Component } from 'react';
import Mediahandler from './Mediahandler'
import './video.css';
import {connect} from 'react-redux';
import Pusher from 'pusher-js'
import Peer from 'simple-peer'

const App_Key = '97900d00d08711df9f6b';
class video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasmedia:false,
            otherUserId:null,
            uid:this.props.user.uid
        };
        this.stream = null;
        this.peers = {};
        this.mediahandler = new Mediahandler();
        this.setUpPusher();
        this.callTo = this.callTo.bind(this);
        this.setUpPusher = this.setUpPusher.bind(this);
        this.startPeer = this.startpeer.bind(this);
    }
    
    componentDidMount(){
        this.mediahandler.getPermissions()
        .then(stream=>{
            this.setState({
                hasmedia:true
            })
            this.stream = stream;
            try{
                this.myvideo.srcObject = stream;
            }catch{
                this.myvideo.src = URL.createObjectURL(stream);
            }
            this.myvideo.play();
        })
    }

    setUpPusher(){
        Pusher.logToConsole = true;
        this.pusher = new Pusher(App_Key ,{
            authEndpoint:'/api/pusher/auth/'+this.state.uid,
            cluster:'ap2',
            auth:{
                params:this.state.uid,
                headers:{
                    'X-CSRF-Token':window.csrfToken
                }
            }
        });

        this.channel = this.pusher.subscribe('presence-video-channel');

        this.channel.bind(`client-signal-${this.state.uid}`,(signal) =>{
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

        peer.on('signal', (data) => {
            this.channel.trigger(`client-signal-${userId}`, {
                type: 'signal',
                userId: this.state.uid,
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
    callTo(userId) {
        this.peers[userId] = this.startPeer(userId);
    }
    render() {
        return (
            <div className="container">
                {[50,61,64,4].map((userId) => {
                    return this.state.uid !== userId ? <button key={userId} onClick={() => this.callTo(userId)}>Call {userId}</button> : null;
                })}
                <div className="video-container">
                    <video className="my-video" 
                     ref={(ref)=> {this.myvideo = ref;}}> </video>
                     <video className="user-video" 
                     ref={(ref)=> {this.uservideo = ref;}}> </video>
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
export default connect(mapStateToProps)(video);
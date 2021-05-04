import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios';
import './user.css'
import {Nav,Navbar,NavDropdown,Dropdown} from 'react-bootstrap'
import {connect} from 'react-redux'
import Profile from './profile'
import {Route,Switch} from 'react-router-dom'
import Footer from '../Footer'
import Search from './Search/Search'
import PageNotFound from '../PageNotFound'
import Results from './Search/results'
import UserProfile from './UserProfile/index'
import Chat from './Messages/Chat'
import Start from './Setup/start'
import Setup from './Setup/Setup'
import AddEvent from './Events/AddEvent'
import AllEvents from './Events/Events'
import Blogs from './Blog/Allblogs'
import Blog from './Blog/blog'
import Allplans from './Plans/Allplans'
import Matches from './Matches/Matches';
import Mutual from './Matches/Mutual'
import Reverse from './Matches/Reverse'
import VideoCall from '../user/VideoChat/video'
import Mediahandler from './VideoChat/Mediahandler'
import {Modal} from 'react-bootstrap'
import Pusher from 'pusher-js'
import Peer from 'simple-peer'
import './VideoChat/video.css';
import Swal from 'sweetalert2'

const App_Key = '97900d00d08711df9f6b';

class UserNavBar extends Component {
    constructor(props) {
        super(props);
        this.state={
          user:[],
          auth:false,
          username:'',
          display_modal:false,
          hasmedia:false,
          otherUserId:null,
          uid:'',
          username:'',
          display_incomming_call_modal:false,
          display_outgoing_call_modal:false,
          callstart:false,
          visible:false,
          check:true,
          startcall_check:true,
          isplaying:false,
          fname: '',
          lname:'',
          username:'',
          profile_img_url:'noimage.png',
          initiator:false,
          user_audio:true,
          count:0,
          is_call_accepted:false
       }
       this.stream = null;
       this.peers = {};
       this.mediahandler = new Mediahandler();
      
       // this.callTo = this.callTo.bind(this);
       this.setUpPusher = this.setUpPusher.bind(this);
       this.startPeer = this.startpeer.bind(this);
    }
    
  componentDidMount(){
    this.CheckAuthorization();
    $(document).ready(function(){
      $(window).scroll(function (){
        if($(window).scrollTop()>20){
          $('Navbar').addClass('scrollUp');
        }else{
          $('Navbar').removeClass('scrollUp');
    
        }
      })
    })
    $(document).ready(function () {
      $('.navbar-light .dmenu').hover(function () {
              $(this).find('.sm-menu').first().stop(true, true).slideDown(150);
          }, function () {
              $(this).find('.sm-menu').first().stop(true, true).slideUp(105)
          });
      });

      
    
  }
  CheckAuthorization () {
    let user =  window.localStorage.getItem('key1');
    let senderdata = {
        user:user
    }
    let res;
    Axios.post('/api/check_authentication',senderdata).then(res=>{
        
     if(res.data == 0){
         this.props.history.push('/login');
     }else{
          this.setState({
            uid:res.data[0].id,
            username:res.data[0].username
          },function(){
            this.setUpPusher();
          })
          let user = {
             uid:res.data[0].id,
             username:res.data[0].username
           }
           this.props.changeUser(user);

     }
     this.setState({
         auth:true,
         username:res.data[0].username
     })
    })
 }

  logout(){
    // history.push('/login');
    window.localStorage.setItem('key1','');
    this.props.history.push('/login');
  }

  call_inspector(){
    if(this.uservideo.currentTime == 0){
      setTimeout(()=>{
        if(this.uservideo.currentTime == 0){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Network Error! - Please try again',
          },function(){
            setTimeout(()=>{window.location.reload()},1000)
          })
        }
      },5000)
    }
  }

  check_is_call_accepted(){
    if(!this.state.is_call_accepted){
      setTimeout(()=>{
        if(!this.state.is_call_accepted){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Call Not Answered',
          },function(){
            setTimeout(()=>{window.location.reload()},1000)
          })
          this.Cancel_Call();
        }
      },12000)
    }
  }
  setUpPusher(){
   
    // Pusher.logToConsole = true;
    this.pusher = new Pusher(App_Key ,{
        authEndpoint:'/api/pusher/auth/'+this.state.uid+'/'+this.state.username,
        cluster:'ap2',
        auth:{
            params:this.state.uid,
            headers:{
                'X-CSRF-Token':window.csrfToken
            }
        }
    });
    this.channel1 = this.pusher.subscribe('presence-call-start');
    this.channel1.bind(`client-video-start-${this.state.uid}`,(signal) =>{
      console.log(signal.data.message); 
     
     if(signal.data.message == 'Accepted'){
        this.setState({
          display_modal:true,
          visible:true,
          display_outgoing_call_modal:false,
          user_audio:false,
          is_call_accepted:true
        },function(){
          this.call_inspector();
          this.check_is_call_accepted();
        })
      }else if(signal.data.message == 'Rejected'){
        this.setState({
          display_modal:false,
          visible:false,
          display_outgoing_call_modal:false
        })
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Call Rejected',
        })
        window.location.reload();
      }
      else if(signal.data.message == 'end_call'){
        this.setState({
          display_modal:false,
          visible:false,
          display_incomming_call_modal:false,
        })
        Swal.fire({
          icon: 'error',
          title: 'Call Ended by Other User',
        })
        this.hide_videocall_modal();
      }
      else if(signal.data.message == 'Cancelled'){
        this.setState({
          display_modal:false,
          visible:false,
          display_incomming_call_modal:false,
        })
        Swal.fire({
          icon: 'error',
          title: 'Call Cancelled By Caller',
        })
        window.location.reload();
      }   
    })
    this.componentWillReceiveProps();
    
}
componentWillReceiveProps =  () =>{
    let check2 = true;
  this.channel = this.pusher.subscribe('presence-video-channel');
  let checker = true;
  
   
    this.channel.bind(`client-signal-${this.state.uid}`, async (signal) =>{
      if(this.state.initiator){
        console.log("this is intiator");
        window.sessionStorage.setItem('recipient',signal.userId);  
        if(checker){
          this.get_user_by_id(signal.userId);
          checker = false;
          await this.setStateSynchronous(()=> {
             console.log('it runs');
            this.mediahandler.getPermissions()
          .then(stream=>{
              console.log(stream);
              this.stream = stream;
              
          })
        })
        }
     
         let peer = this.peers[signal.userId];
         console.log(peer);
          try{
            if(peer === undefined){
              this.setState({otherUserId:signal.userId});
                peer = await this.setStateSynchronous(()=> {
                  try{
                    console.log('it runs');
                    this.startpeer (signal.userId , false);
                  }catch(e){
                    alert('error'+e)
                  }
    
                })
          }
          
          console.log(signal.data);
          // alert(signal.data);
          if(check2 ){
            try{
            peer.signal(signal.data);
            check2 = false;
            }catch(e){
              alert('error'+e)
            }
          }
          }catch(e){
            alert('error'+e)
          }
          
          // if(this.state.initiator){
          //   peer.signal(signal.data);
          // }
    
      }else{
        console.log("this is Not intiator");
        window.sessionStorage.setItem('recipient',signal.userId);  
        if(checker){
          this.get_user_by_id(signal.userId);
          checker = false;
          await 
            
            this.mediahandler.getPermissions()
          .then(stream=>{
              console.log(stream);
              this.stream = stream;
              console.log('it runs');
          })
        
        }
     
         let peer = this.peers[signal.userId];
         console.log(peer);
          try{
            if(peer === undefined){
              this.setState({otherUserId:signal.userId});
                peer = 
                    await this.startpeer (signal.userId , false);
                
          }
          
          console.log(signal.data);
          // alert(signal.data);
          if(check2 ){
            try{
            peer.signal(signal.data);
            check2 = false;
            }catch(e){
              alert('error'+e)
            }
          }
          }catch(e){
            alert('error'+e)
          }
          
          // if(this.state.initiator){
          //   peer.signal(signal.data);
          // }
      }
     
    })
  
}
hide_videocall_modal(){
  this.setState({
      display_modal:false
  })
  window.location.reload();
}
startpeer(userId , initiator = true ){
    console.log('peer started')
    const peer = new Peer({
        initiator,
        stream:this.stream,
        trickle:false,
    })
     

    peer.on('signal', async (data) => {
      // alert(data);
      if(initiator){
        this.setState({display_modal:true});
      }
     await new Promise((res,rej)=>{
       try{
        this.channel.trigger(`client-signal-${userId}`, {
          type: 'signal',
          userId: this.state.uid,
          data: data
      });
       }catch(e){
         alert('Error'+e);
       }
       
      })
        
    });

    peer.on('stream', (stream) => {
      console.log('in on stream');
      this.setState({display_modal:true})
      try {
        this.uservideo.srcObject = stream;
    } catch (e) {
        this.uservideo.src = URL.createObjectURL(stream);
    }
    console.log('after try catch user video');

    if(!this.state.isplaying){
      if(!initiator){
        try{
          this.myvideo.srcObject =  this.stream ;
      }catch{
          this.myvideo.src = this.stream ;
      }
      this.myvideo.play();
      }
      this.uservideo.play();
      this.setState({
        isplaying:true
      })
    }
    if(this.state.callstart){
      this.setState({visible:true})
      
    }else{
      if(!initiator && this.state.check){
        this.setState({
          display_incomming_call_modal:true,
          check:false
        })
      }
    }
  
    });

    // peer.on('close', () => {
      
    //     let peer = this.peers[userId];
    //     if(peer !== undefined) {
    //         peer.destroy();
    //     }
    //     Swal.fire({
    //       position: 'top-end',
    //       icon: 'error',
    //       title: 'Call Ended',
    //     })
    //     this.peers[userId] = undefined;
    // });

    return peer;
}

start_video_call = async() => {
  this.setState({
    display_modal:true,
    visible:false,
    display_outgoing_call_modal:true,
    initiator:true
  }, async  () =>{
    await this.mediahandler.getPermissions()
  .then(stream=>{
      this.setState({
          hasmedia:true
      })
      this.stream = stream;
      try{
          this.myvideo.srcObject = stream;
      }catch{
          this.myvideo.src =stream;
      }
      this.myvideo.play();
  })

  let recipient = window.sessionStorage.getItem('recipient');
  this.get_user_by_id(recipient);
  this.peers[recipient] = this.startPeer(recipient);
  this.check_is_call_accepted();
  })
 
}
 
 display_incomming_call_modal(){
   this.setState({
    display_incomming_call_modal:false
   })
 }
 display_outgoing_call_modal(){
  this.setState({
    display_outgoing_call_modal:false
  })
 }
 Reject_Call(){
  let data1 = {
    message:'Rejected'
  }
  let recipient = window.sessionStorage.getItem('recipient');
  console.log(recipient);
  this.channel1.trigger(`client-video-start-${recipient}`, {
    type: 'signal',
    userId: this.state.uid,
    data: data1
  });
  this.setState({
    display_incomming_call_modal:false,
    display_modal:false,
    visible:false
  })
  this.hide_videocall_modal();
 }
  Cancel_Call(){
  let data1 = {
    message:'Cancelled'
  }
  let recipient = window.sessionStorage.getItem('recipient');
  console.log(recipient);
  this.channel1.trigger(`client-video-start-${recipient}`, {
    type: 'signal',
    userId: this.state.uid,
    data: data1
  });
  this.setState({
    display_outgoing_call_modal:false,
    display_modal:false,
    visible:true
  })
  this.hide_videocall_modal();
 }
 Endcall(){
  let data1 = {
    message:'end_call'
  }
  let recipient = window.sessionStorage.getItem('recipient');
  console.log(recipient);
  this.channel1.trigger(`client-video-start-${recipient}`, {
    type: 'signal',
    userId: this.state.uid,
    data: data1
  });
 this.hide_videocall_modal();
 }
 Accept_Call(){
  let data1 = {
    message:'Accepted'
  }
  let recipient = window.sessionStorage.getItem('recipient');
  this.channel1.trigger(`client-video-start-${recipient}`, {
    type: 'signal',
    userId: this.state.uid,
    data: data1
  });

    this.setState({
      start_call:true,
      display_modal:true,
      display_incomming_call_modal:false,
      visible:true,
      user_audio:false,
      is_call_accepted:true
    },function(){
      try{
        this.myvideo.srcObject = this.stream;
    }catch{
        this.myvideo.src = this.stream;
    }
    this.myvideo.play();
    this.call_inspector();
    this.check_is_call_accepted();

    })
  }
  get_user_by_id(id){
    let senderdata={
      access_token:window.localStorage.getItem('key1'),
      uid:id
    }
    Axios.post('/api/getuserbyid',senderdata).then(res=>{
      console.log(res);
      this.setState({
        fname: res.data.fname,
        lname: res.data.lname,
        username:res.data.username,
        profile_img_url:res.data.profile_image
      })
    })
  }
  render() {
    return (
      <div >
        {
          this.state.auth?
            <div >
              <div id="usernav">
                <Navbar style={{height:'auto'}} className="loginnav" collapseOnSelect expand="sm" variant="dark">
                  <Navbar.Brand href="/" style={{fontFamily:'enjoysummer',fontSize:'20px'}}>FamilyMatch</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/profile/Search" aria-expanded="true" id="matches" className=" navlink">Search</Nav.Link>
                      <NavDropdown aria-expanded ="true" style={{color:'#ffffff !important'}}  title="Match" id="collasible-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/profile/Matches">Matches</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/profile/Mutuals">Mutual</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/profile/Reverse">Reverse</NavDropdown.Item>
                        
                      </NavDropdown>
                      <Nav.Link as={Link} to="/profile/Messages" className=" navlink">Messages</Nav.Link>
                      <Nav.Link as={Link} to="/profile/AllEvents" className=" navlink">Events</Nav.Link>
                      <Nav.Link as={Link} to="/profile/blogs" className=" navlink">Blog</Nav.Link>
                      <Nav.Link as={Link} to="/profile/plans" className=" navlink">Plans</Nav.Link>
                      
                      <li className="nav-item dropdown dmenu">
                      <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                      <i   className="ml-2 fa fa-user-circle-o text-light"></i>
                      </a>
                      <div className="dropdown-menu sm-menu">
                      <Link className="dropdown-item" to="/profile/my/">Personel</Link> 
                      <Link  className="dropdown-item" to="/profile/my/About-me">About me</Link> 
                      <Link  className="dropdown-item" to="/profile/my/match-data">Match Data</Link>
                      <Link  className="dropdown-item" to="/profile/my/photo"> Photo</Link>
                      <Link  className="dropdown-item" to="/profile/my/views"> Views</Link>
                      <Link  className="dropdown-item" to="/profile/my/likes"> Likes</Link>
                      <Link  className="dropdown-item" to="/profile/my/favorites"> Favotites</Link>
                      <Link  className="dropdown-item" to="/profile/my/winks"> Winks</Link>

                      </div>
                    </li>
                      <Nav.Link href="#" title="LogOut" >
                      <i onClick={this.logout.bind(this)}  className="ml-2 fas fa-sign-out-alt text-light larger"></i>
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar> 
              </div>
              <div>
                <Switch>
                <Route   path="/profile/my" component={Profile} type="public"></Route>
                <Route exact path="/profile/Search" component={Search} type="public"></Route>
                <Route  path="/profile/Search/Results" component={Results} type="public"></Route>
                <Route  path="/profile/:username/profile" render={(props)=> <UserProfile {...props} start_call={this.start_video_call.bind(this)} />} type="public"></Route>
                <Route  path="/profile/Messages" component={Chat} type="public"></Route>
                <Route  path="/profile/Setup/Start" component={Start} type="public"></Route>
                <Route  path="/profile/Setup" component={Setup} type="public"></Route>
                <Route  path="/profile/AddEvent" component={AddEvent} type="public"></Route>
                <Route  path="/profile/AllEvents" component={AllEvents} type="public"></Route>
                <Route  path="/profile/blogs" component={Blogs} type="public"></Route>
                <Route  path="/profile/blog/:slug" component={Blog} type="public"></Route>
                <Route  path="/profile/plans" component={Allplans} type="public"></Route>
                <Route  path="/profile/Matches" component={Matches} type="public"></Route>
                <Route  path="/profile/Mutuals" component={Mutual} type="public"></Route>
                <Route  path="/profile/Reverse" component={Reverse} type="public"></Route>
                <Route  path="/profile/VideoCall" component={VideoCall} type="public"></Route> 

                <Route component={PageNotFound}/>
                </Switch>
                
              </div>  
                <Footer></Footer>         
            </div>:
                  <div id="displayspinner" >
                    <div className="spinner-border text-info ml-2" style={{width:'100px',height:'100px'}} role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
                      {
                        this.state.display_modal == false?
                        <video style={{display:'none'}} className="user-video" 
                                ref={(ref)=> {this.uservideo = ref;}} type="video/mp4"> </video>
                                :
                                null
                      }
                     
                              {
                                this.state.display_modal?
                                <div className={this.state.visible ? 'visible_modal video-container':'non-visible video-container'} >
                                <video  muted className="my-video" 
                                ref={(ref)=> {this.myvideo = ref;}} type="video/mp4"> </video>
                                <video controls muted={this.state.user_audio} className="user-video" 
                                ref={(ref)=> {this.uservideo = ref;}} type="video/mp4"> </video>
                                <button onClick={this.Endcall.bind(this)} className="btn btn-danger end_call_btn">
                                  <img src="/images/hangup.png"></img>
                                </button>
                              </div>:
                                null
                              }
                           
                         
        
                        <Modal show={this.state.display_incomming_call_modal}  onHide={this.display_incomming_call_modal.bind(this)}>
                            <Modal.Header >
                            <Modal.Title>Incomming Video Call</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="caller_div">
                                <img src={"/images/"+this.state.profile_img_url}></img>
                                <h5>{this.state.fname} {this.state.lname}</h5>
                                <p className="text-secondary">Calling</p>
                                <button onClick={this.Accept_Call.bind(this)} className=" btn btn-success">Accept</button>
                                <button onClick={this.Reject_Call.bind(this)} className="ml-2 btn btn-danger">Reject</button>
                              </div>
                              

                            </Modal.Body>
                        </Modal>

                        <Modal show={this.state.display_outgoing_call_modal}  onHide={this.display_outgoing_call_modal.bind(this)}>
                            <Modal.Header closeButton>
                            <Modal.Title>Outgoing Video Call</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="caller_div">
                                <img src={"/images/"+this.state.profile_img_url}></img>
                                <h5>{this.state.fname} {this.state.lname}</h5>
                                <p className="text-secondary">Calling</p>
                                <button onClick={this.Cancel_Call.bind(this)} className="ml-2 btn btn-danger">Cancel</button>
                              </div>
                            </Modal.Body>
                        </Modal>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    changeUser(user){dispatch({type:'CHANGE_USER',payload:user})}
  }
}
export default connect(undefined,mapDispatchToProps)(UserNavBar);
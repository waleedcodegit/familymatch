import React, { Component } from 'react';
import './chat.css'
import '../user.css'
import Axios from 'axios';
import {connect} from 'react-redux';
import Pusher from 'pusher-js'
import { img_base } from '../../Configs/Env';
const App_Key = '97900d00d08711df9f6b';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state={
            chats:[],
            messages:[],
            all_messages:[],
            active_chat:0,
            uid:this.props.user.uid,
            newmessage:'',
            chat_user_id:'',
            render_messages:true,
            chat_intiator:0
        }
     
    }
    get_new_msgs = async() =>{
        let senderdata={
            access_token:window.localStorage.getItem('key1'),
            uid:this.state.uid
        }
       await Axios.post('/api/get_messages',senderdata).then(res=>{
        this.set_res(res.data);
        this.set_scroll();
       })
    }
    componentWillMount(){
        this.get_new_msgs();
        this.set_scroll();
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
        this.channel = this.pusher.subscribe('presence-message');
        this.channel.bind(`client-message-${this.state.uid}`,(signal) =>{
          console.log(signal.data.message); 
          let array = this.state.messages;
          array.push(signal.data.message);
          this.setState({
              messages:array
          },function(){
              setTimeout(()=>{this.get_new_msgs();},1000)
              this.set_scroll();
          })
          
        })
    }
    set_scroll(){
        var d = $('#messages_div');
        d.scrollTop(d.prop("scrollHeight"));
    }
    set_res(data){
        this.setState({
            chats:data.chats,
            all_messages:data.messages
        })
        this.filter_chat_messages();
    }
    filter_chat_messages(){
        if(this.state.active_chat != 0){
            this.state.all_messages.map((msg,index)=>{
                if(this.state.active_chat == msg[0].chat_id){
                    this.setState({
                        messages:msg
                    },function(){
                        this.set_scroll();
                    })
                }
             })
        }else{
            this.setState({
                active_chat:this.state.chats[0].id,
                chat_user_id:this.state.chats[0].chat_user_id,
                chat_intiator:this.state.chats[0].user_id
            },function(){
                this.state.all_messages.map((msg,index)=>{
                   if(this.state.active_chat == msg[0].chat_id){
                       this.setState({
                           messages:msg
                       },function(){
                        this.set_scroll();
                       })
                   }
                })
            })
        }
        
    }
    handle_new_message(e){
        this.setState({
            newmessage:e.target.value
        })
    }
    send_message(e){
        e.preventDefault();
        let array = this.state.messages;
        let newmsg = {
            chat_id: 4,
            date: "now",
            lname: "new",
            message: this.state.newmessage,
            profile_image: "noimage.png",
            time: "now",
            user_id:this.state.uid
        }
        array.push(newmsg);
        this.setState({
            messages:array
        },function(){
            this.set_scroll();
        })
    
        let data1 = {
            message:newmsg
          }
          let recipient = this.state.chat_intiator == this.state.uid ? this.state.chats[0].chat_user_id : this.state.chat_intiator;
          console.log(recipient);
          this.channel.trigger(`client-message-${recipient}`, {
            type: 'signal',
            userId: this.state.uid,
            data: data1
          });
        let senderdata={
            chat_id:this.state.active_chat,
            uid:this.state.uid,
            msg:this.state.newmessage,
            msg_type:this.state.uid == this.state.chat_user_id? 'in' : 'out',
            access_token:window.localStorage.getItem('key1')
        }
        Axios.post('/api/new_message',senderdata).then(res=>{
            this.setState({
                newmessage:''
                
            })
        })
    }
    change_active_chat(id,chat_user_id,user_id){
        this.setState({
            active_chat:id,
            chat_user_id:chat_user_id,
            chat_intiator:user_id
        },function(){
            this.filter_chat_messages();
            console.log(this.state.chat_user_id+' '+this.state.uid)
        })
    }
    render() {
        return (
            <div>
                <div className="container ">
                    <div className="messaging mt-3">
                        <div className="inbox_msg chat-card-content row">
                            <div className="inbox_people col-md-4">
                                <div className="headind_srch">
                                    <div className="recent_heading">
                                        <h4>Recent</h4>
                                    </div>
                                    <div className="srch_bar">
                                        <div className="stylish-input-group">
                                            <input type="text" className="search-bar" placeholder="Search" />
                                            <span className="input-group-addon">
                                                <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                            </span> </div>
                                    </div>
                                </div>
                                {/* active_chat */}
                                <div className="inbox_chat">
                                    {
                                        this.state.chats.map((chat,index)=>{
                                            return(
                                                <div onClick={this.change_active_chat.bind(this,chat.id,chat.chat_user_id,chat.user_id)} key={index} className={this.state.active_chat == chat.id ? "chat_list active_chat" : "chat_list"}>
                                                    <div className="chat_people">
                                                        <div className="chat_img"> <img src={img_base+chat.profile_image} alt="sunil" /> </div>
                                                        <div className="chat_ib">
                                                            <h5>{chat.fname} {chat.lname}<span className="chat_date">{chat.last_active}</span></h5>
                                                            {/* <p>Test, which is a new approach to have all solutions
                                        astrology under one roof.</p> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {
                                this.state.render_messages?
                                    <div className="mesgs col-md-8">
                               
                                   
                                    <div id="messages_div"  className="msg_history">
                                        {
                                            this.state.messages.map((msg,index)=>{
                                                return(
                                                    <div key={index} className={msg.user_id == this.state.uid ? "outgoing_msg" : 'incoming_msg '}>
                                                        <div className={msg.user_id == this.state.uid ? "hide_img" : 'incoming_msg_img'}> 
                                                        <img src={img_base+msg.profile_image} alt="sunil" /> </div>
                                                        <div className={msg.user_id == this.state.uid ? "sent_msg" : ' received_msg'}>
                                                            <div className={msg.user_id == this.state.uid ? "" : 'received_withd_msg'}>
                                                                <p>{msg.message}</p>
                                                                <span className="time_date">{msg.time}    |  {msg.date}</span></div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                <div className="type_msg">
                                    <div className="input_msg_write">
                                        <form>
                                            <input value={this.state.newmessage || " "} onChange={this.handle_new_message.bind(this)} type="text" className="write_msg" placeholder="Type a message" />
                                            <button onClick={this.send_message.bind(this)} className="msg_send_btn" type="submit"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            :null
                            }
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
export default connect(mapStateToProps)(Chat);
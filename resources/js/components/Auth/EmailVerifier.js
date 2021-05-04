import React, { Component } from 'react';
import AuthNavBar from './AuthNavBar'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Footer'
class EmailVerifier extends Component {
    constructor(props) {
        super(props);
        this.state={
           
            Email:'',
            Password:'',
            EmptyFieldsError:false,
            code:'',
            alertshow:false,
            loading:false,
            wrongcode:false,
            btnloading:false
        }
       
    }
    handleCode(e){
        this.setState({
            code:e.target.value
        })
    }
    VerifyUser(e){
        e.preventDefault();
        if(this.state.code !=''){
            this.setState({
                EmptyFieldsError:false,
                btnloading:true
            })
           let senderdata={
               user:window.localStorage.getItem('$op24$filijdj'),
               code:this.state.code
           }
           console.log(senderdata);
           axios.post('/api/VerifyEmail',senderdata).then(res=>{
               this.setState({
                   btnloading:false
               })
               if(res.data == 1){
                   window.localStorage.setItem('key1',window.localStorage.getItem('$op24$filijdj'));
                if(window.sessionStorage.getItem('reg_flag') == 1){
                    this.props.history.push('/profile/Setup/Start');
                }else{
                    this.props.history.push('/profile/my/');
                }
               
               }else{
                this.setState({
                    wrongcode:true
                }) 
               }

           })

        }else{
            this.setState({
                EmptyFieldsError:true
            })
        }
    }
    ResendVerificationCode(){
        let senderdata={
            user:window.localStorage.getItem('key1'),
        }
        this.setState({
            loading:true
        })
        axios.post('/api/ResendVerificationcode',senderdata).then(res=>{
            this.setState({
                loading:false
            })
            this.setState({
                alertshow:true
            },function(){
                setTimeout(function() { 
                    this.setState({alertshow: false}) 
                }.bind(this), 3000)
            })
        })
    }
    render() {
        return (
            <div>
                <div>
                    <AuthNavBar/>
                </div>
                <div >
                    <div className="LoginPageContent">
                        <h1 style={{color:'#ffffff'}}>Family Match</h1>
                    <div className="container logincard">
                    <div className="row no-gutter">
                        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image2"></div>
                        <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                  {
                                        this.state.alertshow?
                                        <div className="alert alert-success">
                                           Verification Code Resent SuccessFully.
                                        </div>
                                    :
                                        ''
                                  }  
                                <h3 className="login-heading2 mb-4" style={{fontWeight:'bold'}}>We Just Sent You a Verification Email</h3>
                                <h3 className="login-heading mb-4">Please Verify Your Email</h3>
                                <form>
                                    {
                                        this.state.EmptyFieldsError?
                                        <p style={{color:'red',fontSize:'small'}} className="ml-3">Please Enter The Code</p>
                                        :
                                        ''
                                    }
                                     {
                                        this.state.wrongcode?
                                        <p style={{color:'red',fontSize:'small'}} className="ml-3">Wrong Verification Code</p>
                                        :
                                        ''
                                    }
                                    <div className="form-label-group">
                                    <input type="text" id="inputEmail" onChange={ this.handleCode.bind(this) } className="form-control" placeholder="Verification Code" required/>
                                    <label htmlFor="inputEmail">Verification Code</label>
                                    </div>
                                    <button  style={{backgroundColor:'#ff427f',color:'#ffffff'}}
                                     onClick={this.VerifyUser.bind(this)} 
                                     className="btn btn-lg btn-block " >Verify 
                                      {
                                                    this.state.btnloading?
                                                        <div className="spinner-border text-light ml-2" style={{fontSize:'15px',width:'30px',height:'30px'}} role="status">
                                                        <span className="sr-only">Loading...</span>
                                                        </div>
                                                    :
                                                        ''
                                            }
                                      </button>
                                    <div className="text-center">
                                    <p className="small">Did'nt Recieved Code Yet? <a className="small" href="#">
                                        <span onClick={this.ResendVerificationCode.bind(this)}>Resend 
                                            {
                                                    this.state.loading?
                                                        <div className="spinner-border text-danger ml-2" style={{fontSize:'10px',width:'10px',height:'10px'}} role="status">
                                                        <span className="sr-only">Loading...</span>
                                                        </div>
                                                    :
                                                        ''
                                            }
                                        </span></a></p>
                                    </div>
                                </form>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                                            
                    </div>
                </div>
                <Footer></Footer>
            </div>    
        );
    }
}
export default EmailVerifier;
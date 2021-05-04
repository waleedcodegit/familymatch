import React, { Component } from 'react';
import AuthNavBar from './AuthNavBar'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Footer'

class Passwordresetcontroller extends Component {
    constructor(props) {
        super(props);
        this.state={
           
            Email:'',
            Password:'',
            EmptyFieldsError:false,
            code:'',
            id:'',
            loading1:false,
            alert:false
        }
       
    }
     
     componentDidUpdate(prevProps, prevState) {
       if(prevProps.id !== this.state.id){
          //fetchnewProduct and set state to reload
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
                EmptyFieldsError:false
            })
           let senderdata={
               user:window.localStorage.getItem('key1'),
               code:this.state.code
           }
           axios.post('/api/VerifyEmail',senderdata).then(res=>{
           })

        }else{
            this.setState({
                EmptyFieldsError:true
            })
        }
    }
    ResendLink (){
        let senderdata = {
            id : this.props.match.params.id
        }
        this.setState({
            loading1:true
        })
        axios.post('/api/ResendPswLink',senderdata).then(res=>{
            this.setState({
                loading1:false,
                alert:true
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
                    <div className="LoginPageContent text-center">
                        <h1 style={{color:'#ffffff'}}>Family Match</h1>
                    <div className="container col-lg-5   logincard">
                        <div className="col-md-12 ">
                            <div className="login d-flex  py-5">
                                    <div className="col-md-12 center text-center">
                                    <img style={{width:'100px',height:'100px'}} src="/images/emailverify.jpg"></img>
                                    <h3 className="login-heading2 mb-4" style={{fontWeight:'bold'}}>We Just Sent You a Password Reset Link On Your Email</h3>
                                    <h3 className="login-heading mb-4">Open Your Mail</h3>
                                    {
                                        this.state.alert?
                                        <div className="alert alert-success" role="alert">
                                            Password Reset Link Sent To Your Email Successfully
                                        </div>
                                        :
                                        null

                                    }
                                        <form>
                                            {
                                                this.state.EmptyFieldsError?
                                                <p style={{color:'red',fontSize:'small'}} className="ml-3">Please Enter The Code</p>
                                                :
                                                ''
                                            }
                                            
                                            <button style={{backgroundColor:'#ff427f',color:'#ffffff'}}
                                            
                                            className="btn btn-lg btn-block " ><a style={{color:'white'}} href="https://www.gmail.com" target="_blank">Open My Mail</a></button>
                                            <div className="text-center">
                                            <p className="small">Did'nt Recieved Link Yet? <a className="small" href="#"><span onClick={this.ResendLink.bind(this)}>Resend</span>
                                            </a>
                                        </p> {
                                                        this.state.loading1?
                                                            <div className="spinner-border text-dark ml-2" style={{width:'15px',height:'15px'}} role="status">
                                                            </div>
                                                        :
                                                        null
                                            }
                                            </div>
                                        </form>
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
export default Passwordresetcontroller;
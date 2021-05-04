import React, { Component } from 'react';
import Axios from 'axios'
import Swal from 'sweetalert2'
import '../css/admin.css'
class Adminlogin extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:'',
            pass:'',
            loading:false,
            display_spinner:true
        }
    }
    componentDidMount(){
        // let senderdata = { 
        //     user:window.localStorage.getItem('key2')
        //   }
        //   Axios.post('/api/admin_check_auth',senderdata).then(res=>{
        //     this.setState({
        //         display_spinner:true
        //       })
        //     if(res.data != 0){
                
        //       this.props.history.push('/adminpanel');
        //     }
        //   })
        
    }
 
    email(e){
        this.setState({
            email:e.target.value
        })
    }
    pass(e){
        this.setState({
            pass:e.target.value
        })
    }
    login(e){
        e.preventDefault();
        if(this.state.username !='' && this.state.pass !=''){
            this.setState({
                loading:true
            })
            let senderdata = {
                email:this.state.email,
                password:this.state.pass
            }
            Axios.post('/api/admin_login',senderdata).then(res=>{
                this.setState({
                    loading:false
                })
                if(res.data != 0){
                    window.localStorage.setItem('key2',res.data.access_token);
                     this.props.history.push('/adminpanel');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Login Authentication Successfull',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Authentication Error! Invalid Username or Password',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    
                }
            })
        }else{
            
            Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Please Enter both Username or Password',
            showConfirmButton: false,
            timer: 1500
            })
        }

    }
    
    render() {
        return (
            <div style={{position:'absolute',top:'0',left:'0',right:'0',bottom:'0',backgroundColor:'azure'}}>
                {
                    this.state.display_spinner ?
                    <div style={{marginTop:'10%'}}>
                    <div  className="card bg-light mt-1 " style={{borderRadius:'7px',boxShadow:'3px 3px 25px rgba(0,0,0,0.2)',width:'max-content',display:'block',marginLeft:'auto',marginRight:'auto'}}>
                        <div  style={{backgroundColor:'#c2f0fc',borderTopLeftRadius:'7px',borderTopRightRadius:'7px',padding:'3px'}}>
                            <h4 className="card-title ml-2 mt-1" style={{color: '#107595',backgroundColor:'#c2f0fc'}}>Admin Login
                            {
                                        this.state.loading?
                                        <div className="spinner-border text-info ml-2" style={{width:'30px',height:'30px',fontWeight:'200'}} role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        :
                                            null
                                    }
                            </h4>                    
                        </div>
                        <div className="card-body " style={{maxWidth: 'inherit'}}>
                            <form>
                                <div className=" row col mt-2">
                                    <label className=" mt-2"  style={{fontWeight:'bold',color:'rgb(16, 117, 149)'}} >Email</label> 
                                    <input autoFocus id="inputbox" type="email" required 
                                    className=" col-sm-12 " onChange={this.email.bind(this)}
                                    placeholder="Enter Email"/>
                                </div >
                                <div className=" row col mt-2">
                                    <label className=" mt-2"  style={{fontWeight:'bold',color:'rgb(16, 117, 149)'}} >Password</label> 
                                    <input id="inputbox1" type="password" required 
                                    className=" col-sm-12 " onChange={this.pass.bind(this)}
                                    placeholder="Enter Password"/>
                                </div >
                                <div className="justify-content-center mt-3" style={{textAlign:'center'}}>
                                    <button onClick={this.login.bind(this)} type="submit" className="btn btn-info">Login</button>
                                </div>
                            </form>
                           
                        </div>
                    </div>    
                </div>   
                    :
                    <div id="displayspinner" style={{display:'block',marginLeft:'45%',marginTop:'20%'}}>
                        <div className="spinner-border text-info ml-2" style={{width:'100px',height:'100px'}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
            </div>
                }
 
            </div>
        );
    }
}
export default Adminlogin;
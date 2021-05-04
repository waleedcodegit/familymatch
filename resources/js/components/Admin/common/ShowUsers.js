import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from  'axios'
import Swal from 'sweetalert2'
import '../css/admin.css'
class ShowUsers extends Component {

    constructor(props) {
        super(props);
        this.state={
            users:[],
            Allusers:[],
            
        }
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key2')
        }
        axios.post('/api/getallusers',senderdata).then(res=>{
            this.setState({
                Allusers:res.data,
                users:res.data
            })
        })
    }

    SearchList(e) {
        let value  = e.target.value;
       
            var updatedList = [];
            var List = this.state.Allusers;
            for(var i=0;i<List.length;i++){
            updatedList = List.filter(
              (item) => Object.keys(item).some(key => item[key].toString().search(value) !== -1)    
            );
    
            }
              this.setState({
                users: updatedList,
              });
    }
    DeleteUser(id,i){
        let senderdata={
            access_token:window.localStorage.getItem('key2'),
            uid:id
        }
        if(confirm("Are Sure to Delete this user")){
            axios.post('/api/deleteuser',senderdata).then(res=>{
            
                var users = this.state.Allusers;
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User Deleted SuccessFully',
                    showConfirmButton: false,
                    timer: 1500
                    })
                users.splice(i,1);
    
                this.setState({
                    users:users
                })
    
    
            });
        }

    }
    render() {
        

        return (
           
                    <div  className="admin-content-card  " >
                        <div  style={{backgroundColor:'#c2f0fc',borderTopLeftRadius:'7px',borderTopRightRadius:'7px'}}>
                                <h3 className="card-title ml-2 mt-1 p-2" style={{color: '#107595',backgroundColor:'#c2f0fc'}}>All Users</h3>
                                
                        </div>
                        <div className="card-body " style={{maxWidth: 'inherit'}}>
                            <div className="mt-2">
                                <input onChange={this.SearchList.bind(this)} className="col-md-3 form-control"
                                 placeholder="Search All Columns"></input>
                            </div>
                            <table 
                          
                              className="table table-bordered table-hover table-striped mt-2 ">
                                <thead>
                                    <tr  style={{fontWeight:'bold'}}>
                                        <td>Sr</td>
                                        <td>User Id</td>
                                        <td>User Name</td>
                                        <td>Email</td>
                                        <td>Role</td>
                                        <td>Added by</td>
                                        <td>Status</td>
                                        <td>Created Date</td>
                                        <td colSpan="2">Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map((data,index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{data.id}</td>
                                                    <td>{data.username}</td>
                                                    <td>{data.email}</td>       
                                                    <td>{data.role == 1 ? 'Administrator' : 'User'}</td>
                                                    <td>{data.added_by}</td>
                                                    <td>{data.status == 1 ? 'Active' : 'Blocked'}</td>
                                                    <td>{data.created_at}</td>
                                                    <td ><Link to={`/adminpanel/EditUser/${data.id}`}><button className="btn btn-warning"> <i style={{color:'#ffffff'}} className="far fa-edit"> </i></button></Link> </td>
                                                    <td> <button  onClick={this.DeleteUser.bind(this,data.id,index)} className="btn btn-light"> <i  style={{color:'red'}} className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div> 
        );
    }
}
export default ShowUsers;
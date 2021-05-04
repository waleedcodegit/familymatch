import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from  'axios'
import Swal from 'sweetalert2'
import '../css/admin.css'
class AllPosts extends Component {

    constructor(props) {
        super(props);
        this.state={
            posts:[],
            Allposts:[],
            
        }
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key2')
        }
        axios.post('/api/get__allposts',senderdata).then(res=>{
            this.setState({
                posts:res.data,
                Allposts:res.data
            })
        })
    }

    SearchList(e) {
        let value  = e.target.value;
       
            var updatedList = [];
            var List = this.state.Allposts;
            for(var i=0;i<List.length;i++){
            updatedList = List.filter(
              (item) => Object.keys(item).some(key => item[key].toString().search(value) !== -1)    
            );
    
            }

              this.setState({
                posts: updatedList,
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
    DeletePost(id,i){
        let senderdata={
            access_token:window.localStorage.getItem('key2'),
            id:id
        }
        if(confirm("Are Sure to Delete this Post")){
            axios.post('/api/delete_post',senderdata).then(res=>{
            
                var Allposts = this.state.Allposts;
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Categories Deleted SuccessFully',
                    showConfirmButton: false,
                    timer: 1500
                    })
                    Allposts.splice(i,1);
    
                this.setState({
                    posts:Allposts
                })
            });
        }

    }
    render() {
        

        return (
           
                    <div  className="admin-content-card  " >
                        <div  style={{backgroundColor:'#c2f0fc',borderTopLeftRadius:'7px',borderTopRightRadius:'7px'}}>
                                <h3 className="card-title ml-2 mt-1 p-2" style={{color: '#107595',backgroundColor:'#c2f0fc'}}>All Posts</h3>
                                
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
                                        <td>Post ID</td>
                                        <td>Image</td>
                                        <td>Post Title</td>
                                        <td>Publish</td>
                                        <td>Views</td>
                                        <td>Created Date</td>
                                        <td colSpan="2">Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.posts.map((data,index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{data.id}</td>
                                                    <td><img style={{width:'80px',height:'50px'}}
                                                     src={img_base+data.image}></img></td>
                                                    <td>{data.title}</td>
                                                    <td>{data.active == 1? 'Published':'No'}</td>
                                                    <td>{data.view}</td>
                                                    <td>{data.created_at}</td>
                                                    <td ><Link to={`/adminpanel/EditPost/${data.id}`}><button className="btn btn-warning"> <i style={{color:'#ffffff'}} className="far fa-edit"> </i></button></Link> </td>
                                                    <td> <button  onClick={this.DeletePost.bind(this,data.id,index)} className="btn btn-light"> <i  style={{color:'red'}} className="fas fa-trash-alt"></i>
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
export default AllPosts;
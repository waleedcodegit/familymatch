import React, { Component } from 'react';
import {Modal} from 'react-bootstrap'
import Swal from 'sweetalert2'
import Axios from 'axios';
import '../css/admin.css'
import {Link} from 'react-router-dom'
class Categories extends Component {
    constructor(props) {
        super(props);
        this.state={
            display_add_modal:false,
            display_edit_modal:false,
            category:'',
            categories:[],
            cid:''
        }
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key2')
        }
        Axios.post('/api/get_categories',senderdata).then(res=>{
            this.setState({
                categories:res.data
            })
        })
    }
    hide_modal(){
        this.setState({
            display_add_modal:false,
            display_edit_modal:false
        })
    }
    display_add_modal(){
        this.setState({
            display_add_modal:true
        })
    }
    display_edit_modal(){
        this.setState({
            display_edit_modal:true
        })
    }
    handlecategory(e){
        this.setState({
            category:e.target.value
        })
    }
    addnewcategory(){
        if(this.state.category != ''){
            let senderdata={
                access_token:window.localStorage.getItem('key2'),
                cat:this.state.category
            }
            Axios.post('/api/add_category',senderdata).then(res=>{ 
                if(res.data != 0){
                    Swal.fire({
                        icon: 'success',
                        title: "Category Added SuccesssFully",
                        showConfirmButton: false,
                        timer: 1000
                      });
                      this.hide_modal();
                      this.componentDidMount();
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: "Category Name Existed Already",
                        showConfirmButton: false,
                        timer: 1000
                      });
                }
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: "Please Enter Category Name",
                showConfirmButton: false,
                timer: 1000
              });
        }
    }
    updatecategory(){
        if(this.state.category != ''){
            let senderdata={
                access_token:window.localStorage.getItem('key2'),
                cat:this.state.category,
                cid:this.state.cid
            }
            Axios.post('/api/Update_category',senderdata).then(res=>{ 
                if(res.data != 0){
                    Swal.fire({
                        icon: 'success',
                        title: "Category Added SuccesssFully",
                        showConfirmButton: false,
                        timer: 1000
                      });
                      this.hide_modal();
                      this.componentDidMount();
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: "Category Name Existed Already",
                        showConfirmButton: false,
                        timer: 1000
                      });
                }
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: "Please Enter Category Name",
                showConfirmButton: false,
                timer: 1000
              });
        }
    }
    edit_category(id){
        let senderdata={
            access_token:window.localStorage.getItem('key2'),
            cid:id
        }
        Axios.post('/api/get_category_by_id',senderdata).then(res=>{
            let data = res.data;
            this.setState({
                category:data.title,
                display_edit_modal:true,
                cid:id
            })

        })
    }
    DeleteCategory(id,i){
        let senderdata={
            access_token:window.localStorage.getItem('key2'),
            cid:id
        }
        if(confirm("Are Sure to Delete this Category")){
            axios.post('/api/delete_category',senderdata).then(res=>{
            
                var categories = this.state.categories;
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Categories Deleted SuccessFully',
                    showConfirmButton: false,
                    timer: 1500
                    })
                    categories.splice(i,1);
    
                this.setState({
                    categories:categories
                })
    
    
            });
        }

    }
    render() {
        return (
            <div className="admin-content-card">
                <div  style={{backgroundColor:'#c2f0fc',borderTopLeftRadius:'7px',borderTopRightRadius:'7px',padding:'3px'}}>
                    <h4 className="card-title ml-2 mt-1" style={{color: '#107595',backgroundColor:'#c2f0fc'}}>Manage Categories</h4>                    
                </div>
                <div className="card-body">
                    <div className="container">
                        <div className="mt-1">
                            <button onClick={this.display_add_modal.bind(this   )} className="btn btn-info">Add Category</button>
                        </div>
                    </div>
                    <div>
                    <table 
                          className="table table-bordered table-hover table-striped mt-2">
                            <thead>
                                <tr  style={{fontWeight:'bold'}}>
                                    <td>Sr</td>
                                    <td>Category Id</td>
                                    <td>Category Ttile</td>
                                    <td>Category Slug</td>
                                    <td>Created Date</td>
                                    <td colSpan="2">Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.categories.map((data,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{data.id}</td>
                                                <td>{data.title}</td>
                                                <td>{data.slug}</td>       
                                                <td>{data.created_at}</td>
                                                <td ><button onClick={this.edit_category.bind(this,data.id)} className="btn btn-warning"> <i style={{color:'#ffffff'}} className="far fa-edit"> </i></button></td>
                                                <td> <button  onClick={this.DeleteCategory.bind(this,data.id,index)} className="btn btn-light"> <i  style={{color:'red'}} className="fas fa-trash-alt"></i>
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
                <Modal show={this.state.display_add_modal}  onHide={this.hide_modal.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container-fluid">
                                <div className=" row col form-group">
                                    <label className=" mt-2 mr-2" style={{fontWeight:'bold',color:'black'}}>Category Name</label> 
                                    <input type="name" required   className="form-control col-sm-6 " onChange={this.handlecategory.bind(this)} placeholder="Category Name"/>
                                </div>
                                <div  className=" mt-2" >
                                    <label className="col-md-1 ml-5 " style={{fontWeight:'bold'}}></label> 
                                    <button onClick={this.addnewcategory.bind(this)} className="btn btn-info ml-3">Save</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal> 
                    <Modal show={this.state.display_edit_modal}  onHide={this.hide_modal.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container-fluid">
                                <div className=" row col form-group">
                                    <label className=" mt-2 mr-2" style={{fontWeight:'bold',color:'black'}}>Category Name</label> 
                                    <input value={this.state.category || " "} type="name" required   className="form-control col-sm-6 " onChange={this.handlecategory.bind(this)} placeholder="Category Name"/>
                                </div>
                                <div  className=" mt-2" >
                                    <label className="col-md-1 ml-5 " style={{fontWeight:'bold'}}></label> 
                                    <button onClick={this.updatecategory.bind(this)} className="btn btn-info ml-3">Save</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>  
            </div>
        );
    }
}

export default Categories;
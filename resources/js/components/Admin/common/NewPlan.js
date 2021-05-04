import React, { Component } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
class NewPlan extends Component {
    constructor(props) {
        super(props);
        this.state={
            Plantitle:'',
            planprice:'',
            planlimit:'',
            texteditor:''
        }
    }
    
    Plantitle(e){
        this.setState({
            Plantitle:e.target.value
        })
    }
    planprice(e){
        this.setState({
            planprice:e.target.value
        })
    }    
    planlimit(e){
        this.setState({
            planlimit:e.target.value
        })
    }
    onsave(e){
        e.preventDefault(); 
        if(this.state.Plantitle !='' && this.state.planprice != '' && this.state.planlimit !='' 
            && this.state.texteditor !=''){
            let senderdata={
                title:this.state.Plantitle,
                price:this.state.planprice,
                limit:this.state.planlimit,
                disc:this.state.texteditor,
                access_token:window.localStorage.getItem('key2')
            }
            Axios.post('/api/newplan',senderdata).then(res=>{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Plan Added Successfully',
                    showConfirmButton: false,
                    timer: 1000
                })
                this.props.history.push('/adminpanel/AllPlans');
            })
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please Fill All The Fields',
                showConfirmButton: false,
                timer: 1000
            })
        }
      
    } 
    handleEditor(e){
        this.setState({
            texteditor:e
        })
    }
    render() {
        return (
            <div className="admin-content-card mt-4">
                    <div  style={{backgroundColor:'#c2f0fc',borderTopLeftRadius:'7px',borderTopRightRadius:'7px'}}>
                        <h4 className="card-title  ml-2 mt-1 p-2" style={{color: '#107595',backgroundColor:'#c2f0fc'}}>Add New Plan</h4>
                    </div>
                   
                    <div className="card-body  " style={{maxWidth: 'inherit',display:'block',paddingLeft:'10%'}}>
                        <h1 className="col-lg-2"></h1>
                        <div className="col-md-10">
                            <div className=" row col form-group">        
                                <label className=" mt-2" style={{fontWeight:'bold'}}>Plan Title</label> 
                                <input type="name" required    className="form-control col-sm-6 " onChange={this.Plantitle.bind(this)} placeholder="Enter  Plan Title"/>
                            </div>
                        

                            <div className=" row col form-group">        
                                <label className=" mt-2" style={{fontWeight:'bold'}}>Plan Price (month)</label> 
                                <input type="name" required    className="form-control col-sm-6 " onChange={this.planprice.bind(this)} placeholder="Enter  Plan Price"/>
                            </div>
                        

                            <div className=" row col form-group">        
                                <label className=" mt-2" style={{fontWeight:'bold'}}>Plan Limit (months)</label> 
                                <input type="name" required    className="form-control col-sm-6 " onChange={this.planlimit.bind(this)} placeholder="Enter  Plan Limit"/>
                            </div> 
                            <div id="#plans_editor" className=" row col form-group col-md-12">        
                                <label className=" mt-2" style={{fontWeight:'bold'}}>Plan Description (body)</label> 
                                <ReactQuill theme="snow" value={this.state.texteditor} 
                                onChange={this.handleEditor.bind(this)} className="plans_editor " />
                            </div> 
                            <div className="plans-btn">
                            <button onClick={this.onsave.bind(this)} className="btn btn-success">Save</button> 
                            </div>
                            
                        </div>
                    </div>
                </div>                
        );
    }
}
export default NewPlan;
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from  'axios'

class ShowPlans extends Component {

    constructor(props) {
        super(props);
        this.state={
            plans:[],
            groupname:'',
            showaddgroupdiv:false
        }
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key2')
        }
        axios.post('/api/get_plans',senderdata).then(res=>{
            this.setState({
                plans:res.data
            })
        })
    }


  
    setgroupname(e){
        this.setState({

            groupname:e.target.value
        })
    }

    setaddgroupshow(value){
       
        this.setState({

            showaddgroupdiv:value
        })
    }
    DeletePlan(id,i){
        let senderdata={
            access_token:window.localStorage.getItem('key2'),
            id:id
        }
        if(confirm("Are You Sure to delete this Plan")){
            axios.post('/api/delete_plan/',senderdata).then(res=>{

            
          
                var mygroups = this.state.plans;
                mygroups.splice(i,1);
                this.setState({
                    plans:mygroups
                })
    
    
            });
        }

    }
    render() {
        

        return (
            <div className="admin-content-card">
                        <div  style={{backgroundColor:'#c2f0fc',borderTopLeftRadius:'7px',borderTopRightRadius:'7px'}}>
                                <h4 className="card-title ml-2 mt-1 p-2" style={{color: '#107595',backgroundColor:'#c2f0fc'}}>All Plans</h4>
                                
                        </div>
                        <div className="card-body " style={{maxWidth: 'inherit'}}>
                            <table 
                             style={{border:'2px solid #00bcd4'}}
                              className="table table-bordered table-hover table-striped ">
                                <thead>
                                    <tr  style={{fontWeight:'bold'}}>
                                        <td>Sr</td>
                                        <td>Plan Id</td>
                                        <td>Plan Title</td>
                                        <td>Plan Price</td>
                                        <td>Plans Limit(months)</td>
                                        <td colSpan="2">Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.plans.map((data,index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{data.id}</td>
                                                    <td>{data.title}</td>
                                                    <td>$ {data.price}</td>
                                                    <td>{data.limit}</td>
                                                    <td ><Link to={`/adminpanel/EditPlan/${data.id}`}><button className="btn btn-warning"> <i style={{color:'#ffffff'}} className="far fa-edit"> </i></button></Link> </td>
                                                    <td> <button className="btn btn-light"> <i  style={{color:'red'}} onClick={this.DeletePlan.bind(this,data.id,index)} className="fas fa-trash-alt"></i>
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
export default ShowPlans;
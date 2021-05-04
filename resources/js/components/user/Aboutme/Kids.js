import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import Swal from 'sweetalert2'

class Kids extends Component {
    constructor(props) {
        super(props);
        this.state={
            marital_status:[
                {check:0,name:' Never Married'},
                {check:0,name:'Widow Widower'},
                {check:0,name:'Currently Separated'},
                {check:0,name:'Divorced'},
            ],
           has_kids:[
                {check:0,name:' Yes and they sometimes live at home'},
                {check:0,name:' No'},
                {check:0,name:' Yes and they live away from home'},
                {check:0,name:' Yes and they live at home'},
            ],
            uid:this.props.user.uid
        }
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key1')
        }
        Axios.post('/api/get_kids/'+this.state.uid,senderdata).then(res=>{
            let kids = this.state.has_kids;
            let marital_status = this.state.marital_status;
            let data = res.data[0];

            marital_status[0].check = data.fm_Never_Married
            marital_status[1].check = data.fm_Widow_Widower
            marital_status[2].check = data.fm_Currently_Separated
            marital_status[3].check = data.fm_Divorced
            kids[0].check = data.fh_Yes_and_they_sometimes_live_at_home
            kids[1].check = data.fh_No
            kids[2].check = data.fh_Yes_and_they_live_away_from_home
            kids[3].check = data.fh_Yes_and_they_live_at_home
            this.setState({
                has_kids:kids,
                marital_status:marital_status
            })
        })
    }
    has_kids(id){
        let exer = this.state.has_kids;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            has_kids:exer
        })  
    }
    marital_status(id){
        let exer = this.state.marital_status;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            marital_status:exer
        })  
    }
    save_kids(e){
        e.preventDefault();
        let senderdata={
            uid:this.state.uid,
            haskids:this.state.has_kids,
            marital_status:this.state.marital_status,
            access_token:window.localStorage.getItem('key1')
        }
        Axios.post('/api/kids',senderdata).then(res=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your Kids Answers Updated SuccessFully',
                showConfirmButton: false,
                timer: 1300
              })
        })
    }
    
    render() {
        return (
            <div id="about-me-content">
                <br />
                <h5>MARITAL STATUS</h5>

                <br />

                <div className="row">
                {
                     this.state.marital_status.map((data,index)=>{
                         return(
                            <div key={index} className="col-md-6">
                                <div className="radio">
                                    <label>
                                        <input onChange={this.marital_status.bind(this,index)} type="radio" name="marital_status" checked={data.check == 1}/>
                                        {data.name}
                                    </label>
                                </div>
                            </div>
                         )
                     })
                 }
                </div>

                <h5>Has Kids</h5>

                <br />
                <div className="row">
                {
                     this.state.has_kids.map((data,index)=>{
                         return(
                            <div key={index} className="col-md-6">
                                <div className="radio">
                                    <label>
                                        <input onChange={this.has_kids.bind(this,index)} type="radio" name="has_kids" checked={data.check == 1}/>
                                        {data.name}
                                    </label>
                                </div>
                            </div>
                         )
                     })
                 }
                </div>
                <button onClick={this.save_kids.bind(this)} className="btn save-btn">Save</button>

            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Kids);
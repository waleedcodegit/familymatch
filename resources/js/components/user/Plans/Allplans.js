import React, { Component } from 'react';
import Axios from 'axios';

class Allplans extends Component {
    constructor(props) {
        super(props);
        this.state={
            plans:[]
        }
    }
    
    componentDidMount(){
        Axios.post('/api/get_plans').then(res=>{
            console.log(res);
            this.setState({
                plans:res.data
            })
        })
    }
    render() {
        return (
            <div className="container-fluid bg-gradient p-5 ">
                <div className="row m-auto text-center w-75">
                    {
                        this.state.plans.map((data,index)=>{
                            return(
                                <div key={index} className="col-sm-4 princing-item red">
                                    <div className="pricing-divider ">
                                        <h3 className="text-light">{data.title}</h3>
                                        <h4 className="my-0 display-2 text-light font-weight-normal mb-3"><span className="h3">$</span> {data.price} <span className="h5">/mo</span></h4> <svg className='pricing-divider-img' enableBackground='new 0 0 300 100' height='100px' id='Layer_1' preserveAspectRatio='none' version='1.1' viewBox='0 0 300 100' width='300px' x='0px' xmlSpace='preserve' y='0px'>
                                            <path className='deco-layer deco-layer--4' d='M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428	c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z' fill='#FFFFFF'></path>
                                        </svg>
                                    </div>
                                    <div className="card-body bg-white mt-0 shadow">
                                        <ul className="list-unstyled mb-5 position-relative " >
                                          <div className="innerhtml" dangerouslySetInnerHTML={{ __html: data.discription}}></div> 
                                        </ul> <button type="button" className="btn btn-lg btn-block btn-custom ">Sign up </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Allplans;
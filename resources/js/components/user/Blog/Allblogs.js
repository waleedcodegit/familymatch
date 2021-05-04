import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom'
import { img_base } from '../../Configs/Env';

class Allblogs extends Component {
    constructor(props) {
        super(props);
        this.state={
            posts:[]
        }
    }
    componentDidMount(){
        Axios.post('/api/get_posts').then(res=>{
            console.log(res);
            this.setState({
                posts:res.data
            })
        })
    }
    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    { 
                        this.state.posts.map((data,index)=>{
                            return(
                                <div key={index} className=" col-md-3 p-2">
                                    <Link to={"/profile/blog/"+data.slug}>
                                        <div className="post-card">
                                            <img src={img_base+data.image}></img>
                                            <div className="post-title">
                                                <h1>{data.title}</h1>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>                
            </div>
        );
    }
}

export default Allblogs;
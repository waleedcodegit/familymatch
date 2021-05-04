import React, { Component } from 'react';
import Axios from 'axios';
import { img_base } from '../../Configs/Env';

class blog extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:'',
            image:'noimage.png',
            body:'',
            views:'',
            created_date:''
        }
    }
    
    componentDidMount(){
        let senderdata={
            slug:this.props.match.params.slug
        }
        console.log(senderdata);
        Axios.post('/api/get_post_by_slug',senderdata).then(res=>{
            console.log(res);
            this.setState({
                title:res.data.title,
                body:res.data.body,
                image:res.data.image,
                created_date:res.data.created_at,
                views:res.data.view
            })
        })
    }
    render() {
        return (
            <div className="container">
                <div className="col-md-8 single_post_card">
                    <h1>{this.state.title}</h1>
                    <img src={img_base+this.state.image}></img>
                    <p className="text-secondary date_text">{this.state.created_date}
                        <span className="view_text ml-3" ><i className="far fa-eye">  {this.state.views}</i></span>
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: this.state.body}}>

                </div>
                </div>
            </div>
        );
    }
}

export default blog;
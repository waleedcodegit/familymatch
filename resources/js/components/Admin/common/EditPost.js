import React, { Component } from 'react';
import Axios from 'axios'
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { img_base } from '../../Configs/Env';
class EditPosts extends Component {
    constructor(props) {
        super(props);
        this.state={
            categories:[],
            editortext:'',
            editorState:true,
            url:img_base+'noimage.png',
            imageArray: [],
            body: '',
            category:'',
            posttitle:'',
            active:0,
            image_name:''
        }
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key2'),
            id:this.props.match.params.id
        } 
        Axios.post('/api/get_categories',senderdata).then(res=>{
            this.setState({
                categories:res.data
            })
        })
        Axios.post('/api/get_post_by_id',senderdata).then(res=>{
            let data = res.data;
            this.setState({
                posttitle:data.title,
                category:data.cat_id,
                editortext:data.body,
                image_name:data.image,
                url:img_base+data.image,
                active:data.active
            })
        })

    }
    handleFileChange(e){
      
        const files = Array.from(e.target.files);

        const promises = files.map(file => {
            return (new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.addEventListener('load', (ev) => {
                    resolve(ev.target.result);
                });
                reader.addEventListener('error', reject);
                reader.readAsDataURL(file);
                
            }))
        });

        Promise.all(promises).then(images => {
            this.setState({
                imageArray: images,
                url:images[0]
            })
        }, error => { console.error(error); });
    
    if (this.props.onChange !== undefined) {
        this.props.onChange(e);
    }
}
    handlesave() {
     
        // this.postData();
        const formData = new FormData();
        let imageflag = 0;
        this.state.imageArray.forEach((image_file) => {
            formData.append('file[]', image_file);
            imageflag=1;
        });
        formData.append('body', this.state.body);

        formData.append('access_token',window.localStorage.getItem('key2'));
        formData.append('title', this.state.posttitle);
        formData.append('body', this.state.editortext);
        formData.append('category', this.state.category);
        formData.append('imageflag', imageflag);
        formData.append('id', this.props.match.params.id);
        formData.append('image_name', this.state.image_name);
        formData.append('active', this.state.active == 1 ? 1 : 0);
        if( this.state.posttitle
            != 0 && this.state.category!= 0 && this.state.editortext !=''){
            axios.post('/api/update_post',formData)
            .then(response => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Post Updated Successfully',
                    showConfirmButton: false,
                    timer: 1000
                })
                this.props.history.push('/adminpanel/AllPosts');
            
        });
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please Fill All The Fields',
                showConfirmButton: false,
                timer: 1000
            })
            
        }
        
        this.setState({
            body: ''
        });
        }
    handleEditor(e){
        this.setState({
            editortext:e
        })
    }
    category(e){
        this.setState({
            category:e.target.value
        })
    }
    posttitle(e){
        this.setState({
            posttitle:e.target.value
        })
    }
    active(){
        this.setState({
            active:1
        },function(){
            this.handlesave();
        })

    }
    un_publish(){
        this.setState({
            active:0
        },function(){
            this.handlesave();
        })
    }
    render() {
        return (
            <div className="admin-content-card">
                <div  style={{backgroundColor:'#c2f0fc',borderTopLeftRadius:'7px',borderTopRightRadius:'7px',padding:'3px'}}>
                    <h4 className="card-title ml-2 mt-1" style={{color: '#107595',backgroundColor:'#c2f0fc'}}>Edit Post</h4>                    
                </div>
                <div className="card-body posts">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <input value={this.state.posttitle || " "} onChange={this.posttitle.bind(this)} className="form-control col-md-12 font-weight-bold" placeholder="Post Title"></input>
                            </div>
                            <h1 className="col-md-1"></h1>
                            <div className="col-md-3">
                                <select value={this.state.category || " "} onChange={this.category.bind(this)} className="form-control" >
                                    <option>Select Category</option>
                                    {
                                        this.state.categories.map((data,index)=>{
                                            return(
                                                <option value={data.id} key={index}>{data.title}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                       <div className="row mt-4">
                        <div className="col-md-8  posts_editor">
                                <ReactQuill theme="snow" value={this.state.editortext} 
                                onChange={this.handleEditor.bind(this)} className="posts_editor" />
                            </div>
                            <h1 className="col-md-1"></h1>
                            <div className="col-md-3 side-image">
                                <img src={this.state.url}></img>
                                <input onChange={this.handleFileChange.bind(this)} type="file" className="form-control"></input>
                            </div>
                       </div>
                       <div className="row ml-1">
                        <div className="mt-2">
                            <button onClick={this.active.bind(this)} className="btn btn-info ">Save & Publish</button>
                        </div>
                        <div className="mt-2 ml-2">
                            <button onClick={this.un_publish.bind(this)} className="btn btn-primary ">Save & Un-Publish</button>
                        </div>
                        
                       </div>
                    </div>
                </div>
            </div>        
        );
    }
}

export default EditPosts;
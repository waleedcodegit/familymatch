import React, { Component } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Swal from 'sweetalert2'
import {connect} from 'react-redux';
import axios from 'axios'
import ImageCrop from 'react-image-crop-component';
import 'react-image-crop-component/style.css';
import { img_base } from '../Configs/Env';
class Photo extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: "upload-photo",
            imageArray: [],
            body: '',
            posts: [],
            preview_url:'',
            preview_url2:'',

            crop: {
                unit: 'px', // default, can be 'px' or '%'
                x: 130,
                y: 50,
                width: 200,
                height: 200
              },
            uid:this.props.user.uid,
            user_images:[]
        };
       
    }
    componentDidMount(){
        let senderdata = {
            access_token:window.localStorage.getItem('key1')
          }
        axios.post('/api/get_images_by_user_id/'+this.state.uid,senderdata).then(res=>{
            this.setState({
                user_images:res.data
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
                    preview_url:images[0]
                })
            }, error => { console.error(error); });
        
        if (this.props.onChange !== undefined) {
            this.props.onChange(e);
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        // this.postData();
        const formData = new FormData();
        this.state.imageArray.forEach((image_file) => {
            formData.append('file[]', image_file);
        });
        formData.append('body', this.state.body);
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }
        formData.append('access_token',window.localStorage.getItem('key1'));
        if(this.state.imageArray.length != 0){
            axios.post('/api/upload_profile_photo/'+this.state.uid, formData)
            .then(response => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Image Uploaded Successfully',
                    showConfirmButton: false,
                    timer: 1000
                  })
                  window.location.reload();
        });
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please Select An Image First',
                showConfirmButton: false,
                timer: 1000
              })
             
        }
        
        this.setState({
            body: ''
        });
    }
    onchange_crop(crop){
        this.setState({
            crop:crop
        },function (){
        })

    }
   
     getCroppedImg(image, pixelCrop, fileName) {
        
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');
        var imag = new Image();
        imag.src = image;
        imag.onload = function() {
            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
               
              );
        }
        
       
        // As Base64 string
        // const base64Image = canvas.toDataURL('image/jpeg');
       
        // As a blob
        return new Promise((resolve, reject) => {
          canvas.toBlob(file => {
            file.name = fileName;
            resolve(file);
          }, 'image/jpeg');
        });
      }
      use_as_dp(name){
        let senderdata = {
            access_token:window.localStorage.getItem('key1')
          }  
        axios.post('/api/use_as_dp/'+name+'/'+this.state.uid,senderdata).then(res=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'SuccessFully Dp Updated',
                showConfirmButton: false,
                timer: 1000
              })
              window.location.reload();
        })
      }
      Delete_Image(id){
          let senderdata = {
            access_token:window.localStorage.getItem('key1')
          }
        axios.post('/api/delete_image/'+id,senderdata).then(res=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Image Deleted SuccessFully',
                showConfirmButton: false,
                timer: 1000
              })
              window.location.reload();
        })
      }
    render() {
        return (
            <div className="container">
                <div className="card content-card">
                    <p id="header-title">Photo</p>
                    <p id="header-sub-title">Add a nice photo of yourself or your family for your profile.</p>
                        <div className="row">
                        <h1 className="col-md-2"></h1>
                        <div className="col-md-10 row">
                            {
                                this.state.user_images.map((data,index)=>{
                                    return(
                                        <div key={index} className="col-md-4">
                                        <div  className="card ml-3  mt-2" style={{border:'1px solid gray'}}>
                                            <img className="mt-2" src={img_base+data.name} style={{width:'70%',height:'70%',borderRadius:'50%',display:'block',margin:'0 auto'}}></img>
                                        </div>
                                        <div className="row ml-3">
                                        <a className="mr-1" onClick={this.use_as_dp.bind(this,data.name)}  style={{fontSize:'12px'}} href="#">Use as Dp </a> -
                                        <a className="ml-1" onClick={this.Delete_Image.bind(this,data.id)} style={{fontSize:'12px'}} href="#">Delete </a>
                                        </div>

                                        </div>
                                    )
                                })
                            }
                           
                         </div>   
                        </div>
                      <div className="row mt-3">
                        <h1 className="col-md-2"></h1>
                        <div className="col-md-8">
                        <div className=" image-upload ">
                        <ReactCrop src={this.state.preview_url?this.state.preview_url:img_base+'default-photo.jpg'}
                        onChange={this.onchange_crop.bind(this)} crop={this.state.crop}
                        style={{height: 400, width: '100%'}}
                        />
                   

                           <img src={this.state.preview_url2}></img>
                        <input type="file" style={{width:'100%'}} className="file-upload"  onChange={this.handleFileChange.bind(this)} />

                    <button className=" btn img-save-btn" style={{width:'100%'}} onClick={this.handleSubmit.bind(this)}>Upload</button>
                        </div>
                    </div>
                    </div>  
   
                   

                    
                            
                </div>
            </div>        
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Photo);
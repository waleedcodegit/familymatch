export default class Mediahandler {
    getPermissions(){
        return new Promise((res,rej)=>{
            navigator.mediaDevices.getUserMedia({video:true , audio: true})
            .then(stream=>{
                console.log(stream);
                res(stream)
            }).catch(e =>{
                throw new   Error(`Unable to fetch stream ${e}`);
            })
        })
    }
}
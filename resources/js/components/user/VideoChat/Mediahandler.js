export default class Mediahandler {
      getPermissions () {
const constraints = {
        'audio': {'echoCancellation': true},
        'video': {
            'width': {'min':' 100%'},
            'height': {'min':' 100%'}
            }
        }
        return new Promise((res,rej)=>{
             navigator.mediaDevices.getUserMedia(constraints)
            .then(stream=>{
                res(stream)
            }).catch(e =>{
                throw new   Error(`Unable to fetch stream ${e}`);
            })
        })
    }
}
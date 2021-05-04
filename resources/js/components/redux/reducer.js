
const current_state = {
    user:[],
}
const reducer = (state = current_state,action) =>{
    if(action.type == 'CHANGE_USER'){
        return {
            ...state,
            user:action.payload
        }
    }
    return state;
}

export default reducer;
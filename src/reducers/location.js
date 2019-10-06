export default function location(state='shangHai',action){
    switch (action.type) {
        case 'CHANGE_LOCATION':
            return action.payload
        default:
            return state;
    }
}
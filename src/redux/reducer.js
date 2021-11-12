import { SET_HOUSES, SET_STREETS, SET_FLATS, SET_RESIDENTS, SET_STREET, SET_HOUSE, SET_FLAT, SET_RESIDENT, SET_MODAL, SET_REQUEST_STATUS} from "./actions/actionTypes";

const initialState ={
    streets:[],
    houses:[],
    flats:[],
    residents:[],
    street:null,
    house:null,
    flat:null,
    resident:null,
    modal:{
        title:"",
        isOpened:false,
        type:"add"
    },
    request:null
};

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_STREETS:
            return {
                ...state,
                streets:action.value,
                houses:[],
                flats:[],
                residents:[],
                street:null,
                house:null,
                flat:null,
                resident:null
            }
        case SET_HOUSES:
            return {
                ...state,
                houses:action.value,
                flats:[],
                residents:[],
                house:null,
                flat:null,
                resident:null               
            }
        case SET_FLATS:
            return {
                ...state,
                flats:action.value,
                residents:[],
                flat:null,
                resident:null
            }
        case SET_RESIDENTS:
            return {
                ...state,
                residents:action.value
            }
        case SET_STREET:
            return {
                ...state,
                street:action.value
            }
        case SET_HOUSE:
            return {
                ...state,
                house:action.value
            }
        case SET_FLAT:
            return {
                ...state,
                flat:action.value
            }  
        case SET_RESIDENT:
            return {
                ...state,
                resident:action.value
            }                 
        case SET_MODAL:
            return {
                ...state,
                resident:action.value.isOpened?state.resident:null,
                modal:action.value
            }
        case SET_REQUEST_STATUS:
            return {
                ...state,
                request:action.value,
                resient:null
            }  
        default:
            return state;
    }
}

export default reducer;
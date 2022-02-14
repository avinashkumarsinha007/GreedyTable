import { DATE_RANGE, GET_APP_DATA_REQUEST, GET_APP_DATA_SUCCESS, GET_TABLE_DATA_FAILURE, GET_TABLE_DATA_REQUEST, GET_TABLE_DATA_SUCCESS, SET_COLUMN, SET_FILTER, SET_SORTED } from "./actionType"
import axios from "axios";

const getTableDataRequest = () => {
    return{
        type:GET_TABLE_DATA_REQUEST
    }
}
 const getTableDataSuccess=(payload)=>{
    return{
        type:GET_TABLE_DATA_SUCCESS,
        payload
    }
}
 const getTableDataFailure=(payload)=>{
    return{
        type:GET_TABLE_DATA_FAILURE,
        payload
    }
}

const getAppDataRequest = () => {
    return{
        type:GET_APP_DATA_REQUEST
    }
}
 const getAppDataSuccess=(payload)=>{
    return{
        type:GET_APP_DATA_SUCCESS,
        payload
    }
}
 const getAppDataFailure=(payload)=>{
    return{
        type:GET_TABLE_DATA_FAILURE,
        payload
    }
}

export const getTableData=(date)=>(dispatch)=>{
    dispatch(getTableDataRequest());
    axios.get(`https://go-dev.greedygame.com/v3/dummy/report?startDate=${date.startDate}&endDate=${date.endDate}`)
        .then(res => {
            dispatch(getTableDataSuccess(res.data.data))
        })
            
    .catch(err=>dispatch(getTableDataFailure(err)));
}

export const getAppData=(date)=>(dispatch)=>{
    dispatch(getAppDataRequest());
    axios.get(` https://go-dev.greedygame.com/v3/dummy/apps `)
        .then(res => {
            dispatch(getAppDataSuccess(res.data.data))
            dispatch(getTableData(date));
        })
            
    .catch(err=>dispatch(getAppDataFailure(err)));
}

export const setDateRange=(payload)=>{
    return{
        type:DATE_RANGE,
        payload
    }
}

export const setColumn=(payload)=>{
    return{
        type:SET_COLUMN,
        payload
    }
}

export const setSorted=(payload)=>{
    return{
        type:SET_SORTED,
        payload
    }
}

export const setFilter=(payload)=>{
    return{
        type:SET_FILTER,
        payload
    }
}


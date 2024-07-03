import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "../constants";


// e.g
export const fetchDataRequest = () => ({
    type: FETCH_DATA_REQUEST,
  });
  
  export const fetchDataSuccess = (data:any) => ({
    type: FETCH_DATA_SUCCESS,
    payload: data,
  });


export const fetchDataFailure = (error:any) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});
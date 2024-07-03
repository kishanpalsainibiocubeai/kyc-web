import { takeEvery } from "redux-saga/effects";
import { FETCH_DATA_REQUEST } from "../constants";
import { fetchDataSaga } from "./dashboardSagas";



// Root Saga
export default function* rootSaga() {
    // yield takeEvery(FETCH_DATA_REQUEST, fetchDataSaga);
    // yield takeEvery(POST_DATA_REQUEST, postDataSaga);
    
  yield takeEvery(FETCH_DATA_REQUEST, fetchDataSaga);
  }

import { takeEvery, call, put, ForkEffect, take } from 'redux-saga/effects';
// import { FETCH_DATA_REQUEST, fetchDataSuccess } from './actions';

// import { call } from "assert";
import { fetchDataSuccess } from "../actions/dashboardAction";
import { FETCH_DATA_REQUEST } from "../constants";
import { AxiosResponse } from 'axios';

// Simulating an API call
const fetchApiData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['item1', 'item2', 'item3']);
    }, 1000);
  });
};

export function* fetchDataSaga():any {
  try {
    // should mention type AxiosResponse<ITodo[]>
    const data = yield call(fetchApiData);
    yield put(fetchDataSuccess(data));
  } catch (error) {
    // Handle error here if needed
  }
}

// function* watchFetchDataRequest(): any {
//   yield takeEvery(FETCH_DATA_REQUEST, fetchDataSaga);
// }

// export default watchFetchDataRequest;

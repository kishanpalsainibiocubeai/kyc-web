import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import dataReducer from './reducers/dashboardReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './sagas/RootSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with saga middleware
const store = createStore(
  dataReducer,
  composeWithDevTools(
    // other store enhancers if any
    applyMiddleware(sagaMiddleware)
    )
  // applyMiddleware(sagaMiddleware)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;

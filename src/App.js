import React from 'react';
import { View ,  NativeAppEventEmitter,} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './Reducers';
import Router from './router';
import NewAlarm from './View/NewAlarm';

const App = () => {
  return(
      <Provider store={createStore(reducers)} >
      <Router  />
      </Provider>
  );
};


export default App;

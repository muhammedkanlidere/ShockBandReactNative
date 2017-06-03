
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeAppEventEmitter,
} from 'react-native';
import App from './src/App';

export default class shockBand extends Component {
  render() {
    return (
      <App style={{flex:1}}/>
    );
  }
}


AppRegistry.registerComponent('shockBand', () => shockBand);

import React, { Component } from 'react';
import { View, AsyncStorage,TouchableOpacity,Text } from 'react-native';
import {Grid, Col, Row} from 'react-native-elements';
import { Actions } from  'react-native-router-flux';
import OrangeAlarm from './OrangeAlarm';

class AlarmScreenContainer extends Component {


/*componentDidMount(){
        AsyncStorage.removeItem("blue");
        AsyncStorage.removeItem("orange");
        AsyncStorage.removeItem("red");
        AsyncStorage.removeItem("green");
        AsyncStorage.removeItem("silver");
        AsyncStorage.removeItem("asphalt");

  }*/
  static renderRightButton = (props) => {
          return (
              <TouchableOpacity onPress={() => Actions.Setting()}>
                  <Text>Settings</Text>
              </TouchableOpacity>
          );
    }
  render(){
    return(
      <View style={{flex:1}}>
      <Grid>
        <Col>
          <Row>
          <OrangeAlarm
          classname="orange"
          backgroundColor="#ffb682" />
          </Row>
          <Row>
          <OrangeAlarm
          classname = "red"
          backgroundColor = '#f46161' />
          </Row>
          <Row>
          <OrangeAlarm
          classname = "green"
          backgroundColor = '#1abc9c' />
          </Row>

        </Col>
        <Col>
          <Row>
          <OrangeAlarm
          classname = "silver"
          backgroundColor = '#bdc3c7' />
          </Row>
          <Row>
          <OrangeAlarm
          classname = "blue"
          backgroundColor = '#2980b9' />
          </Row>
          <Row >
          <OrangeAlarm
          classname = "asphalt"
          backgroundColor = '#34495e' />
          </Row>

        </Col>

      </Grid>
      </View>
    );
  };
}

export default AlarmScreenContainer;

import React, {Component} from 'react';
import {View , Text ,DatePickerIOS,AsyncStorage} from 'react-native';
import {Icon, Button } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import BleControl from './BleControl';
var _ = require('lodash');

class OrangeAlarm extends Component{

  state = {
    date: this.props.date,
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
    classname : "test",
    alarm : "null",
    hasAlarm : false
  };
  componentDidMount() {
   this._loadInitialState().done();
   console.log("loaded");
   this.timerID = setInterval(
     () => this.onDateChange(new Date()),
     1000
   );

    }


 async _loadInitialState() {
   try {
     var value = await AsyncStorage.getItem(this.props.classname);
     console.log(value);
     if (value !== null){
       this._appendAlarm(value);
     }
   } catch (error) {
     console.log(error.message);
   }
 }

  static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  };

    componentWillUnmount() {
      clearInterval(this.timerID);
    }


  onDateChange = (date) => {
    this.setState({date: date});
  };

  _appendAlarm(value) {
    var alarmValue = _.split(value , ':', 2);
   this.setState({alarm: alarmValue, hasAlarm: true});
 }

 _isAlarmTime(){
   var date = _.split(this.state.date.toLocaleTimeString(),':',2);
   if(this.state.alarm[0] == date[0] && this.state.alarm[1] == date[1]){
     return true;
   }else{
     return false;
   }

 }


  render(){
    if(!this.state.hasAlarm){
      return(
        <View style={{backgroundColor: this.props.backgroundColor, flex :1, alignItems:'center',justifyContent:'center',borderColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomWidth:2,}}>
        <Icon
        name ='md-add-circle'
        type='ionicon'
        color= '#2ecc71'
        size = {45}
        onPress={()=>Actions.newAlarm({classname : this.props.classname})}
        />
        </View>
      )
    }else if(this._isAlarmTime()){
      return(
          <View style={{backgroundColor: this.props.backgroundColor, flex: 1, alignItems:'center',justifyContent:'center',borderColor: 'rgba(0, 0, 0, 0.2)',
          borderBottomWidth:2}}>
          <BleControl />
          </View>
      );
    }
    else{
      return(
          <View style={{backgroundColor: this.props.backgroundColor, flex: 1, alignItems:'center',justifyContent:'center',borderColor: 'rgba(0, 0, 0, 0.2)',
          borderBottomWidth:2}}>
            <Text style = {styles.alarmText}>  {this.state.alarm[0]} : {this.state.alarm[1]} </Text>
            <View style= {{alignItems: 'center', justifyContent: 'flex-end'}} >
              <Icon
              reverse
              name='ios-alarm'
              type='ionicon'
              color='#517fa4'
              size = {22}
              />
              </View>

          </View>
      );
    }

  };

}

const styles = {
  containerStyle: {
    flex:1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth:2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth:2,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  alarmText : {
    fontSize : 39,
    color : '#fff'
  }
}

export default OrangeAlarm;

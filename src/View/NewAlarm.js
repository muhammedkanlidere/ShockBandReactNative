import React, {Component} from 'react';
import {View, Text ,DatePickerIOS, AsyncStorage} from 'react-native';
import { Card,Button } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

class NewAlarm extends Component {

  static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  };

  state = {
    date: this.props.date,
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
  };

  onDateChange = (date) => {
    this.setState({date: date});
  };

  _setAlarm(date){

      console.log(date);
      AsyncStorage.setItem(this.props.classname, date, function(){
        console.log("succesfully added");
      });

      Actions.alarmContainer();
  }

  render(){
    return(
        <View style={styles.containerStyle}>
        <Card
        title="New Alarm">
        <DatePickerIOS
      date={this.state.date}
      mode="time"
      timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
      onDateChange={this.onDateChange}
      minuteInterval={1}
        />
        <Button
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 8, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title= "Set New Alarm"
        onPress ={() => this._setAlarm(this.state.date.toLocaleTimeString())}
         />
        </Card>
         </View>
    );
  };

}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#e74c3c'
  }
}

export default NewAlarm;

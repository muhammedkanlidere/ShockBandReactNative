import React from 'react';
import { Scene , Router} from 'react-native-router-flux';
import NewAlarm from './View/NewAlarm';
import Settings from './View/Settings';
import AlarmContainer from './View/AlarmScreenContainer';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{paddingTop: 60}}>
        <Scene key="alarmContainer"  component={AlarmContainer} title="Alarms"/>
        <Scene key="newAlarm" component={NewAlarm} title ="New Alarm"/>
        <Scene key="Setting" component={Settings} title ="Settings"/>

    </Router>

  );

};

export default RouterComponent;

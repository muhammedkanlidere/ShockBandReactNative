import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  Platform,
  PermissionsAndroid
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {Icon, Button } from 'react-native-elements';

var base64 = require('base64-js');

class Setting extends Component {

    constructor(){
        super()

        this.state = {
            ble:null,
            scanning:false,
            isConnect:false,
            connectedDevice : null,
            readedData:null
        }
    }

    componentDidMount() {
        BleManager.start({showAlert: false});
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);

        NativeAppEventEmitter
            .addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                  console.log("Permission is OK");
                } else {
                  PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                    if (result) {
                      console.log("User accept");
                    } else {
                      console.log("User refuse");
                    }
                  });
                }
          });
        }
    }

    handleScan() {
        BleManager.scan([], 30, false)
            .then((results) => {console.log('Scanning...'); });
    }
    handleStopScan(){
          BleManager.stopScan()
      .then(() => {
        // Success code
        this.setState({scanning:false});
        console.log('Scan stopped');
      });
    }

    toggleScanning(bool){
        if (bool) {
            this.setState({scanning:true})
            this.scanning = setInterval( ()=> this.handleScan(), 3000);
        } else{
            this.setState({scanning:false, ble: null})
            clearInterval(this.scanning);
        }
    }

    handleDiscoverPeripheral(data){
        console.log('Got ble data', data);
        this.setState({ ble: data })
        if(data.name == "HMSoft"){
            this.connectDevice(data.id);
            this.handleStopScan();
        }

    }

    readData(){
      BleManager.read(this.state.connectDevice.id, 'FFE0', 'FFE1')
        .then((readData) => {
          // Success code
          this.setState({readedData: readData});
          console.log('Read: ' + readData);
        })
        .catch((error) => {
          // Failure code
          console.log(error);
        });
        <Text >{this.state.readedData != null ? this.state.readedData : null } </Text>
          }

    sendData(){
      var byte = new Uint32Array(1);
      byte[0] = 5;
      var data = base64.fromByteArray(byte);
              BleManager.writeWithoutResponse(this.state.connectDevice.id, 'FFE0', 'FFE1', data)
        .then(() => {
          // Success code
          console.log('Writed: ' + data);
        })
        .catch((error) => {
          // Failure code
          console.log(error);
        });
    }

    connectDevice(deviceId){
      BleManager.connect(deviceId)
          .then((peripheralInfo) => {
        // Success code
        this.setState({isConnect:true});
        console.log('Connected');
        console.log(BleManager.checkState());
        this.setState({connectDevice:peripheralInfo});
        console.log(peripheralInfo);
      })
      .catch((error) => {
        // Failure code
        console.log(error);
      });
    }

    render() {

        const container = {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#e74c3c',
        }

        const bleList = this.state.ble
            ? <Text> Device found: {this.state.ble.name} </Text>
            : <Text>no devices nearby</Text>

        return (
            <View style={container}>
              <View style={{justifyContent:'space-around'}}>
              <View style={{marginBottom:15}}>
              <Button
                raised
                icon={{name: 'ios-paw', type: "ionicon", size: 32}}
                buttonStyle={{backgroundColor: '#f39c12', borderRadius: 10}}
                textStyle={{textAlign: 'center'}}
                title={`Scaning bluetooh ${this.state.scanning?'on':'off'}`}
                onPress={() => this.toggleScanning(!this.state.scanning) } />
                </View>
                <View style={{marginBottom:15}}> 
                <Button
                  raised
                  icon={{name: 'ios-flash', type: "ionicon", size: 32}}
                  buttonStyle={{backgroundColor: '#f39c12', borderRadius: 10}}
                  textStyle={{textAlign: 'center'}}
                  title={'Shock'}
                  onPress={() => this.sendData() } />
                </View>
                {bleList}
                <Text>Connection Status ({this.state.isConnect ? 'on' : 'off'})</Text>
                </View>
                {this.readData}
            </View>
        );
    }
}

export default Setting;

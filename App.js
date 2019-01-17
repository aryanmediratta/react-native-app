import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { Constants } from 'expo';
import { MapView, Permissions, Location } from 'expo';

export default class App extends React.Component {
  state = {
    lattitude : null,
    longitude : null
  }
  componentDidMount(){
    this.getMyLocation()
  }
  getMyLocation = async () => {
    var {status} = await Permissions.askAsync(Permissions.LOCATION)
    if(status === 'granted'){
      var result = await Location.getCurrentPositionAsync({})
      this.setState({
        latitude : result.coords.latitude,
        longitude : result.coords.longitude
      })
    }
  }
  render() {
    return (
      <View style = {{marginTop:50, flex :1}}>
        <Button title = 'show my location' onPress = {()=>this.getMyLocation()}/>
         <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.005,
        }}
      />
      </View>
    );
  }
}


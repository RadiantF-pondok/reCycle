import React, {Component} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {StyleSheet, Text, View, PermissionsAndroid, Button} from 'react-native';

export default class Demo extends Component {
  componentDidMount() {
    this.requestCameraPermission();
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the GPS');
        this.getGeo();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  getGeo() {
    Geolocation.getCurrentPosition(
      (info) => console.log(info),
      (err) => console.warn(err),
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.item}>Try permissions</Text>
        <Button
          title="request permissions"
          onPress={() => this.requestCameraPermission()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

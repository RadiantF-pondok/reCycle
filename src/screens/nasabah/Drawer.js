import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      avatar: '',
      refresh: false,
    };
  }

  componentDidMount() {
    if (this.props.user) {
      return this.setState({
        name: this.props.user.name,
        avatar: this.props.user.avatar,
      });
    }
  }

  logout() {
    console.log('dadah.');
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('role');
    this.props.navigation.replace('Login');
  }

  confirmLogout() {
    Alert.alert('Mau Keluar?', 'Sesi Anda akan berakhir.', [
      {text: 'Tidak'},
      {text: 'Ya', onPress: () => this.logout()},
    ]);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => this.componentDidMount()}
            />
          }>
          {this.state.avatar == '' ? (
            <View
              style={{alignSelf: 'center', flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator color="green" size="large" />
            </View>
          ) : (
            <View>
              <Image
                source={require('../../assets/block-recycle-reduce-reuse-logo-wallpapers.jpeg')}
                style={styles.ppCover}
              />
              {this.state.avatar == '' ? (
                <Image
                  source={require('../../assets/noimage.jpg')}
                  style={styles.pp}
                />
              ) : (
                <Image source={{uri: this.state.avatar}} style={styles.pp} />
              )}
              <View style={styles.viewProfile}>
                <View style={styles.viewTextUser}>
                  <Text style={{color: 'grey'}}>Selamat datang,</Text>
                  <Text style={styles.textUser}>{this.state.name}</Text>
                </View>
                <TouchableNativeFeedback
                  onPress={() => this.props.navigation.navigate('ProfileEdit')}>
                  <View style={styles.subViewProfile}>
                    <Image
                      source={require('../../assets/settings-cogwheel-button.png')}
                      style={styles.iconProfile}
                    />
                    <Text>Pengaturan</Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => this.confirmLogout()}>
                  <View style={styles.subViewProfile}>
                    <Image
                      source={require('../../assets/change-power-options.png')}
                      style={styles.iconProfile}
                    />
                    <Text>Keluar</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#854700d4',
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 3,
    height: 35,
    width: 100,
    justifyContent: 'center',
  },
  textLogout: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    includeFontPadding: false,
  },
  pp: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    borderColor: 'grey',
    borderWidth: 3,
    marginTop: -45,
    alignSelf: 'center',
  },
  ppCover: {
    width: '100%',
    height: 125,
  },
  viewProfile: {
    paddingHorizontal: 10,
  },
  iconProfile: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  subViewProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#80808040',
    padding: 5,
    borderRadius: 5,
  },
  viewSplit: {
    marginBottom: 10,
    width: '100%',
    borderColor: '#8080808a',
    borderWidth: 0.5,
  },
  textUser: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewTextUser: {
    marginBottom: 7,
    borderLeftColor: 'black',
    borderLeftWidth: 1,
    paddingLeft: 10,
  },
});

const MapStateToProps = (state) => {
  return {
    user: state,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    changeUser: (input) => dispatch({type: 'CHANGE USER', payload: input}),
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(Drawer);

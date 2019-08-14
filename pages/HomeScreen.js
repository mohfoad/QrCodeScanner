import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from 'react-native';

import { NavigationEvents } from 'react-navigation';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { Dialog } from 'react-native-simple-dialogs';
import {connect} from 'react-redux';
import {addQRCode} from './actions/CodeActions';
import RNBeep from 'react-native-a-beep';
import styles from './styles/styles'



const max_delay = 5000;


class ArdaTurSystem extends Component {
  
	constructor(props) {
		super(props);
		this.state = {
			routename:"",
      			scaninfo:"",
      			scanDelay: 5000,
      			dialogVisible: false,
      			focusedScreen: true,
		};
	}
}



class ScanScreen extends ArdaTurSystem {
  onDidFocus() {
    console.log('I am triggered');
    const {navigation} = this.props;
    this.removeWillFocusListener = navigation.addListener('willFocus', () =>
      this.setState({ focusedScreen: true })
    );
    this.removeWillBlurListener = navigation.addListener('willBlur', () =>
      this.setState({ focusedScreen: false })
    );
  }

  onSuccess = (e) => {    
    this.setState({ scaninfo: e.data});
    const {addQRCode} = this.props;
    
    	addQRCode(e.data, this.props.screenProps.token);

    	this.setState({
      		dialogVisible: true,
      		focusedScreen: false
    	});
  }

  _renderItem = ({item}) => {
    return (
      <Text>{JSON.stringify(item)}</Text>
    );
  }
	
  render() {
    const { loading, qrCodeData } = this.props.code;
    const { dialogVisible, scanDelay, focusedScreen } = this.state;


    if (loading) {
      return (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={this.onDidFocus.bind(this)} />
        {focusedScreen && <QRCodeScanner
          ref={(node) => { this.scanner = node }}
          onRead={this.onSuccess} 
          reactivateTimeout={scanDelay}
          showMarker={true}
          topContent={
            <Text style={styles.TextTop}>
              {qrCodeData.info}
            </Text>
          }
          bottomContent={
            <Text id="scaninfo" style={styles.textBottom}>
              {this.state.scaninfo}
            </Text>
          }
        />}
        <Dialog 
          visible={dialogVisible}
          title="QR Code Data"
          onTouchOutside={() => {
            this.setState({
              dialogVisible: false,
              scanDelay: 5000,
              focusedScreen: true
            });
          }}
        >
          <View style={styles.dialogInerView}>
            <Text>
              {qrCodeData.info}
            </Text>
            <TouchableOpacity style={styles.dialogButtonView}
              onPress={() => {
                this.setState({
                  dialogVisible: false,
                  scanDelay: 5000,
                  focusedScreen: true
                });
            }}
            >
              <Text style={styles.buttonText}>{"Close"}</Text>
            </TouchableOpacity>
          </View>
        </Dialog>
      </View>
    );
  }
}

const matStateToProps = state => {
  return {
    code: state.code,
    token: state.token	  
  }
}

export default connect(
  matStateToProps,
  {
    addQRCode
  }
)(ScanScreen)




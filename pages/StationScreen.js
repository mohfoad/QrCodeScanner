//This is an example code for Bottom Navigation//
import React from 'react';
import {connect} from 'react-redux';
//import react in our code.
import { Alert, FlatList, Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import {showStartQRCodeData} from './actions/CodeActions';
//import all the basic component we have used
import styles from './styles/styles'

class StationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onShowStart = this.onShowStart.bind(this);
  }

  onShowStart(id) {
    console.log("+=-- Selected id:  ", id);
    const {showStartQRCodeData, navigation} = this.props;
    showStartQRCodeData(navigation, id);
  }


  render() {
    const {qrCodeData} = this.props.code;
    
    if(Object.entries(qrCodeData).length != 0 ){ 


      return (
        <View style={styles.container}>
          <ScrollView style={styles.containerList}>
          { qrCodeData.stations.map((item, i) => {
            
            return <View style={styles.itemButtons} key={"itemButtons"+item.id}>
                <TouchableOpacity style={styles.buttonViewStations} 
                  onPress={() => this.onShowStart(item.id)}
                >
                  <Text style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>

              </View>
            }
          )}
          </ScrollView>
        </View>
      );
    } else{
      return (
              <View style={styles.containerCenter}>
                <View style={styles.infoView}>
            <Text>Please scan QR code</Text>
          </View>
        </View>
      );
    }
  }
}
const matStateToProps = state => {
  return {
    code: state.code
  }
}

export default connect(
  matStateToProps, {
    showStartQRCodeData
  }
)(StationScreen)



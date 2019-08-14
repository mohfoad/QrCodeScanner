//This is an example code for Bottom Navigation//
import React from 'react';
import {connect} from 'react-redux';
//import react in our code.
import { Alert, FlatList, Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import {cleanQRCodeData, cleanColoredQRCodeData, filteredChanged, cleanValidatedQRCodeData} from './actions/CodeActions';
//import all the basic component we have used
import styles from './styles/styles'

class ListScreen extends React.Component {
  //Detail Screen to show from any Open detail button

  constructor(props) {
    super(props);
    this.state = {
      showMarked: false
    }
  }

   _clearAll=()=>{
    //function to make two option alert
    const {cleanColoredQRCodeData, cleanQRCodeData} = this.props;
    Alert.alert(
      //title
      'Clear all data',
      //body
      'This will remove all data',
      [
        {text: 'Yes', onPress: () => cleanQRCodeData()},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  }

  _clearMark=()=>{
    //function to make two option alert
    const {cleanValidatedQRCodeData} = this.props;
    Alert.alert(
      //title
      'Clear all validated',
      //body
      'This will uncheck all validated seats',
      [
        {text: 'Yes', onPress: () => cleanValidatedQRCodeData()},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  }

  _showMarked=()=>{
    const {showMarked} = this.state;
    Alert.alert(
      //title
      'Show all validated',
      //body
      'This will check all validated seats',
      [
        {text: 'Yes', onPress: () => this.setState({showMarked: !showMarked})},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  }

  _showAll=()=>{
    const {filteredChanged} = this.props;
    //function to make two option alert
    // const {cleanColoredQRCodeData, cleanQRCodeData} = this.props;
    Alert.alert(
      //title
      'Show all items',
      //body
      'This will unfilter about filtered seats',
      [
        {text: 'Yes', onPress: () => filteredChanged()},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  }

  render() {
    const {qrCodeData, stationId, filtered} = this.props.code;
    const {cleanColoredQRCodeData, cleanQRCodeData} = this.props;
    const {showMarked} = this.state;
    let filteredQRCodeByID = [];
    if(Object.entries(qrCodeData).length != 0 ){
      
      if (!filtered) {
        qrCodeData.list.map((item, index) => {
          
          if (showMarked) {
            if (item.validated) {
              filteredQRCodeByID.push(item);
            }
          } else
            filteredQRCodeByID.push(item);
        })
      }
      else {
        qrCodeData.list.map((item, index) => {
          if (item.start == stationId) {
            // if (showMarked) {
            //   if (item.validated) {
            //     filteredQRCodeByID.push(item);
            //   }
            // } else
              filteredQRCodeByID.push(item);
          }
          if (item.id == 44) {
            console.log("Filtered+++++++; ", item);
          }
        })
      }
      
      return (
        <View style={styles.container}>

          <View style={styles.containerList}>
          <ScrollView style={styles.containerListScroll}>
          {filteredQRCodeByID.length != 0 && filteredQRCodeByID.map((item, i) => {
           
            return (
              <View style={styles.itemText} key={"itemText"+item.id}>
              <Text style={item.pstatus == 'reservation' ? styles.itemTextReservation: item.validated ? styles.itemTextNumberValidated : styles.itemTextNumber} key={"position"+item.id}>{item.seat}</Text>
              <View style={styles.itemTextInfo} key={"itemText1"+item.id}>
                <Text style={styles.itemTextName} key={item.id}>{item.name}</Text>
                <Text style={styles.itemTextDirection} key={"direction"+item.id}>{item.direction}</Text>
              </View>
            </View>
            );
        }
      )
    }
        </ScrollView>
	        </View>
        {!filtered && (
          <View style={styles.buttonViewRow}>
          <TouchableOpacity style={[styles.buttonOpacity, {backgroundColor: 'red'}]}
            onPress={() => {this._clearAll()}}
          >
            <Text style={styles.buttonText}>{"Clean ALL"}</Text>
          </TouchableOpacity>
          <View style={styles.buttonSpace}></View>
          <TouchableOpacity style={[styles.buttonOpacity, {backgroundColor: 'green'}]}
            onPress={() => {this._clearMark()}}
          >
            <Text style={styles.buttonText}>{"Clean Mark"}</Text>
          </TouchableOpacity>
          <View style={styles.buttonSpace}></View>
          <TouchableOpacity style={[styles.buttonOpacity, {backgroundColor: 'blue'}]}
            onPress={() => {this._showMarked()}}
          >
            <Text style={styles.buttonText}>{showMarked ? "Show all items" : "Show marked items"}</Text>
          </TouchableOpacity> 
        </View>
        )}
        {filtered && (
          <View style={styles.buttonViewRow}>
            <TouchableOpacity style={[styles.buttonOpacity, {backgroundColor: 'blue'}]}
            onPress={() => {this._showAll()}}
          >
            <Text style={styles.buttonText}>{"All"}</Text>
          </TouchableOpacity>
          </View>
          )}
      </View>
    );
    }
    else{
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
    cleanQRCodeData,
    cleanColoredQRCodeData,
    filteredChanged,
    cleanValidatedQRCodeData
  }
)(ListScreen)




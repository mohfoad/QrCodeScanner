import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  containerList: {
    flex: 10,
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  containerLogin: {
    backgroundColor: global.defaultBackgroundColor,
    flex: 1,
    justifyContent: 'center'
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: "center"
  },
  textTop: {
    flex: 1,
    fontSize: 12,
    padding: 10,
    color: '#777',
  },
  textBottom: {
    flex: 1,
    fontSize: 12,
    padding: 10,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    fontWeight: "500",
    color: '#fff',
  },
  buttonTouchable: {
    padding: 16,
  },
  dialogInerView: {
    width: DEVICE_WIDTH - 100,
    height: DEVICE_HEIGHT * 2 / 5,
    justifyContent: 'space-between',
    alignItems: "center"
  },
  flatList: {
    flex: 0.6
  },
  dialogButtonView: {
    flex: 0.3,
    width: "70%",
    backgroundColor: "#af8dfa",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonView: {
    height: 30,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#0068b5'
  },
  buttonViewRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonViewStations: {
    height: 30,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 5,
    borderColor: "#0068b5",
    borderWidth: 1,
    margin:10,
    padding: 5
  },
  buttonViewLogout: {
    height: 50,
    margin: 30,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#0068b5',
    alignItems: "center",
    width: DEVICE_WIDTH - 100,
  },
  logoutButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  item: {
    flex: 1,
    justifyContent: "center",
    borderBottomWidth: 1
  },
  buttonOpacity: {
    flex: 1,
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  buttonSpace: {
    flex: 0.2
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold"
  },
  itemText: {
	padding:5,
	borderBottomColor: "grey",
	borderBottomWidth: 1,
	flex: 1,
  	flexDirection:'row',
  },
  itemTextNumber:{
	fontSize: 20,
    	fontWeight: 'bold',
	width: 40,
	padding: 5,
    	justifyContent: 'center',
	alignItems: 'center',
  },
  itemTextNumberValidated:{
	fontSize: 20,
    	fontWeight: 'bold',
	width: 40,
	padding: 5,
	alignItems: 'center',
    	justifyContent: 'center',
	backgroundColor: '#00FF00'
  },
  itemTextReservation:{
	fontSize: 20,
    	fontWeight: 'bold',
	width: 40,
	padding: 5,
    	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#FFFF00'
  },
  itemTextName:{
	fontSize: 16,

  },
  itemTextDirection:{
	fontSize: 13,
	color: 'grey'

  },
  itemColoredText: {
    color: 'green'
  }

});

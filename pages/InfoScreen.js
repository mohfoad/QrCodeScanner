//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
//import all the basic component we have used
import {connect} from 'react-redux';
import {logout} from './actions/AuthActions';
import styles from './styles/styles'

class InfoScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  onLogout() {
    const {logout, navigation} = this.props;
    logout(navigation);
  }

  //Detail Screen to show from any Open detail button
  render() {
    const {loading} = this.props.code;
    if (loading) {
      return (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.containerCenter}>
        <View style={styles.infoView}>
          <Text>Version 1.0.0</Text>
        </View>
        <TouchableOpacity style={styles.buttonViewLogout}
          onPress={this.onLogout.bind(this)}
        >
          <Text style={styles.logoutButtonText}>{'Log out'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const matStateToProps = state => {
  return {
    code: state.code
  }
}

export default connect(
  matStateToProps,
  {
    logout
  }
)(InfoScreen)


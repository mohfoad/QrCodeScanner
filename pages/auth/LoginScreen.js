import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import { signIn } from '../actions/AuthActions';
import * as global from '../config/global';
import {getStorageData} from '../storage/storage';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'gyx4o@abv.bg',
            password: '159951'
        }
    }

    onPressSignIn() {
        const {signIn, navigation} = this.props;
        const {email, password} = this.state;
        signIn(email, password, navigation);
        // navigation.navigate('Home');
    }

    render() {
        const {loading} = this.props.auth;
        if (loading) {
            return (
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <Text style={styles.logoText}>{'ArdaTurSystem'}</Text>
                </View>
                <View style={styles.inputView}>
                    <View style={styles.textInputView}>
                        <TextInput 
                            style={styles.textInput}
                            underlineColorAndroid="transparent"
                            placeholder="Email"
                            autoCorrect={true}
                            autoCapitalize="none"
                            returnKeyType="next"
                            onChangeText={(text) => {
                                this.setState({
                                    email: text
                                })
                            }}
                        />
                    </View>
                    <View style={[styles.textInputView, {marginTop: 15}]}>
                        <TextInput 
                            style={styles.textInput}
                            underlineColorAndroid="transparent"
                            placeholder="Password"
                            autoCorrect={true}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            returnKeyType="done"
                            onChangeText={(text) => {
                                this.setState({
                                    password: text
                                })
                            }}
                        />
                    </View>
                    <TouchableOpacity style={styles.buttonOpacity}
                        onPress={this.onPressSignIn.bind(this)}
                    >
                        <Text style={styles.buttonText}>{'Sign In'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    indicatorContainer: {
        flex: 1,
        backgroundColor: global.defaultBackgroundColor,
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: global.defaultBackgroundColor
    },
    logoView: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoText: {
        fontSize: 40,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#fff'
    },
    inputView: {
        flex: 0.6,
        marginLeft: 40,
        marginRight: 40
    },
    textInputView: {
        height: 50, 
        backgroundColor: '#fff',
        borderRadius: 5
    },
    textInput: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        fontWeight: '500',
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonOpacity: {
        height: 50, 
        backgroundColor: '#9e5',
        borderRadius: 5,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const matStateToProps = state => {
    return {
        auth: state.auth
    }
}
  
export default connect(
    matStateToProps, {
        signIn
    }
)(LoginScreen)

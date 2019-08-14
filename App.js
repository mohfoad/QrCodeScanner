'use strict';

import React, { Component } from 'react';

import {
  StatusBar,
  ActivityIndicator,
  View,
  StyleSheet
} from 'react-native';

import { Provider } from 'react-redux';
import configureStore from './pages/storage/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import * as global from './pages/config/global';
import {getStorageData} from './pages/storage/storage'; 

import HomeScreen from './pages/HomeScreen';
import ListScreen from './pages/ListScreen';
import StationScreen from './pages/StationScreen';
import InfoScreen from './pages/InfoScreen';
import LoginScreen from './pages/auth/LoginScreen';
import styles from './pages/styles/styles'

const store = configureStore();


const HomeStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    Home: { 
      screen: HomeScreen, 
      navigationOptions: {
        title: "Home",
        headerTitleStyle: { 
            textAlign:"center", 
            flex:1 
        }
      } 
    }
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: global.defaultBackgroundColor
      },
      headerTintColor: '#FFFFFF'
    },
  }
);
const ListStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    List: { 
      screen: ListScreen, 
      navigationOptions: {
        title: "List",
        headerTitleStyle: { 
            textAlign:"center", 
            flex:1 
        }
      } 
    }
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: global.defaultBackgroundColor,
      },
      headerTintColor: '#FFFFFF'
    },
  }
);
const StationStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    Station: { 
      screen: StationScreen, 
      navigationOptions: {
        title: "Station",
        headerTitleStyle: { 
            textAlign:"center", 
            flex:1 
        }
      } 
    }
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: global.defaultBackgroundColor,
      },
      headerTintColor: '#FFFFFF'
    },
  }
);
const InfoStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    Info: { 
      screen: InfoScreen, 
      navigationOptions: {
        title: "Info",
        headerTitleStyle: { 
            textAlign:"center", 
            flex:1 
        }
      } 
    }
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: global.defaultBackgroundColor,
      },
      headerTintColor: '#FFFFFF'
    },
  }
);

const AppC = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    List: { screen: ListStack },
    Station: { screen: StationStack },
    Info: { screen: InfoStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } 
        else if (routeName === 'List') {
          iconName = `ios-checkmark-circle${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Station') {
          iconName = `ios-star${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Info') {
          iconName = `ios-help-circle${focused ? '' : '-outline'}`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#0068b5',
      inactiveTintColor: 'gray',
    }
  }
);
//For React Navigation 2.+ need to export App only
//export default App;
//For React Navigation 3.+

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  }
}, {
  initialRouteName: 'Login'
})

const RootAuthNavigator = createSwitchNavigator({
  Auth: AuthStack,
  App: AppC
}, {
  initialRouteName: 'Auth'
})

const RootHomeNavigator = createSwitchNavigator({
  Auth: AuthStack,
  App: AppC
}, {
  initialRouteName: 'App'
})

const AppAuthContainer = createAppContainer(RootAuthNavigator);
const AppContainer = createAppContainer(RootHomeNavigator);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loading: false,
      token: '' 
    }
  }
  componentWillMount = async () => {
    await this.setState({
      loading: true
    })
    let token = undefined;
    try {
      await getStorageData('@ArdaTurSystem_AuthToken').then((result) => {
        token = result;
        console.log("Token Get Success: ", typeof(token));
        const isLoggedIn = typeof(token) === 'string';
        this.setState({
          loading: false,
          isLoggedIn: isLoggedIn,
	  token: token
        })
      });
    } catch (error) {
      await this.setState({
        loading: false
      })
      console.log(error)
;    }
  }
  render () {
    const {loading, isLoggedIn, token} = this.state;
    if (loading) {
      return (
        <View style={styles.containerLogin}>
          <ActivityIndicator size={"large"} />
        </View>
      )
    }
    return (
          <Provider store={store}>
            <StatusBar backgroundColor={global.defaultBackgroundColor} barStyle="light-content" />
            {isLoggedIn ? <AppContainer screenProps={this.state} /> : <AppAuthContainer/>}
          </Provider>
    )
  }
}


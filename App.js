import React from 'react';
import { StyleSheet, Text, TextInput, View, ToastAndroid, Button } from 'react-native';
import SocketIOClient from 'socket.io-client';
import EnterScreen from './EnterScreen'
import ChatScreen from './ChatScreen'
import { StackNavigator } from 'react-navigation'

console.disableYellowBox = true;

const App = StackNavigator({
  EnterScreen: { screen: EnterScreen },
  ChatScreen: { screen: ChatScreen }
});

module.exports = App;
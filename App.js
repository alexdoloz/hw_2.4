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
/*
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.socket = SocketIOClient('http://192.168.0.103:3000', { transports: ["websocket"] });
    this.socket.on('connected', this.socketConnected);
    this.socketConnected = this.socketConnected.bind(this);
  }

  socketConnected(socket) {
    alert(`Socket connected: ${socket.id}`);
    ToastAndroid.show(`Connected ${socket.id}`, ToastAndroid.LONG);
  }

  render() {
    return (
      <ChatEnter />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 44,
    width: 200,
    borderColor: 'red',
    borderWidth: 1
  }
});
*/
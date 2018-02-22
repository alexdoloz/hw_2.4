import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import SocketIOClient from 'socket.io-client';


export default class EnterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://192.168.0.103:3000",
      nickname: "",
      chatButtonDisabled: true
    };
    this.validateFields = this.validateFields.bind(this);
    this.connect = this.connect.bind(this);
  }

  validateFields(nickname, url) {
    return url.length > 1 && nickname.length > 1
  }

  connect() {
    const { url, nickname } = this.state;
    console.log(url, nickname);
    const socket = SocketIOClient(url, { transports: ["websocket"] });
    socket.on('connect', () => {
      this.props.navigation.navigate('ChatScreen', { socket, nickname });
    });

    socket.on('connect_error', (error) => {
      alert("Connection error");
    });
    socket.connect();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Адрес сервера:</Text>
        <TextInput 
          style={[styles.textInput]} 
          keyboardType='url' 
          autoCapitalize="none" 
          onChangeText={ (text) => {this.setState({ 
            url: text,
            chatButtonDisabled: !this.validateFields(this.state.nickname, text)
          })} } 
          value={this.state.url} 
        />
        <Text style={styles.heading}>Ваш никнейм:</Text>
        <TextInput 
          style={styles.textInput} 
          onChangeText={ (text) => {
            this.setState({ 
              nickname: text,
              chatButtonDisabled: !this.validateFields(text, this.state.url)
            });
          }}
          value={this.state.nickname}
        />
        <Button color="orange" onPress={ () => {
          this.connect();
        } } title="Начать чат" disabled={this.state.chatButtonDisabled} /> 
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    padding: 50
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 100
  },
  textInput: {
    height: 44,
    marginTop: 30,
    marginBottom: 30,
    minWidth: 200,
    borderColor: 'red',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic'
  }
});

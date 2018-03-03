import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, KeyboardAvoidingView } from 'react-native';
import SocketIOClient from 'socket.io-client';
import MessageCell from './MessageCell'


export default class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params ? params.nickname : '',
    }
  };

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.socket = params.socket;
    this.nickname = params.nickname;
    console.log("Params", params);
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur', payload => {
        this.willBlur();
      }
    );
    
    // Remove the listener when you are done
    // this.socket.on('user_connected', (data) => {

    // });
    this.socket.on('message', (message) => {
      //alert("Got message " + JSON.stringify(message));
      message.isMyMessage = false;
      let { messages } = this.state;
      messages.push(message);
      this.setState({ messages }, () => {
        this.forceUpdate(); 
      });
    });
    this.state = {
      inputText: "",
      messages: []
    };
  }

  willBlur() {
    this.socket.close();
    this.willBlurSubscription.remove();
  }

  render() {

    return (
      <View style={styles.chatContainer}>
        <FlatList 
          style={{flex: 1}}
          data={this.state.messages}
          renderItem={({item}) => <MessageCell message={item} />}
        />
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={300}>
          <TextInput style={styles.chatInput} 
            onChangeText={(text) => { this.setState({ inputText: text })}}
            value={this.state.inputText}
            onEndEditing={() => {
              const message = {
                text: this.state.inputText,
                author: this.nickname,
              }
              this.socket.emit('message', message);
              message.isMyMessage = true;
              let { messages } = this.state;
              messages.push(message);
              this.setState({ messages, inputText: "" });
            }}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -100
  },
  textInput: {
    height: 44,
    marginTop: 30,
    marginBottom: 200,
    minWidth: 200,
    borderColor: 'red',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic'
  },
  chatInput: {
    height: 44,
    marginTop: 20,
    marginBottom: 20,
    minWidth: 200,
    borderColor: 'red',
    borderWidth: 1,
    textAlign: 'left',
    fontSize: 20,
    marginRight: 50,
    marginLeft: 50
  }
});

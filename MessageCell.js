import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class MessageCell extends React.Component {
  render() {
    const { message } = this.props;
    if (message.isServiceMessage) {
      return (
        <View style={styles.serviceCell}>
          <Text style={styles.serviceText}>{message.text}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.cell}>
          <View style={message.isMyMessage ? styles.myMessage : styles.otherMessage}>
            <Text style={{fontSize: 20}}>{message.text}</Text>
            <Text style={{fontSize: 12, fontStyle: 'italic'}}>{message.author}</Text>
          </View>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 50
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
  cell: {
    height: 60,
    padding: 10
  },
  myMessage: {
    borderColor: 'blue',
    alignItems: 'flex-end'
  },
  otherMessage: {
    borderColor: 'red',
    alignItems: 'flex-start'
  },
  serviceCell: {
    backgroundColor: 'gray',
    height: 30,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  serviceText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  }
});

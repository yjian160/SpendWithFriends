import React from 'react';
import { FlatList, Modal, Picker, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Axios from 'axios';
import { ListItem, CheckBox } from 'react-native-elements';

export default class Checkbox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checked: false
    }
  }

  press() {
    console.log({
      id: this.props.id,
      username: this.props.title
    });
    if (!this.state.checked) {
      this.props.addParticipant({
        id: this.props.id,
        username: this.props.title
      });
    } else {
      this.props.removeParticipant({
        id: this.props.id,
        username: this.props.title
      });
    }

    this.setState({
      checked: !this.state.checked
    })
  }

  render() {
    return (
      <CheckBox
        title={this.props.title}
        onPress={this.press.bind(this)}
        checked={this.state.checked}
      />
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
});

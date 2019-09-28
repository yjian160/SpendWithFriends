import React from 'react';
import { Modal, Picker, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Axios from 'axios';

export default class GroupInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newUsername: '',
    }
  }

  setUsername(e) {
    this.setState({
      newUsername: e
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
            style={{ borderWidth: 0.5, borderColor: 'black', padding: 10}}
            onChangeText={e=>this.setUsername(e)}
            placeholder="Enter username"
          />
          <View style={{margin: 5}}>
            <Button
              onPress={() => {

                this.props.endAddUser();
              }}
              title="Add User"
            />
          </View>
      </View>
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

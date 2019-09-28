import React from 'react';
import { Modal, Picker, StyleSheet, Text, View, TextInput, Button } from 'react-native';

import UserRegistration from './userReg';

export default class GroupInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      userModelVisible: false,
    }
  }

  componentDidMount() {
    
  }

  startAddUser() {
    this.setState({
      userModelVisible: true
    })
  }

  endAddUser() {
    this.setState({
      userModelVisible: false
    })
  }


  render() {
    return (
      <View>
        <Text>{this.props.groupName}</Text>
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{margin: 5}}>
            <Button
              onPress={() => {
                this.startAddUser();
              }}
              title="+ User"
            />
          </View>
          <View style={{margin: 5}}>
            <Button
              onPress={() => {
                
              }}
              title="+ Transaction"
            />
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.userModelVisible}
          onRequestClose={() => {
            this.setState({
              userModelVisible : false
            })
          }}>
            <UserRegistration endAddUser={this.endAddUser.bind(this)}/>
        </Modal>
        <Picker>
          <Picker.Item label="User1" value="user1" />
          <Picker.Item label="User2" value="user2" />
        </Picker>
        <View style={{margin: 5}}>
            <Button
              onPress={() => {
                
              }}
              title="All Transactions"
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

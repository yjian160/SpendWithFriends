import React from 'react';
import { FlatList, Modal, Picker, StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import Axios from 'axios';
import Checkbox from './checkbox';

export default class TransactionReg extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      category: '',
      amount: '',
    }
  }

  componentDidMount() {
    console.log("A:", this.props.users);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("B:", prevProps.users);
  }

  setUsername(e) {
    this.setState({
      newUsername: e
    })
  }

  render() {
    return (
      <ScrollView>
      <View>
        <TextInput 
            style={{ borderWidth: 0.5, borderColor: 'black', padding: 10}}
            onChangeText={e=>this.setUsername(e)}
            placeholder="Enter Transaction Name"
          />
        <TextInput 
            style={{ borderWidth: 0.5, borderColor: 'black', padding: 10}}
            onChangeText={e=>this.setUsername(e)}
            placeholder="Enter Description"
          />
        <TextInput 
            keyboardType="numeric"
            style={{ borderWidth: 0.5, borderColor: 'black', padding: 10}}
            onChangeText={e=>this.setUsername(e)}
            placeholder="Enter Amount"
          />
          <Text>
            {this.props.users}
          </Text>
          <View>
            {this.props.users.map(user => {
              return (<Checkbox
                key={user}
                title={user}
              />);
            })}
          </View>
          <View>
          <Picker
              mode="dropdown"
              >
            {this.props.users.map(user => {
              console.log(user);
              return (<Picker.Item key={user} label={user} value={user} />);
            })}
          </Picker>
        </View>
          <View style={{margin: 5}}>
            <Button
              onPress={() => {
                // Axios.post('http://ec2-13-57-24-238.us-west-1.compute.amazonaws.com:3000/addUser', {
                //   username: this.state.newUsername,
                //   circleName: this.props.groupName,
                // }).then(() => {
                //   this.props.endAddUser();
                // })
              }}
              title="Add Transaction"
            />
          </View>
      </View>
      </ScrollView>
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

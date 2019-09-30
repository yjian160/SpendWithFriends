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
      amount: 0,
      payer: (this.props.users && this.props.users.length > 0 ? this.props.users[0].username : ''),
      participants: [],
    }
  }

  // componentDidMount() {
  //   console.log("A,Payer:", this.state.payer);
  //   console.log("A,Users:", this.props.users);
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("B,Payer:", this.state.payer);
  //   console.log("B,Particpants:", this.state.participants);
  // }

  addParticipant(person) {
    var newParticipants = this.state.participants.slice();
    newParticipants.push(person);
    this.setState({
      participants: newParticipants
    })
  }

  removeParticipant(person) {
    var newParticipants = this.state.participants.slice();
    for (var i = newParticipants.length-1; i >= 0; i--) {
      if (newParticipants[i].username === person.username) {
        newParticipants.splice(i, 1)
      }
    }
    this.setState({
      participants: newParticipants
    })
  }

  createTransaction() {
    var participantKeys = [];
    var payer_id = '';
    for (var i = 0; i < this.state.participants.length; i++) {
      participantKeys.push(this.state.participants[i].id);
    }

    for (var i = 0; i < this.props.users.length; i++) {
      if (this.props.users[i].username === this.state.payer) {
        payer_id = this.props.users[i].person_id
      }
    }
  
    var newTransaction = {
      transaction: {
        name: this.state.name,
        description: this.state.description,
        total_amount: this.state.amount,
        payer_id: payer_id,
        payer_name: this.state.payer,
        participant_count: participantKeys.length,
        circle_id: this.props.groupId
      },
      participants: participantKeys
    }

    Axios.post('http://ec2-13-57-24-238.us-west-1.compute.amazonaws.com:3000/addTransaction', newTransaction)
      .then(res => {
        this.props.endAddTransaction();
      });
  }

  setName(e) {
    this.setState({
      name: e
    })
  }

  setDescription(e) {
    this.setState({
      description: e
    })
  }

  setAmount(e) {
    this.setState({
      amount: e
    })
  }

  render() {
    return (
      <ScrollView>
      <View>
        <TextInput 
            style={{ borderWidth: 0.5, borderColor: 'black', padding: 10}}
            onChangeText={e=>this.setName(e)}
            placeholder="Enter Transaction Name"
          />
        <TextInput 
            style={{ borderWidth: 0.5, borderColor: 'black', padding: 10}}
            onChangeText={e=>this.setDescription(e)}
            placeholder="Enter Description"
          />
        <TextInput 
            keyboardType="numeric"
            style={{ borderWidth: 0.5, borderColor: 'black', padding: 10}}
            onChangeText={e=>this.setAmount(e)}
            placeholder="Enter Amount"
          />
          <Text>
            Participants:
          </Text>
          <View>
            {this.props.users.map(user => {
              return (<Checkbox
                addParticipant={this.addParticipant.bind(this)} 
                removeParticipant={this.removeParticipant.bind(this)}
                key={user.person_id}
                id={user.person_id}
                title={user.username}
              />);
            })}
          </View>
          <Text>
              Payer:
          </Text>
          <View>
            <Picker
              selectedValue={this.state.payer}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({payer: itemValue})
              }>
              {this.props.users.map(user => {
                return (<Picker.Item key={user.username} label={user.username} value={user.username}/>);
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
                this.createTransaction();
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

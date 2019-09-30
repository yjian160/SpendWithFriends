import React from 'react';
import { Modal, Picker, StyleSheet, Text, View, TextInput, Button } from 'react-native';

import UserRegistration from './userReg';
import TransactionRegistration from './transactionReg';
import AllTransactions from './allTransactions'
import Axios from 'axios';

export default class GroupInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      userModelVisible: false,
      transactionModelVisible: false,
      allTransactionsModelVisible: false,
      currentUser: '',
      transactions: [],
    }
  }

  componentDidMount() {
    Axios.get('http://ec2-13-57-24-238.us-west-1.compute.amazonaws.com:3000/getPersonsByCircle', {
      params: {
        circleName: this.props.groupName
      }
    })
      .then(res => {
        var currentUsers = [];
        for (var i = 0; i < res.data.length; i++) {
          currentUsers.push(res.data[i]);
        }
        this.setState({
          users: currentUsers
        })
      })
      .then(() => {
        return Axios.get('http://ec2-13-57-24-238.us-west-1.compute.amazonaws.com:3000/getTransactionsByCircleName', {
          params: {
            circleName: this.props.groupName
          }
        })
          .then(res => {
            console.log(res.data);
          })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userModelVisible !== this.state.userModelVisible) {
      Axios.get('http://ec2-13-57-24-238.us-west-1.compute.amazonaws.com:3000/getPersonsByCircle', {
      params: {
        circleName: this.props.groupName
      }
    })
      .then(res => {
        var currentUsers = [];
        for (var i = 0; i < res.data.length; i++) {
          currentUsers.push(res.data[i]);
        }
        this.setState({
          users: currentUsers
        })
      })
      .then(() => {
        return Axios.get('http://ec2-13-57-24-238.us-west-1.compute.amazonaws.com:3000/getTransactionsByCircleName', {
          params: {
            circleName: this.props.groupName
          }
        })
          .then(res => {
            console.log(res.data);
          })
      })
    }
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

  startAddTransaction() {
    this.setState({
      transactionModelVisible: true
    })
  }

  endAddTransaction() {
    this.setState({
      transactionModelVisible: false
    })
  }

  startAllTransactionsModel() {
    this.setState({
      allTransactionsModelVisible: true
    })
  }

  endAllTransactionsModel() {
    this.setState({
      allTransactionsModelVisible: false
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
                this.startAddTransaction();
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
            <UserRegistration groupName={this.props.groupName} endAddUser={this.endAddUser.bind(this)}/>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.transactionModelVisible}
          onRequestClose={() => {
            this.setState({
              transactionModelVisible : false
            })
          }}>
            <TransactionRegistration users={this.state.users} groupId={this.props.groupId} groupName={this.props.groupName} endAddTransaction={this.endAddTransaction.bind(this)}/>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.allTransactionsModelVisible}
          onRequestClose={() => {
            this.setState({
              allTransactionsModelVisible : false
            })
          }}>
            <AllTransactions users={this.state.users} groupId={this.props.groupId} groupName={this.props.groupName} endAllTransactionsModel={this.endAllTransactionsModel.bind(this)}/>
        </Modal>
        <Picker
          selectedValue={this.state.currentUser}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({currentUser: itemValue})
          }>
          {this.state.users.map(user => {
            return (<Picker.Item key={user.username} label={user.username} value={user.username} />);
          })}
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

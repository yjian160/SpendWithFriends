import React from 'react';
import { Modal, Picker, StyleSheet, Text, View, TextInput, Button } from 'react-native';

import UserRegistration from './userReg';
import TransactionRegistration from './transactionReg';
import AllTransactions from './allTransactions'
import SingleUserStats from './singleUserStats'
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
          users: currentUsers,
          currentUsers: (this.state.currentUser === '' && currentUsers.length && currentUsers.length > 0  ? currentUsers[0].username : this.state.currentUser)
        })
      })
      .then(() => {
        return Axios.get('http://ec2-13-57-24-238.us-west-1.compute.amazonaws.com:3000/getTransactionsByCircleName', {
          params: {
            circleName: this.props.groupName
          }
        })
          .then(res => {
            this.setState({
              transactions: res.data
            })
          })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userModelVisible !== this.state.userModelVisible
      || prevState.allTransactionsModelVisible !== this.state.allTransactionsModelVisible
      || prevState.transactionModelVisible !== this.state.transactionModelVisible) {
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
          users: currentUsers,
          currentUsers: (this.state.currentUser === '' && currentUsers.length && currentUsers.length > 0 ? currentUsers[0].username : this.state.currentUser)
        })
      })
      .then(() => {
        return Axios.get('http://ec2-13-57-24-238.us-west-1.compute.amazonaws.com:3000/getTransactionsByCircleName', {
          params: {
            circleName: this.props.groupName
          }
        })
          .then(res => {
            this.setState({
              transactions: res.data
            })
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

  startAllTransactions() {
    this.setState({
      allTransactionsModelVisible: true
    })
  }

  endAllTransactions() {
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
                if (this.state.currentUser !== '') {
                  this.startAddTransaction();
                } else {
                  alert('add a user first');
                }
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
            <AllTransactions transactions={this.state.transactions} endAllTransactions={this.endAllTransactions.bind(this)}/>
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
        <SingleUserStats transactions={this.state.transactions} currentUser={this.state.currentUser} />
        <View style={{margin: 5}}>
          <Button
            onPress={() => {
              this.startAllTransactions()
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

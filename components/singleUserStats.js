import React from 'react';
import { Modal, Picker, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Axios from 'axios';

export default class SingleUserStats extends React.Component {

  constructor(props) {
    super(props);
  }

  getOwe() {
    var oweList = {};
    var transactions = this.props.transactions;
    var currentUser = this.props.currentUser;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].username === currentUser && transactions[i].payer_name !== currentUser) {
        if (!oweList[transactions[i]['payer_name']]) {
          oweList[transactions[i]['payer_name']] = (transactions[i].total_amount/transactions[i].participant_count)  
        } else {
          oweList[transactions[i]['payer_name']] = oweList[transactions[i]['payer_name']] + (transactions[i].total_amount/transactions[i].participant_count)  
        }
      }
    }

    return oweList;
  }

  getOwed() {
    var owedList = {};
    var transactions = this.props.transactions;
    var currentUser = this.props.currentUser;
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].payer_name === currentUser && transactions[i].username !== currentUser) {
        if (!owedList[transactions[i]['username']]) {
          owedList[transactions[i]['username']] = (transactions[i].total_amount/transactions[i].participant_count)  
        } else {
          owedList[transactions[i]['username']] = owedList[transactions[i]['username']] + (transactions[i].total_amount/transactions[i].participant_count)  
        }
      }
    }

    return owedList;
  }


  render() {
    return (
      <View>
        {(Object.keys(this.getOwe()).length > 0 ? <Text>{this.props.currentUser} owes:</Text> : <Text />)}
        {Object.keys(this.getOwe()).map(key => {
          return (<Text key={key}>{key + '  $' + this.getOwe()[key]}</Text>);
        })}
        <Text> --------------- </Text>
        {(Object.keys(this.getOwed()).length > 0 ? <Text>owes {this.props.currentUser}:</Text> : <Text />)}
        {Object.keys(this.getOwed()).map(key => {
          return (<Text key={key}>{key + '  $' + this.getOwed()[key]}</Text>);
        })}
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

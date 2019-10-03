import React from 'react';
import { Modal, Picker, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Axios from 'axios';
import { Table, Row, Rows } from 'react-native-table-component';

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

  getTally() {
    var oweList = this.getOwe();
    var owedList = this.getOwed();
    var finalList = {};
    
    var oweKeys = Object.keys(oweList);
    for (var i = 0; i < oweKeys.length; i++) {
      if (!finalList[oweKeys[i]]) {
        finalList[oweKeys[i]] = -1 * oweList[oweKeys[i]];
      } else {
        finalList[oweKeys[i]] = finalList[oweKeys[i]] + -1 * oweList[oweKeys[i]];
      }
    }

    var owedKeys = Object.keys(owedList);
    for (var i = 0; i < owedKeys.length; i++) {
      if (!finalList[owedKeys[i]]) {
        finalList[owedKeys[i]] = owedList[owedKeys[i]];
      } else {
        finalList[owedKeys[i]] = finalList[owedKeys[i]] + owedList[owedKeys[i]];
      }
    }
    return finalList;
  }


  render() {
    return (
      <View>
        <Text>{this.props.currentUser} owes:</Text>
        <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
          {Object.keys(this.getTally()).map(key => {

            if (this.getTally()[key] < 0) {
              var number = this.getTally()[key];
              number = number * 100;
              number = Math.floor(number);
              number = number/100;
              return (<Row key={key+'-a'} data={[key, '$'+Math.abs(number)]}></Row>);
            } else {
              return (<Row></Row>);
            }
            //<Text key={key}>{key + '  $' + number}</Text>
          })}
        </Table>
        <Text></Text>
        <Text>owes {this.props.currentUser}:</Text>
        <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
          {Object.keys(this.getTally()).map(key => {

            if (this.getTally()[key] > 0) {
              var number = this.getTally()[key];
              number = number * 100;
              number = Math.floor(number);
              number = number/100;
              return (<Row key={key+'-b'} data={[key, '$'+number]}></Row>);
            } else {
              return (<Row></Row>);
            }
            //<Text key={key}>{key + '  $' + number}</Text>
          })}
        </Table>
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

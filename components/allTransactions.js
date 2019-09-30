import React from 'react';
import { Modal, Picker, StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default class AllTransactions extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.props.transactions.map(transaction => {
            return (<Text key={transaction.transaction_id + '-' + transaction.username}>{JSON.stringify(transaction)}</Text>)
          })}
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

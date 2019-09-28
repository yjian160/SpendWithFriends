import React from 'react';
import { Header, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Axios from 'axios';

import CircleSelection from './components/circleSelection';
import GroupInfo from './components/groupInfo';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      groupName: '',
      page: 0,
    }
  }

  setPage(pageNumber) {
    this.setState({
      page: pageNumber
    })
  }

  updateGroup(e) {
    this.setState({
      groupName: e
    })
  }

  joinGroup() {
    if (this.state.groupName !== '') {
      Axios.post('http://ec2-13-57-24-238.us-west-1.compute.amazonaws.com:3000/joinCircle', {
        name: this.state.groupName
      })
        .then(response => {
          console.log("Response:",response.data);
          this.setState({
            page: 1
          });
        })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{position: 'absolute', bottom: 0, left: 0}}>
          <Button
            onPress={() => {
              this.setPage(this.state.page > 0 ? this.state.page - 1 : 0);
            }}
            title="Back"
          />
        </View>
        <View style={{position: 'absolute', bottom: 0}}>
          <Button
            onPress={() => {
              this.setPage(0);
            }}
            title="Home"
          />
        </View>
        {this.state.page === 0 ? <CircleSelection joinGroup={this.joinGroup.bind(this)} updateGroup={this.updateGroup.bind(this)}/> : <View /> }
        {this.state.page === 1 ? <GroupInfo groupName={this.state.groupName}/> : <View /> }
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

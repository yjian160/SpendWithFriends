import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import RN from 'react-native';
import Axios from 'axios';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      groupName: '',
    }
  }

  updateGroup(e) {
    this.setState({
      groupName: e
    })
  }

  createGroup() {
    Axios.post('http://ec2-13-57-24-238.us-west-1.compute.amazonaws.com:3000/joinCircle', {
      test: 'aa'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row' }}>
          <View>
            <Text>
              Group:{'   '}
            </Text>
          </View>
          <View style={{alignSelf: 'center'}}>
            <TextInput 
              style={{ borderWidth: 0.5, borderColor: 'black', padding: 10}}
              onChangeText={e=>this.updateGroup(e)}
              placeholder="Type here to translate!"
            />
          </View>
          <View>
            <Text style={{color: 'white'}}>
              Group:{'   '}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{margin: 5}}>
            <Button
              onPress={() => {
                this.createGroup();
              }}
              title="Create"
            />
          </View>
          <View style={{margin: 5}}>
            <Button
              style={{margin: 10}}
              onPress={() => {
                alert('You tapped the button!');
              }}
              title="Join"
            />
          </View>
        </View>
      </View>
    );
  }
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <TextInput 
//         style={{borderWidth: 0.5, borderColor: 'black', padding: 10}}
//         placeholder="Type here to translate!"
//       />
//       <Button
//         onPress={() => {
//           alert('You tapped the button!');
//         }}
//         title="Press Me"
//       />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

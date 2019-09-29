import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function CircleSelection(props) {
  return(
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
            onChangeText={e=>props.updateGroup(e)}
            placeholder="Enter group to join"
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
              props.joinGroup();
            }}
            title="Join"
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

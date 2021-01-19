import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Nav from './src/router/nav'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text></Text>
        <Nav></Nav>
      </View>
    );
  }

}
export default App;
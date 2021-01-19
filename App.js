import React, { Component } from 'react';
import { View } from 'react-native';
import Nav from './src/router/nav';
import { Provider } from 'mobx-react';
import RootStore from './src/mobx/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
<<<<<<< HEAD
        <Nav />
=======
        <Provider RootStore={RootStore}>
          <Nav />
        </Provider>
>>>>>>> bd9b934c44a6d27ba7862cac3bcd060bd2f622d4
      </View>
    );
  }
}

export default App;

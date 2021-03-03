import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import Nav from './src/router/nav';
import { Provider } from 'mobx-react';
import RootStore from './src/mobx/index';
import './src/utils/fontUtils';
// socket.io
import io from 'socket.io-client';
const socket = io('www.zhouqiao.art:9092', {
  query: 'userid=44515a6a1c25b33ceb259f9d080d7348',
  reconnect: false,
  'reconnection delay': 20000,
  transports: ['websocket'], // you need to explicitly tell it to use websockets
}).connect();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
        <Provider RootStore={RootStore}>
          <Nav />
        </Provider>
      </View>
    );
  }
}

export default App;

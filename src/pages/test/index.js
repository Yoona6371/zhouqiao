import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Option from '../../components/bussiness/Options';
import { file2 } from '../../constants/svg';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Option
          title={'nb嗷ghgjghgjasiudbaiuasdasudausdiuasdbabsbdabsbjg'}
          type={2}
          text_left={'22M'}
          text_right={'2020-20-20 20;20;20'}
          text={
            'asdasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasd'
          }
          svg={file2}
          text_more={'去完善'}
        />
      </View>
    );
  }
}

export default App;

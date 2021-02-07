/**
 * 页面初始化先渲染空视图减少页面转场时间
 */

import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';

export default class BlankPage extends PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Image
          style={{ width: 150, height: 150, backgroundColor: '#f5f5f5' }}
          source={require('../asserts/images/loading.gif')}
        />
      </View>
    );
  }
}

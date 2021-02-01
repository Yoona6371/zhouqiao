import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import RankCard from '../../components/bussiness/rankCard/rankCard'
class Test extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <RankCard
          rankNumber="04"
          userPhoto='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e'
          userName="小焦同学"
          hot="6669"
          onPress={() => alert('哎，关注我')}></RankCard>
      </View>
    );
  }
}

export default Test;

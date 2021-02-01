import React, { Component } from 'react';
import { pxToDp } from '../../utils/pxToDp';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import WelfareCard from '../../components/bussiness/welfareCard';
import { padding } from '../../utils/StyleUtils';

class Welfare extends Component {
  constructor() {
    super();
    this.state = {
      list: [
        {
          topImage: require('../../asserts/images/WelfareCard_image.png'),
          timeRemin: '5天',
          title: '超简单的英文字体设计套路超简单的英文字体 设计套路',
          welfareFund: 500,
          userNumber: 219,
        },
        {
          topImage: require('../../asserts/images/WelfareCard_image.png'),
          timeRemin: '5天',
          title: '超简单的英文字体设计套路超简单的英文字体 设计套路',
          welfareFund: 500,
          userNumber: 219,
        },
        {
          topImage: require('../../asserts/images/WelfareCard_image.png'),
          timeRemin: '5天',
          title: '超简单的英文字体设计套路超简单的英文字体 设计套路',
          welfareFund: 500,
          userNumber: 219,
        },
        {
          topImage: require('../../asserts/images/WelfareCard_image.png'),
          timeRemin: '5天',
          title: '超简单的英文字体设计套路超简单的英文字体 设计套路',
          welfareFund: 500,
          userNumber: 219,
        },
        {
          topImage: require('../../asserts/images/WelfareCard_image.png'),
          timeRemin: '5天',
          title: '超简单的英文字体设计套路超简单的英文字体 设计套路',
          welfareFund: 500,
          userNumber: 219,
        },
      ],
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="dark-content"
        />
        {/*Topstatus 开始*/}
        <View style={styles.topStatus} />
        {/*Topstatus 结束*/}
        {/*card 开始*/}
        <View style={styles.card__box}>
          <FlatList
            data={this.state.list}
            initialNumToRender={3}
            renderItem={({ item }) => {
              return <WelfareCard />;
            }}
          />
        </View>
        {/*  card 结束*/}
      </View>
    );
  }
}
export default Welfare;
const styles = StyleSheet.create({
  topStatus: {
    width: '100%',
    height: pxToDp(178),
    backgroundColor: '#ffffff',
  },
  card__box: { flex: 1, ...padding(30, 20, 0, 0) },
});

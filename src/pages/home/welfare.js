import React, { Component } from 'react';
import { pxToDp } from '../../utils/pxToDp';
import { View, StyleSheet, StatusBar, FlatList } from 'react-native';
import WelfareCard from '../../components/bussiness/welfareCard';
import { padding } from '../../utils/StyleUtils';
import TopTitle from '../../components/common/TopTitle';
class Welfare extends Component {
  constructor() {
    super();
    this.state = {
      list: [
        {
          topImage: require('../../asserts/images/WelfareCard_image.png'),
          timeRemin: '5天',
          title: '超简单的英文字体设计套路超简单的英文字体 设计套路',
          welfareFund: 200,
          userNumber: 219,
        },
        {
          topImage: require('../../asserts/images/WelfareCard_image.png'),
          timeRemin: '5天',
          title: '亲恭喜',
          welfareFund: 500,
          userNumber: 219,
        },
        {
          topImage: require('../../asserts/images/WelfareCard_image.png'),
          timeRemin: '5天',
          title: '方志敏',
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
        <TopTitle
          returnBack={() => {
            NavigationHelper.goBack();
          }}
          title="公益设计"
          showBtn={false}
        />
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="dark-content"
        />
        {/*Topstatus 开始*/}
        {/*<View style={styles.topStatus} />*/}
        {/*Topstatus 结束*/}
        {/*card 开始*/}
        <View style={styles.card__box}>
          <FlatList
            data={this.state.list}
            initialNumToRender={3}
            renderItem={({ item }) => {
              return (
                <WelfareCard
                  topImage={item.topImage}
                  userNumber={item.userNumber}
                  timeRemin={item.timeRemin}
                  title={item.title}
                  welfareFund={item.welfareFund}
                  userNumber={item.userNumber}
                />
              );
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

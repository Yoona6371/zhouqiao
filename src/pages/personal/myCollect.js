import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import TopTitle from '../../components/common/TopTitle';
import { ScrollView } from 'react-native-gesture-handler';
import TopTabNavigator from '../../components/common/TopTabNavigator';
import { pxToDp } from '../../utils/pxToDp';
import CommodityCard from '../../components/bussiness/CommodityCard';
export class detail extends Component {
  // 第1个标签下的内容
  firstModel = () => {
    return (
      <ScrollView>
        <View style={styles.containerBox}>
          <CommodityCard
            Commodity_type="PS/AI"
            type={2}
            Title="朗艺装饰企业网站建设 定制开发制作网页"
          />
          <CommodityCard
            Commodity_type="PS/AI"
            type={2}
            Title="朗艺装饰企业网站建设 定制开发制作网页"
          />
          <CommodityCard
            Commodity_type="PS/AI"
            type={2}
            Title="朗艺装饰企业网站建设 定制开发制作网页"
          />
          <CommodityCard
            Commodity_type="PS/AI"
            type={2}
            Title="朗艺装饰企业网站建设 定制开发制作网页"
          />
          <CommodityCard
            Commodity_type="PS/AI"
            type={2}
            Title="朗艺装饰企业网站建设 定制开发制作网页"
          />
          <CommodityCard
            Commodity_type="PS/AI"
            type={2}
            Title="朗艺装饰企业网站建设 定制开发制作网页"
          />
        </View>
      </ScrollView>
    );
  };
  // 第2个标签下的内容
  secondModel = () => {
    return (
      <ScrollView>
        <View style={styles.containerBox}>
          <CommodityCard
            Commodity_type="PS/AI"
            type={2}
            Title="朗艺装饰企业网站建设 定制开发制作网页"
          />
          <CommodityCard
            Commodity_type="PS/AI"
            type={2}
            Title="朗艺装饰企业网站建设 定制开发制作网页"
          />
        </View>
      </ScrollView>
    );
  };
  // 第3个标签下的内容
  thirdModel = () => {
    return <Text>asd</Text>;
  };
  // 第4个标签下的内容
  fourthModel = () => {
    return <Text>asd</Text>;
  };
  // 第5个标签下的内容
  fifthdModel = () => {
    return <Text>asd</Text>;
  };
  // 第6个标签下的内容
  sixthdModel = () => {
    return <Text>asd</Text>;
  };
  render() {
    const width = Dimensions.get('window').width;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <TopTitle
          title="我的收藏"
          showBtn={false}
          returnBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={{ flex: 1 }}>
          <TopTabNavigator
            itemWidth={width / 6}
            ifScrollEnabled={false}
            type={1}
            name={['手绘', 'PS/AI', '漫画', '平面', 'CAD', 'UI']}
          >
            {this.firstModel()}
            {this.secondModel()}
            {this.thirdModel()}
            {this.fourthModel()}
            {this.fifthdModel()}
            {this.sixthdModel()}
          </TopTabNavigator>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerBox: {
    paddingBottom: pxToDp(40),
    paddingTop: pxToDp(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});
export default detail;

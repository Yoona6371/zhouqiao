import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Search from '../../components/common/Search/index';
import TopTabNavigator from '../../components/common/TopTabNavigator';
import { pxToDp } from '../../utils/pxToDp';
import CommodityCard from '../../components/bussiness/CommodityCard';
import RankCard from '../../components/bussiness/rankCard/rankCard';
export class index extends Component {
  // static propTypes = {
  //     prop: PropTypes
  // }
  state = {
    txt: '',
  };
  changeTxt = (txt) => {
    this.setState({ txt });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Search
          onEndEditing={() => alert('编辑结束')}
          onPress={() => alert(99)}
          callBack={(txt) => {
            this.changeTxt(txt);
          }}
        />
        <TopTabNavigator
          itemWidth={120}
          ifScrollEnabled={false}
          type={1}
          name={['案例', '商品', '设计师']}
        >
          <ScrollView>
            <View style={styles.containerBox}>
              <CommodityCard
                type={1}
                user_id="心心"
                Commodity_type="AI"
                Title="朗艺装饰企业网站建设 定制开发制作网页"
              />
              <CommodityCard
                type={1}
                user_id="心心"
                Commodity_type="AI"
                Title="朗艺装饰企业网站建设 定制开发制作网页"
              />
              <CommodityCard
                type={1}
                user_id="心心"
                Commodity_type="AI"
                Title="朗艺装饰企业网站建设 定制开发制作网页"
              />
              <CommodityCard
                type={1}
                user_id="心心"
                Commodity_type="AI"
                Title="朗艺装饰企业网站建设 定制开发制作网页"
              />
              <CommodityCard
                type={1}
                user_id="心心"
                Commodity_type="AI"
                Title="朗艺装饰企业网站建设 定制开发制作网页"
              />
              <CommodityCard
                type={1}
                user_id="心心"
                Commodity_type="AI"
                Title="朗艺装饰企业网站建设 定制开发制作网页"
              />
            </View>
          </ScrollView>
          <ScrollView>
            <View style={styles.containerBox2}>
              <CommodityCard
                type={3}
                prince="123"
                Title="朗艺装饰企业网站建设 定制开发制作网页"
              />
              <CommodityCard
                type={3}
                prince="123"
                Title="朗艺装饰企业网站建设 定制开发制作网页"
              />
              <CommodityCard
                type={3}
                prince="123"
                Title="朗艺装饰企业网站建设 定制开发制作网页"
              />
              <CommodityCard
                type={3}
                prince="123"
                Title="朗艺装饰企业网站建设 定制开发制作网页"
              />
            </View>
          </ScrollView>
          <ScrollView>
            <View style={styles.containerBox3}>
              <RankCard
                rankNumber="04"
                userPhoto="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e"
                userName="小焦同学"
                hot="6669"
                onPress={() => alert('哎，关注我')}
              />
              <RankCard
                rankNumber="04"
                userPhoto="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e"
                userName="小焦同学"
                hot="6669"
                onPress={() => alert('哎，关注我')}
              />
            </View>
          </ScrollView>
        </TopTabNavigator>
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
  containerBox2: {
    paddingBottom: pxToDp(40),
    paddingTop: pxToDp(42),
    paddingLeft: pxToDp(16),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  containerBox3: {
    paddingTop: pxToDp(24),
  },
});
export default index;

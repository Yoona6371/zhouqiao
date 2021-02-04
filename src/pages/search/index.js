import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Search from '../../components/common/Search/index';
import TopTabNavigator from '../../components/common/TopTabNavigator';
import { pxToDp } from '../../utils/pxToDp';
import CommodityCard from '../../components/bussiness/CommodityCard';
import RankCard from '../../components/bussiness/rankCard/rankCard';

class all extends Component {
  render() {
    return (
      <View>
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
      </View>
    );
  }
}
class wait extends Component {
  render() {
    console.log(this.props);
    return (
      <View>
        <ScrollView>
          <View style={styles.containerBox2}>
            <CommodityCard
              type={3}
              prince={123}
              Title="朗艺装饰企业网站建设 定制开发制作网页"
            />
            <CommodityCard
              type={3}
              prince={123}
              Title="朗艺装饰企业网站建设 定制开发制作网页"
            />
            <CommodityCard
              type={3}
              prince={123}
              Title="朗艺装饰企业网站建设 定制开发制作网页"
            />
            <CommodityCard
              type={3}
              prince={123}
              Title="朗艺装饰企业网站建设 定制开发制作网页"
            />
            <CommodityCard
              type={3}
              prince={123}
              Title="朗艺装饰企业网站建设 定制开发制作网页"
            />
            <CommodityCard
              type={3}
              prince={123}
              Title="朗艺装饰企业网站建设 定制开发制作网页"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
class already extends Component {
  render() {
    return (
      <View>
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
      </View>
    );
  }
}
export class index extends Component {
  // static propTypes = {
  //     prop: PropTypes
  // }
  state = {
    txt: '',
    pages: [
      {
        key: '全部',
        title: '全部',
        component: all,
      },
      {
        key: '待接取',
        title: '待接取',
        component: wait,
      },
      {
        key: '已选定',
        title: '已选定',
        component: already,
      },
    ],
  };
  MyTabs = () => {
    const widthPhone = Dimensions.get('window').width;
    let { pages } = this.state;
    return (
      <TopTabNavigator
        ifScrollEnabled={true}
        type={1}
        itemWidth={widthPhone / 3}
        routes={pages}
      />
    );
  };
  changeTxt = (txt) => {
    this.setState({ txt });
  };
  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Search
          onEndEditing={() => alert('编辑结束')}
          onPress={() => NavigationHelper.goBack()}
          callBack={(txt) => {
            this.changeTxt(txt);
          }}
        />
        {this.MyTabs()}
        {/* <TopTabNavigator itemWidth={120} ifScrollEnabled={false} type={1} name={['案例', '商品', '设计师']}>
                    <ScrollView>
                        <View style={styles.containerBox}>
                            <CommodityCard type={1} user_id="心心" Commodity_type="AI" Title="朗艺装饰企业网站建设 定制开发制作网页"></CommodityCard>
                            <CommodityCard type={1} user_id="心心" Commodity_type="AI" Title="朗艺装饰企业网站建设 定制开发制作网页"></CommodityCard>
                            <CommodityCard type={1} user_id="心心" Commodity_type="AI" Title="朗艺装饰企业网站建设 定制开发制作网页"></CommodityCard>
                            <CommodityCard type={1} user_id="心心" Commodity_type="AI" Title="朗艺装饰企业网站建设 定制开发制作网页"></CommodityCard>
                            <CommodityCard type={1} user_id="心心" Commodity_type="AI" Title="朗艺装饰企业网站建设 定制开发制作网页"></CommodityCard>
                            <CommodityCard type={1} user_id="心心" Commodity_type="AI" Title="朗艺装饰企业网站建设 定制开发制作网页"></CommodityCard>
                        </View>
                    </ScrollView>
                    <ScrollView>
                        <View style={styles.containerBox2}>
                            <CommodityCard type={3} prince="123" Title="朗艺装饰企业网站建设 定制开发制作网页"></CommodityCard>
                            <CommodityCard type={3} prince="123" Title="朗艺装饰企业网站建设 定制开发制作网页"></CommodityCard>
                            <CommodityCard type={3} prince="123" Title="朗艺装饰企业网站建设 定制开发制作网页"></CommodityCard>
                            <CommodityCard type={3} prince="123" Title="朗艺装饰企业网站建设 定制开发制作网页"></CommodityCard>
                        </View>
                    </ScrollView>
                    <ScrollView>
                        <View style={styles.containerBox3}>
                            <RankCard
                                rankNumber="04"
                                userPhoto='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e'
                                userName="小焦同学"
                                hot="6669"
                                onPress={() => alert('哎，关注我')}></RankCard>
                            <RankCard
                                rankNumber="04"
                                userPhoto='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e'
                                userName="小焦同学"
                                hot="6669"
                                onPress={() => alert('哎，关注我')}></RankCard>
                        </View>
                    </ScrollView>
                </TopTabNavigator> */}
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

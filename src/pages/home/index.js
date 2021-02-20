import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  ImageBackground,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Banner from '../../components/bussiness/banner';
import SearchInput from '../../components/bussiness/searchInput';
import Icon from '../../components/common/Icon';
import HotCard from '../../components/bussiness/HotCard';
import ContainerCard from '../../components/bussiness/ContainerCard';
import Avatar from '../../components/common/Avatar';
import TopTabNavigator from '../../components/common/TopTabNavigator';
import HomeTabCase from './HomeTabCase';
import HomeTabShop from './HomeTabShop';

import { deviceWidthDp, pxToDp } from '../../utils/pxToDp';
import {
  flexColumnSpb,
  flexRowCenter,
  flexRowSpb,
  fontStyle,
  margin,
  padding,
} from '../../utils/StyleUtils';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [
        {
          key: '关注',
          title: '关注',
          component: HomeTabCase,
        },
        {
          key: 'Ps',
          title: 'Ps',
          component: HomeTabCase,
        },
        {
          key: 'AI',
          title: 'AI',
          component: HomeTabCase,
        },
        {
          key: 'CAD',
          title: 'CAD',
          component: HomeTabCase,
        },
        {
          key: 'UI设计',
          title: 'UI设计',
          component: HomeTabCase,
        },
        {
          key: '工业设计',
          title: '工业设计',
          component: HomeTabCase,
        },
      ],
      hotData: [1, 2, 3, 4, 5],
      headerPhoto: [
        {
          name: 'ggg',
          image: {
            uri:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F03%2F20190203161419_yerng.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614417723&t=5907bf967350d3d3230702a176ec8381',
          },
        },
        {
          name: 'ggg',
          image: {
            uri:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F03%2F20190203161419_yerng.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614417723&t=5907bf967350d3d3230702a176ec8381',
          },
        },
        {
          name: 'ggg',
          image: {
            uri:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F03%2F20190203161419_yerng.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614417723&t=5907bf967350d3d3230702a176ec8381',
          },
        },
        {
          name: 'ggg',
          image: {
            uri:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F03%2F20190203161419_yerng.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614417723&t=5907bf967350d3d3230702a176ec8381',
          },
        },
        {
          name: 'ggg',
          image: {
            uri:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F03%2F20190203161419_yerng.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614417723&t=5907bf967350d3d3230702a176ec8381',
          },
        },
        {
          name: 'ggg',
          image: {
            uri:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F03%2F20190203161419_yerng.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614417723&t=5907bf967350d3d3230702a176ec8381',
          },
        },
      ],
    };
    // console.log('this.props:', this.props);
  }

  componentDidMount() {
    //eg 全局数据调用，需要修改数据则需要添加obsever装饰器
    // console.log('全局数据调用：', this.props.RootStore);
    //eg 调用接口
    // this.props.RootStore.globalStore.allData.Http.test().then((res) => {
    //   console.log('get请求返回值：', res);
    // });
  }
  MyTabs = () => {
    let { pages } = this.state;
    return (
      <TopTabNavigator
        ifScrollEnabled={true}
        type={3}
        itemWidth={deviceWidthDp / 5}
        routes={pages}
      />
    );
  };

  onFocus() {
    NavigationHelper.navigate('search');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../../asserts/images/home_header_bg.png')}
          style={styles.home_header1}
        >
          <View style={styles.header_container}>
            <Image
              style={styles.header_logo}
              source={require('../../asserts/images/logo.jpg')}
            />
            <SearchInput onFocus={this.onFocus} />
            <Icon name={'earphone'} style={{ fontSize: pxToDp(36) }} />
          </View>
        </ImageBackground>
        <ScrollView
          style={{
            backgroundColor: '#fff',
          }}
        >
          <ImageBackground
            source={require('../../asserts/images/home_header_bg.png')}
            style={styles.home_header2}
          >
            <Banner />
          </ImageBackground>
          {/*最新通知*/}
          <View style={styles.home_information}>
            <View style={{ ...flexRowSpb, justifyContent: 'flex-start' }}>
              <TouchableOpacity
                onPress={() => NavigationHelper.navigate('消息')}
                style={styles.information_text1_container}
              >
                <Icon
                  name={'information'}
                  style={{
                    fontSize: pxToDp(28),
                    paddingBottom: pxToDp(6),
                    color: '#FE9E0E',
                  }}
                />
                <Text
                  style={{
                    ...styles.information_text1,
                    paddingLeft: pxToDp(20),
                  }}
                >
                  最新
                </Text>
                <Text style={{ ...styles.information_text1, color: '#FE9E0E' }}>
                  通知
                </Text>
              </TouchableOpacity>
              <Text style={styles.information_text2}>
                舟桥之家APP即将上线啦！
              </Text>
            </View>
            <Text style={styles.information_date}>8-11</Text>
          </View>
          {/*四个模块*/}
          <View style={styles.home_module}>
            <TouchableOpacity
              onPress={() => NavigationHelper.navigate('CommodityList')}
              style={styles.module_container}
            >
              <Image
                source={require('../../asserts/icons/原创设计.png')}
                style={{ width: pxToDp(62), height: pxToDp(66) }}
              />
              <Text style={styles.module_text}>原创设计</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => NavigationHelper.navigate('Welfare')}
              style={styles.module_container}
            >
              <Image
                source={require('../../asserts/icons/精彩活动.png')}
                style={{ width: pxToDp(66), height: pxToDp(65) }}
              />
              <Text style={styles.module_text}>精彩活动</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => NavigationHelper.navigate('CommodityList')}
              style={styles.module_container}
            >
              <Image
                source={require('../../asserts/icons/大咖设计.png')}
                style={{ width: pxToDp(80), height: pxToDp(66) }}
              />
              <Text style={styles.module_text}>大咖设计</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => NavigationHelper.navigate('设计师')}
              style={styles.module_container}
            >
              <Image
                source={require('../../asserts/icons/设计榜单.png')}
                style={{ width: pxToDp(64), height: pxToDp(64) }}
              />
              <Text style={styles.module_text}>设计榜单</Text>
            </TouchableOpacity>
          </View>
          {/*热门案例*/}
          <ContainerCard
            title={'热门案例'}
            router={'CommodityList'}
            style={styles.hot_container}
          >
            {/*热门列表开始*/}
            <FlatList
              horizontal={true}
              data={this.state.hotData}
              renderItem={({ item }) => <HotCard key={item} />}
            />
            {/*热门列表结束*/}
          </ContainerCard>
          {/*精彩案例*/}
          <ImageBackground
            source={require('../../asserts/images/Commodity_bg.png')}
            style={styles.commodity_header}
          >
            <Text style={styles.commodity_header_title}>精彩案例</Text>
          </ImageBackground>
          <View style={{ height: pxToDp(1800), overflow: 'hidden' }}>
            {this.MyTabs()}
          </View>
          <TouchableOpacity
            onPress={() => NavigationHelper.navigate('CommodityList')}
            style={{
              width: pxToDp(690),
              height: pxToDp(72),
              alignSelf: 'center',
              backgroundColor: '#FEF5E7',
            }}
          >
            <Text
              style={{
                ...fontStyle(26, 72, 72, 'normal', '#FE9E0E', 'center'),
              }}
            >
              点击查看更多
            </Text>
          </TouchableOpacity>
          {/*设计师*/}
          <ContainerCard
            title={'设计师'}
            router={'设计师'}
            style={styles.hot_container}
          >
            {/*热门列表开始*/}
            <FlatList
              horizontal={true}
              data={this.state.headerPhoto}
              renderItem={({ item }) => (
                <HomeAvatar name={item.name} image={item.image} />
              )}
            />
            {/*热门列表结束*/}
          </ContainerCard>
          <ContainerCard
            router={'GoodsList'}
            title={'周边产品'}
            style={styles.shop_container}
          >
            {/*商品列表开始*/}
            <HomeTabShop />
            {/*商品列表结束*/}
          </ContainerCard>
        </ScrollView>
      </View>
    );
  }
}
export default Index;
class HomeAvatar extends Component {
  render() {
    return (
      <View style={{ ...margin(25, 36, 25, 46) }}>
        <Avatar size={130} image={this.props.image} isVip={true} />
        <Text
          style={{
            marginTop: pxToDp(15),
            ...fontStyle(28, 36, 36, 'normal', '#333', 'center'),
          }}
        >
          {this.props.name}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home_header1: {
    width: deviceWidthDp,
    height: pxToDp(168),
  },
  home_header2: {
    width: deviceWidthDp,
    height: pxToDp(362),
  },
  header_container: {
    ...flexRowSpb,
    ...padding(30, 80, 30, 42),
  },
  header_logo: {
    width: pxToDp(114),
    height: pxToDp(74),
  },
  home_information: {
    ...padding(0, 35, 0, 35),
    ...margin(30, 0, 30, 0),
    ...flexRowSpb,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
  },
  information_text1_container: {
    ...flexRowSpb,
    justifyContent: 'flex-start',
    paddingRight: pxToDp(20),
    borderRightWidth: 1,
    borderColor: '#DDDDDD',
  },
  information_text1: {
    ...fontStyle(32, 36, 36, 'bold', '#1B2439', 'left'),
  },
  information_text2: {
    marginLeft: pxToDp(20),
    ...fontStyle(26, 28, 28, 'normal', '#333333', 'left'),
  },
  information_date: {
    ...fontStyle(24, 24, 24, 'normal', '#999', 'left'),
  },
  home_module: {
    ...flexRowSpb,
    ...padding(41, 44, 41, 0),
  },
  module_container: {
    width: pxToDp(106),
    ...flexColumnSpb,
  },
  module_text: {
    marginTop: pxToDp(24),
    ...fontStyle(26, 36, 36, 'normal', '#222', 'center'),
  },
  hot_container: {
    marginTop: pxToDp(48),
  },
  commodity_header: {
    width: pxToDp(690),
    height: pxToDp(120),
    alignSelf: 'center',
    ...flexRowCenter,
  },
  commodity_header_title: {
    ...fontStyle(36, 40, 40, 'normal', '#fff', 'center'),
  },
  shop_container: {
    paddingTop: pxToDp(48),
    borderTopWidth: pxToDp(16),
    borderColor: '#F8F8F8',
  },
});

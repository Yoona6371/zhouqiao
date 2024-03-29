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
  Platform,
  TextInput,
} from 'react-native';
import Shimmer from 'react-native-shimmer';
import * as WeChat from 'react-native-wechat-lib';
import { inject, observer } from 'mobx-react';

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
import CommodityCard from '../../components/bussiness/CommodityCard';
import {
  handleOpenApp,
  handlePayment,
  handleShareToSession,
} from '../../utils/wxHandle';
import Toast from '../../components/common/Toast/Toast';
import LocalStorageUtils from '../../utils/LocalStorageUtils';

@inject('RootStore')
@observer
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      pages: [],
      hotData: [
        {
          case_id: 0,
          cover: '',
          case_name: '',
          purchase_num: 0,
        },
        {
          case_id: 1,
          cover: '',
          case_name: '',
          purchase_num: 0,
        },
      ],
      headerPhoto: [
        {
          name: '',
          image: {
            uri: '',
          },
        },
        {
          name: '',
          image: {
            uri: '',
          },
        },
        {
          name: '',
          image: {
            uri: '',
          },
        },
        {
          name: '',
          image: {
            uri: '',
          },
        },
        {
          name: '',
          image: {
            uri: '',
          },
        },
      ],
      dataList: [
        { case_name: '', picture: '', user_id: '', case_author_avatar: '' },
        { case_name: '', picture: '', user_id: '', case_author_avatar: '' },
        { case_name: '', picture: '', user_id: '', case_author_avatar: '' },
        { case_name: '', picture: '', user_id: '', case_author_avatar: '' },
        { case_name: '', picture: '', user_id: '', case_author_avatar: '' },
        { case_name: '', picture: '', user_id: '', case_author_avatar: '' },
      ],
      slideList: [],
      apiVersion: null,
      isWXAppInstalled: false,
      wxAppInstallUrl: null,
      isWXAppSupportApi: false,
      payload: {
        partnerId: '1606239230',
        nonceStr: 'a9ef3c0a0bf34cc49f2fb3a44c236d89',
        prepayId: 'wx01000556641895951023fa0442bde40000',
        sign: '1910F5FCCA93317E81693F0E1EC11BE6',
        timeStamp: '1614528360',
      },
    };
    this._contentViewScroll = this._contentViewScroll.bind(this);
    this.Payment = this.Payment.bind(this);
  }

  async componentDidMount() {
    let hotDesignCaseList = await Http.categoryCase({
      category_id: 3,
      page: 1,
      size: 12,
    });
    // console.log(hotDesignCaseList);
    let rankingListRes = await Http.rankingList({
      page: 1,
      size: 8,
    });
    let rankingList = [];
    rankingListRes.data.data.dataList.forEach((item) => {
      rankingList.push({
        name: item.nickName,
        image: {
          uri: item.userAvatar,
        },
        userId: item.userId,
      });
    });
    //获取案例类别
    let res = await Http.caseType();
    let arrCaseType = [];
    res.data.data.forEach((item) => {
      arrCaseType.push({
        key: item.categoryId,
        title: item.category,
        component: HomeTabCase,
      });
    });

    // console.log(rankingListRes);

    let slideRes = await Http.getSlideShow({
      type: 0,
    });
    let slideList = [];
    slideRes.data.data.forEach((item) => {
      slideList.push({
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: item.cover,
      });
    });

    this.setState({
      hotData: hotDesignCaseList.data.data.records,
      pages: arrCaseType,
      headerPhoto: rankingList,
      slideList,
      apiVersion: await WeChat.getApiVersion(),
      wxAppInstallUrl:
        Platform.OS === 'ios' ? await WeChat.getWXAppInstallUrl() : null,
      isWXAppSupportApi: await WeChat.isWXAppSupportApi(),
      isWXAppInstalled: await WeChat.isWXAppInstalled(),
    });

    // 设置全局微信
    this.props.RootStore.globalStore.setApiVersion(this.state.apiVersion);
    this.props.RootStore.globalStore.setWxAppInstallUrl(
      this.state.wxAppInstallUrl,
    );
    this.props.RootStore.globalStore.setIsWXAppSupportApi(
      this.state.isWXAppSupportApi,
    );
    this.props.RootStore.globalStore.setIsWXAppInstalled(
      this.state.isWXAppInstalled,
    );

    // 如果有token就拿token
    const token = await LocalStorageUtils.get('accessToken');
    console.log(token, 'token');
    if (token !== null || '' || undefined) {
      console.log(token);
      this.props.RootStore.userStore.setToken(token.value);
    }
  }

  MyTabs = () => {
    let { pages } = this.state;
    if (pages.length === 0) {
      return (
        <View>
          <Shimmer style={{ marginTop: pxToDp(30) }}>
            <View
              style={{
                height: pxToDp(45),
                width: deviceWidthDp,
                backgroundColor: '#eae8e8',
              }}
            />
          </Shimmer>
          <FlatList
            data={this.state.dataList}
            numColumns={2}
            contentContainerStyle={{ backgroundColor: '#fff' }}
            keyExtractor={this.keyExtractor}
            renderItem={({ item, index }) => (
              <CommodityCard
                Title={item.case_name}
                user_id={item.case_author}
                Commodity_type={this.props.route.title}
                image={item.picture}
                user_image={item.case_author_avatar}
                userId={123}
                style={{ ...padding(25, 0, 25, 0) }}
              />
            )}
          />
        </View>
      );
    } else {
      return (
        <TopTabNavigator
          ifScrollEnabled={true}
          type={3}
          itemWidth={deviceWidthDp / 5}
          routes={pages}
        />
      );
    }
  };

  onFocus() {
    NavigationHelper.navigate('search');
  }

  onRef = (ref) => {
    this.child = ref;
  };

  _contentViewScroll(e: Object) {
    let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight - pxToDp(10)) {
      this.child.onFooterRefresh();
    }
  }

  async Payment() {
    console.log(this.state.value);
    let res = await Http.getPaymentDetail({
      body: '舟桥之家',
      outTradeNo: '456asdsad4aa125648',
      totalFee: 1,
    });
    console.log(res);

    if (res.data.code !== 0) {
      Toast.sad(res.data.msg);
    } else {
      res = res.data.data.data;
      let payload = {
        partnerId: res.partnerid,
        nonceStr: res.noncestr,
        prepayId: res.prepayid,
        sign: res.sign,
        timeStamp: res.timestamp,
        pg: res.package,
      };
      this.setState({ payload });
      await handlePayment(
        this.props.RootStore.globalStore.allData.isWXAppInstalled,
        payload,
      );
    }
    // await WeChat.shareImage({
    //   imageUrl:
    //     'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn10112%2F152%2Fw1080h672%2F20181224%2Fd0f1-hqqzpkv0678153.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617205659&t=c9598c57cc22765b9057b329a045ead8',
    //   scene: 0,
    // });
  }
  //
  // onChangeText(text) {
  //   this.setState({ value: text });
  // }
  render() {
    let list = ['asd', 'asd'];
    return (
      <View style={{ flex: 1 }}>
        {/*<TextInput*/}
        {/*  style={{*/}
        {/*    height: 40,*/}
        {/*    borderColor: 'gray',*/}
        {/*    borderWidth: 1,*/}
        {/*    marginTop: 30,*/}
        {/*  }}*/}
        {/*  onChangeText={(text) => this.onChangeText(text)}*/}
        {/*  value={this.state.value}*/}
        {/*/>*/}
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
          onMomentumScrollEnd={this._contentViewScroll}
        >
          <ImageBackground
            source={require('../../asserts/images/home_header_bg.png')}
            style={styles.home_header2}
          >
            {this.state.slideList.length === 0 ? (
              <Shimmer style={{ marginTop: pxToDp(10) }}>
                <View
                  style={{
                    height: pxToDp(346),
                    width: pxToDp(230),
                    backgroundColor: '#eae8e8',
                  }}
                />
              </Shimmer>
            ) : (
              <Banner slideList={this.state.slideList} />
            )}
          </ImageBackground>
          {/*最新通知*/}
          <View style={styles.home_information}>
            <View style={{ ...flexRowSpb, justifyContent: 'flex-start' }}>
              <TouchableOpacity
                onPress={() => NavigationHelper.navigate('消息')}
                // onPress={() => this.Payment()}
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
                舟桥之家APP即将上线啦3-5！
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
              renderItem={({ item }) => (
                <HotCard caseType={2} key={item.case_id} item={item} />
              )}
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
          <View style={{ height: pxToDp(1750), overflow: 'hidden' }}>
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
                <HomeAvatar
                  name={item.name}
                  image={item.image}
                  userId={item.userId}
                />
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
            <HomeTabShop onRef={this.onRef} />
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
        <Avatar
          userId={this.props.userId}
          size={130}
          image={this.props.image}
          isVip={true}
        />
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
    height: pxToDp(342),
    overflow: 'hidden',
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
    ...padding(0, 15, 0, 35),
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

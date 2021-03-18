import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { pxToDp, deviceHeightDp } from '../../utils/pxToDp';
import LinearGradient from 'react-native-linear-gradient';
import { activeOpacity } from '../../constants/config';
import DynamicList from '../../components/bussiness/DynamicList';
import Avatar from '../../components/common/Avatar/index';
import Icon from '../../components/common/Icon/index';
import Toast from '../../components/common/Toast/Toast';
import { inject, observer } from 'mobx-react';
import CommodityCard from '../../components/bussiness/CommodityCard';
import RefreshListView, {
  RefreshState,
} from '../../components/common/RefreshListView';

import {
  flexColumnCenter,
  flexColumnSpb,
  flexRowCenter,
  flexRowSpb,
  fontStyle,
  margin,
  padding,
} from '../../utils/StyleUtils';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

/**
 * 使用时得传入用户的userId
 * 例如：
 * <Others userId={'cfc241796dc3f8d4a86150a1131789d3'}/>
 */
@inject('RootStore')
@observer
class Others extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      // 更换背景的路由
      changeBackground: 'ImageShow',
      nickname: '',
      avatar:
        'https://wx2.sinaimg.cn/mw1024/cd966a9aly1gnw4r3wxl0j207i07it8p.jpg',
      description: '',
      // 他的关注-> 查看的那个路由
      seeMyFollows: 'ImageShow',
      // 他的阅读-> 查看的那个路由
      seeRecentReadBooks: 'ImageShow',
      personDetail: [
        {
          num: 0,
          des: '关注数',
        },
        {
          num: 0,
          des: '粉丝数',
        },
        {
          num: 0,
          des: '成交订单',
        },
        {
          num: 0,
          des: '积分',
        },
      ],
      // 他的关注数组（最多8个头像）
      followsAvatar: [],
      // ——————————————他的设计案例分页相关开始————————————————
      // 设计案例
      dataList: [],
      refreshState: RefreshState.Idle,
      totalPage: 0,
      currentPage: 1,
      id: 0,
      // ——————————————他的设计案例分页相关结束————————————————
    };
    this._contentViewScroll = this._contentViewScroll.bind(this);
  }

  async componentDidMount() {
    // 获取他人基本信息
    await this.getOthersDetail();
    // 获取他人关注列表
    await this.getOthersFocusList();

    // 分页刚开始刷新
    await this.onHeaderRefresh();
  }

  // 获取他人基本信息
  getOthersDetail = async () => {
    console.log('函数执行开始');
    const detail = await Http.getOthersDetail(
      {},
      `/${this.props.route.params.params.userId}/baseInfo`,
    );
    console.log(123123,detail)
    if (detail.status === 200) {
      const data = detail.data.data;
      let answer = [
        {
          num: data.stylistStatistics===undefined?data.stylistStatistics.followedNum:0,
          des: '关注数',
        },
        {
          num:  data.stylistStatistics===undefined?data.stylistStatistics.fansNum:0,
          des: '粉丝数',
        },
        {
          num: data.stylistStatistics===undefined? data.stylistStatistics.orderFinishedNum:0,
          des: '成交订单',
        },
        {
          num: 6592,
          des: '积分',
        },
      ];
      this.setState({
        nickname: data.nickName,
        avatar: data.userAvatar,
        description: data.introduction,
        personDetail: answer,
      });
    } else {
      Toast.sad('加载失败');
    }
  };

  // 获取他人关注列表
  // {
  //   "code": 0,
  //   "msg": "操作成功",
  //   "data": {
  //     "totalPage": 1,
  //     "totalRecords": 1,
  //     "pageSize": 8,
  //     "dataList": [
  //       {
  //         "userId": "44515a6a1c25b33ceb259f9d080d7348",
  //         "avatar": "1.jpg",
  //         "userNick": "解亚伟最帅",
  //         "followedUser": false
  //       }
  //     ]
  //   }
  // }
  getOthersFocusList = async () => {
    console.log(123123123,this.props.route.params.params.userId)
    const detail = await Http.getOthersFocusList(
      { page: 1, size: 8 },
      `/${this.props.route.params.params.userId}/follower`,
    );
      console.log(12312312,detail);
    if (detail.status === 200) {
      const data = detail.data.data;
      let focus = [];

      for (let i = 0; i < Math.min(8, data.totalRecords); i++) {
        focus.push({
          userId: data.dataList[i].userId,
          avatar: data.dataList[i].avatar,
        });
      }
      this.setState({
        followsAvatar: focus,
      });
    } else {
      Toast.sad('加载失败');
    }
  };

  // ——————————————————————————————分页相关开始————————————————————————————
  onHeaderRefresh = async () => {
    this.setState({ refreshState: RefreshState.HeaderRefreshing });
    let dataList = await this.getList(true);

    this.setState({
      dataList: dataList,
      refreshState:
        dataList.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
    });
  };

  onFooterRefresh = async () => {
    this.setState({ refreshState: RefreshState.FooterRefreshing });
    const { totalPage, currentPage } = this.state;
    let dataList = await this.getList(false, currentPage + 1);
    this.setState({
      dataList: dataList,
      refreshState:
        dataList.length === totalPage
          ? RefreshState.NoMoreData
          : RefreshState.Idle,
    });
  };

  // 获取她的设计案例
  // {
  //   "currentPage": 1,
  //   "dataList": [{
  //     "caseAuthor": "DAOKO",
  //     "caseAuthorAvatar": "https://homesitetask.zbjimg.com/homesite%2Ftask%2F%E5%9B%BE%E5%B1%82-3.jpg%2Forigine%2Feededdb2-45fc-4f89-82ed-1c2ec1d6d93b",
  //     "caseAuthorId": "573e31ca621f8eb0dc7e55939c6b4236",
  //     "caseId": 16,
  //     "caseLink": "https://zhouqiao.oss-cn-beijing.aliyuncs.com/requirement/zip/db4db1c0-7e8c-4f7c-aae3-a3d00709ee3f.zip",
  //     "caseName": "文旅集团品牌茶叶礼盒包装设计插画包装年货包装",
  //     "category": "PPT设计",
  //     "categoryId": 2,
  //     "collectNum": 0,
  //     "cover": "https://homesitetask.zbjimg.com/homesite%2Ftask%2F7.jpg%2Forigine%2F6ca488d9-77ff-4fde-b3a6-715489bc8b40",
  //     "createTime": [Array],
  //     "picture": "https://homesitetask.zbjimg.com/homesite%2Ftask%2F1.jpg%2Forigine%2Fe0bb08bb-14a2-4f0d-ab93-03aaa295ea02",
  //     "price": 20000,
  //     "purchaseNum": 0,
  //     "updateTime": [Array]
  //   }],
  //   "pageSize": 6,
  //   "totalPage": 5,
  //   "totalRecords": 29
  // }
  async getList(isReload: Boolean, currentPage = 1): Array<Object> {
    const message = await Http.getDesignExample({
      page: currentPage,
      size: 4,
      userId: this.props.route.params.params.userId,
    });

    if (!message || !message.status === 200) {
      Toast.sad('信息获取失败');
      return;
    }

    const newList = message.data.data.dataList;
    let ans = [];
    for (let i = 0; i < newList.length; i++) {
      ans.push({
        image: newList[i].picture,
        Title: newList[i].caseName,
        user_image: newList[i].caseAuthorAvatar,
        user_id: newList[i].caseAuthor,
        Commodity_type: 'PS / AI',
        id: this.state.id + 1,
      });
      this.setState({ id: this.state.id + 1 });
    }

    this.setState({
      totalPage: message.data.data.totalPage,
      currentPage: message.data.data.currentPage,
    });

    return isReload ? ans : [...this.state.dataList, ...ans];
  }

  _renderItem(item) {
    return (
      <CommodityCard
        image={item.item.image}
        Title={item.item.Title}
        user_image={item.item.user_image}
        user_id={item.item.user_id}
        Commodity_type={item.item.Commodity_type}
        style={{ ...padding(25, 25, 0, 0) }}
      />
    );
  }

  // ——————————————————————————————分页相关结束————————————————————————————

  // 联系他按钮
  focus = () => {
    console.log('联系他');
  };

  _renderAvatar() {
    if (this.state.followsAvatar.length === 0) {
      return (
        <Text
          style={{
            letterSpacing: pxToDp(5),
            fontSize: pxToDp(24),
            lineHeight: pxToDp(43),
            color: '#888888',
          }}
        >
          暂无关注
        </Text>
      );
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.state.followsAvatar.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={activeOpacity}
              onPress={() => NavigationHelper.navigate(item.userId)}
              style={{ marginRight: pxToDp(23) }}
            >
              <Avatar
                image={{
                  uri: item.avatar,
                }}
                size={75}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  
  render() {
    console.log(1111111,this.state.followsAvatar);
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.others__wrap}>
          <View style={styles.others__mySpace}>
            {/* 挤开电量那一栏 */}
            <View style={{ height: pxToDp(40) }} />

            {/* 更换背景那一栏 */}
            <TouchableOpacity
              style={{
                height: pxToDp(103),
                ...flexRowSpb,
                ...padding(30, 0, 30, 0),
              }}
              onPress={() => NavigationHelper.goBack()}
            >
              <Icon
                name={'left'}
                // 如果需要点击事件，把这个按钮去掉注释就可以
                // onPress={this.context.goBack}
                style={{
                  ...margin(0, 10, 0, 0),
                  fontSize: pxToDp(40),
                  color: '#fff',
                }}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{ backgroundColor: '#fff' }}
            onMomentumScrollEnd={this._contentViewScroll}
          >
            {/* 我的空间和头像那部分 */}
            <View
              style={{
                ...flexRowSpb,
                ...padding(48, 0, 40, 66),
                backgroundColor: '#F9B762',
              }}
            >
              <View>
                <Text
                  style={{
                    letterSpacing: pxToDp(2),
                    ...fontStyle(46, 157, 157, '700', 'white', 'left'),
                  }}
                >
                  {this.state.nickname}
                </Text>
              </View>
              <Avatar
                image={{
                  uri: this.state.avatar,
                }}
                size={157}
              />
            </View>
            {/* 关注我、粉丝数、成交订单、积分那部分 */}
            <View
              style={{
                height: pxToDp(130),
                backgroundColor: 'rgba(249, 183, 98, 0.8)',
                ...flexRowSpb,
                ...padding(67, 30, 67, 30),
              }}
            >
              {this.state.personDetail.map((item, index) => {
                return (
                  <View style={{ ...flexColumnCenter }} key={index}>
                    <View>
                      <Text
                        style={{
                          letterSpacing: pxToDp(2),
                          ...fontStyle(37, 56, 56, '700', 'white', 'center'),
                        }}
                      >
                        {item.num}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          ...fontStyle(28, 45, 45, '400', 'white', 'center'),
                        }}
                      >
                        {item.des}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            {/* —————————————————————————————————————————————————————————————————————————————————— */}
            {/* 个人简介模块 */}
            <View style={styles.others__personMessage}>
              <View>
                <Text
                  style={{
                    letterSpacing: pxToDp(2),
                    ...fontStyle(32, 110, 110, '700', 'black', 'left'),
                  }}
                >
                  个人简介
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    letterSpacing: pxToDp(5),
                    fontSize: pxToDp(24),
                    lineHeight: pxToDp(43),
                    color: '#888888',
                  }}
                >
                  {this.state.description}
                </Text>
              </View>
            </View>
            {/* —————————————————————————————————————————————————————————————————————————————————— */}
            {/* 我的关注模块 */}
            <View style={{ ...margin(25, 0, 25, 15) }}>
              <View style={{ ...flexRowSpb }}>
                <Text
                  style={{
                    letterSpacing: pxToDp(2),
                    ...fontStyle(32, 122, 122, '700', 'black', 'left'),
                  }}
                >
                  他的关注
                </Text>
              </View>
              {/* 头像展示部分 */}
              {this._renderAvatar()}
            </View>
            {/* —————————————————————————————————————————————————————————————————————————————————— */}

            {/* —————————————————————————————————————————————————————————————————————————————————— */}
            <View style={{ backgroundColor: '#fff' }}>
              <Text
                style={{
                  letterSpacing: pxToDp(2),
                  ...fontStyle(32, 50, 50, '700', 'black', 'left'),
                  ...margin(25, 20, 25, 0),
                }}
              >
                他的设计案例
              </Text>

              <RefreshListView
                // 如果要测试假数据，可以写data={Data}
                data={this.state.dataList}
                // data={Data}
                numColumns={2}
                // contentContainerStyle={{
                //   ...flexColumnSpb,
                //   backgroundColor: '#fff',
                // }}
                keyExtractor={(item) => item.id}
                renderItem={this._renderItem}
                refreshState={this.state.refreshState}
                onHeaderRefresh={this.onHeaderRefresh}
                onFooterRefresh={this.onFooterRefresh}
                footerNoMoreDataText="-我是有底线的-"
              />
            </View>
          </ScrollView>
        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['#f7d14a', '#f6c947', '#f7d14a']}
          style={{
            position: 'absolute',
            bottom: pxToDp(50),
            left: pxToDp(140),
            width: pxToDp(472),
            height: pxToDp(88),
            borderRadius: pxToDp(44),
            paddingLeft: pxToDp(191),
          }}
        >
          <Text
            onPress={() => this.focus()}
            style={{
              ...fontStyle(31, 88, 88, 'normal', 'white', 'left'),
            }}
          >
            联系他
          </Text>
        </LinearGradient>
      </View>
    );
  }
  _contentViewScroll(e: Object) {
    let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight - pxToDp(10)) {
      this.onFooterRefresh();
    }
  }
}

export default Others;

const styles = StyleSheet.create({
  others__wrap: {
    width: screenWidth,
  },
  others__mySpace: { zIndex: 10, backgroundColor: '#F9B762' },
  others__personMessage: {
    ...margin(25, 0, 25, 0),
  },
  others__follows: {},
  others__read: {},
});

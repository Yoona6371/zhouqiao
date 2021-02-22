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
import { pxToDp } from '../../utils/pxToDp';
import LinearGradient from 'react-native-linear-gradient';
import { activeOpacity } from '../../constants/config';
import DynamicList from '../../components/bussiness/DynamicList';
import Avatar from '../../components/common/Avatar/index';
import Icon from '../../components/common/Icon/index';
import Toast from '../../components/common/Toast/Toast';
import { inject, observer } from 'mobx-react';

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
 *
 * 目前完成了昵称，头像，个人简介，他的关注头像接口
 */

@inject('RootStore')
@observer
class Others extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    // 获取他人基本信息
    this.getOthersDetail();
    // 获取他人关注列表
    this.getOthersFocusList();
  }

  // 获取他人基本信息
  getOthersDetail = async () => {
    const request = this.props.RootStore.globalStore.allData.Http;
    const detail = await request.getOthersDetail(
      {},
      `/${this.props.userId}/baseInfo`,
    );

    if (detail.status === 200) {
      const data = detail.data.data;
      this.setState({
        nickname: data.nickName,
        avatar: data.userAvatar,
        description: data.introduction,
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
    const request = this.props.RootStore.globalStore.allData.Http;
    const detail = await request.getOthersFocusList(
      { page: 1, size: 8 },
      `/${this.props.userId}/follower`,
    );

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

      console.log(this.state.followsAvatar);
    } else {
      Toast.sad('加载失败');
    }
  };

  // 一键关注按钮
  handleclick = () => {
    console.log('一键关注');
  };

  // 关注他按钮
  focus = () => {
    console.log('关注他');
  };

  constructor() {
    super();
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
          num: '6592',
          des: '关注数',
        },
        {
          num: '6592',
          des: '粉丝数',
        },
        {
          num: '6592',
          des: '成交订单',
        },
        {
          num: '6592',
          des: '积分',
        },
      ],
      // 最多8个头像
      followsAvatar: [
        {
          userId: 'ImageShow',
          avatar:
            'https://wx2.sinaimg.cn/mw1024/cd966a9aly1gnw4r3wxl0j207i07it8p.jpg',
        },
      ],
      recentReadBooks: [
        {
          router: 'ImageShow',
          bookImage:
            'https://pic1.zhimg.com/v2-e59ab0cb5246627953a0df3c3f5c534c_r.jpg',
        },
        {
          router: 'ImageShow',
          bookImage:
            'https://pic1.zhimg.com/v2-e59ab0cb5246627953a0df3c3f5c534c_r.jpg',
        },
        {
          router: 'ImageShow',
          bookImage:
            'https://pic1.zhimg.com/v2-e59ab0cb5246627953a0df3c3f5c534c_r.jpg',
        },
        {
          router: 'ImageShow',
          bookImage:
            'https://pic1.zhimg.com/v2-e59ab0cb5246627953a0df3c3f5c534c_r.jpg',
        },
      ],
      dynamicList: [
        {
          AvatarImage: {
            uri:
              'https://pic4.zhimg.com/v2-8f450572606c2e017dade3e4533d10bb_r.jpg',
          },
          DynamicListImages: [
            {
              uri:
                'https://pic4.zhimg.com/v2-8f450572606c2e017dade3e4533d10bb_r.jpg',
            },
            {
              uri:
                'https://pic4.zhimg.com/v2-8f450572606c2e017dade3e4533d10bb_r.jpg',
            },
            {
              uri:
                'https://pic4.zhimg.com/v2-8f450572606c2e017dade3e4533d10bb_r.jpg',
            },
            {
              uri:
                'https://pic4.zhimg.com/v2-8f450572606c2e017dade3e4533d10bb_r.jpg',
            },
          ],
          DynamicUserName: '阿甘',
          DynamicText:
            '宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，',
          DynamicLabel: ['突发奇想', '宋老狗'],
          CollectionNum: 700,
          CommentNum: 665,
          FabulousNum: 664,
          timeGo: '一分钟',
          DynamicPhone: 'One Plus 7T',
          isFollowProps: false,
        },
        {
          AvatarImage: {
            uri:
              'https://pic4.zhimg.com/v2-8f450572606c2e017dade3e4533d10bb_r.jpg',
          },
          DynamicListImages: [
            {
              uri:
                'https://pic4.zhimg.com/v2-8f450572606c2e017dade3e4533d10bb_r.jpg',
            },
            {
              uri:
                'https://pic4.zhimg.com/v2-8f450572606c2e017dade3e4533d10bb_r.jpg',
            },
            {
              uri:
                'https://pic4.zhimg.com/v2-8f450572606c2e017dade3e4533d10bb_r.jpg',
            },
            {
              uri:
                'https://pic4.zhimg.com/v2-8f450572606c2e017dade3e4533d10bb_r.jpg',
            },
          ],
          DynamicUserName: '阿甘',
          DynamicText:
            '宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，',
          DynamicLabel: ['突发奇想', '宋老狗'],
          CollectionNum: 700,
          CommentNum: 665,
          FabulousNum: 664,
          timeGo: '一分钟',
          DynamicPhone: 'One Plus 7T',
          isFollowProps: false,
        },
      ],
    };
  }

  render() {
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <ScrollView>
          <View style={styles.others__wrap}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <ImageBackground
              source={{
                uri:
                  'http://wx2.sinaimg.cn/mw1024/cd966a9aly1gng53jyox8j20j908vtab.jpg',
              }}
              style={styles.others__mySpace}
            >
              {/* 挤开电量那一栏 */}
              <View style={{ height: pxToDp(60) }} />

              {/* 更换背景那一栏 */}
              <View
                style={{
                  height: pxToDp(143),
                  ...flexRowSpb,
                  ...padding(30, 0, 30, 0),
                }}
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
                <View style={{ ...flexRowSpb }}>
                  <Icon
                    name={'exit'}
                    style={{
                      marginRight: pxToDp(10),
                      fontSize: pxToDp(20),
                      color: 'white',
                    }}
                  />
                  <Text
                    style={{
                      letterSpacing: pxToDp(2),
                      ...fontStyle(30, 143, 143, '700', 'white', 'left'),
                    }}
                    onPress={() =>
                      NavigationHelper.navigate(this.state.changeBackground)
                    }
                  >
                    更换背景
                  </Text>
                </View>
              </View>
              {/* 我的空间和头像那部分 */}
              <View
                style={{
                  ...flexRowSpb,
                  ...padding(48, 0, 40, 66),
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
                  backgroundColor: 'rgba(255,255,255,0.15)',
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
            </ImageBackground>
            <View style={{ ...margin(35, 0, 35, 0) }}>
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
              <View>
                <View style={{ ...flexRowSpb }}>
                  <Text
                    style={{
                      letterSpacing: pxToDp(2),
                      ...fontStyle(32, 122, 122, '700', 'black', 'left'),
                    }}
                  >
                    他的关注
                  </Text>
                  <Text
                    onPress={() =>
                      NavigationHelper.navigate(this.state.seeMyFollows)
                    }
                    style={{
                      letterSpacing: pxToDp(2),
                      ...fontStyle(23, 45, 45, '700', '#888888', 'left'),
                    }}
                  >
                    查看 &gt;
                  </Text>
                </View>
                {/* 头像展示部分 */}
                <View style={{ ...flexRowSpb }}>
                  {this.state.followsAvatar.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        activeOpacity={activeOpacity}
                        onPress={() => NavigationHelper.navigate(item.userId)}
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
                <Text
                  onPress={() => this.handleclick()}
                  style={{
                    width: pxToDp(185),
                    height: pxToDp(45),
                    borderColor: '#e5e5e5',
                    borderWidth: pxToDp(1),
                    borderRadius: pxToDp(22.5),
                    lineHeight: pxToDp(45),
                    fontSize: pxToDp(21),
                    paddingLeft: pxToDp(29),
                    ...margin(256, 40, 0, 0),
                  }}
                >
                  <Text style={{ color: '#fe9e0e' }}>+ </Text>一键关注
                </Text>
              </View>
              {/* —————————————————————————————————————————————————————————————————————————————————— */}
              {/* 最近阅读模块 */}
              <View>
                {/* 最近阅读和查看部分 */}
                <View style={{ ...flexRowSpb }}>
                  <Text
                    style={{
                      marginTop: pxToDp(19),
                      letterSpacing: pxToDp(2),
                      ...fontStyle(32, 97, 97, '700', 'black', 'left'),
                    }}
                  >
                    他的阅读
                  </Text>
                  <Text
                    onPress={() =>
                      NavigationHelper.navigate(this.state.seeRecentReadBooks)
                    }
                    style={{
                      letterSpacing: pxToDp(2),
                      ...fontStyle(23, 45, 45, '700', '#888888', 'left'),
                    }}
                  >
                    查看 &gt;
                  </Text>
                </View>
                {/* 四本书籍部分 */}
                <View
                  style={{
                    ...flexRowSpb,
                  }}
                >
                  {this.state.recentReadBooks.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        activeOpacity={activeOpacity}
                        onPress={() => NavigationHelper.navigate(item.router)}
                      >
                        <Image
                          style={{
                            resizeMode: 'cover',
                            height: pxToDp(190),
                            width: pxToDp(150),
                            borderRadius: pxToDp(7),
                          }}
                          source={{
                            uri: item.bookImage,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              {/* —————————————————————————————————————————————————————————————————————————————————— */}
              <View>
                <Text
                  style={{
                    letterSpacing: pxToDp(2),
                    ...fontStyle(32, 50, 50, '700', 'black', 'left'),
                    marginTop: pxToDp(50),
                    marginBottom: pxToDp(36),
                  }}
                >
                  他的动态
                </Text>
                {this.state.dynamicList.map((item, index) => {
                  return (
                    <View key={index}>
                      <DynamicList />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
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
}

export default Others;

const styles = StyleSheet.create({
  others__wrap: {
    width: screenWidth,
  },
  others__mySpace: {},
  others__personMessage: {},
  others__follows: {},
  others__read: {},
});

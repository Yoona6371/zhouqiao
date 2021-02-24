import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { pxToDp } from '../../../utils/pxToDp';
import SvgUri from 'react-native-svg-uri';
import { like } from '../../../constants/svg';
import Toast from '../../common/Toast/Toast';
import { inject } from 'mobx-react';
@inject('RootStore')
export class rankCardTop3 extends Component {
  state = {
    follow: false,
    follow1: false,
    follow3:false,
  }
  static propTypes = {
    top3: PropTypes.array.isRequired,
    onPressChampion: PropTypes.func.isRequired,
    onPressRunner_up: PropTypes.func.isRequired,
    onPressThird_place: PropTypes.func.isRequired,
  };
  // ——————————————————————————点击关注按钮部分开始————————————————————————————
  // 关注用户
  focusUser = async (number) => {
    const message = await Http.focusUser(
      {},
      '/a64bbe91e048638e09ef6b7213f02d32/follower',
    );
    if (number === 1) {
      if (message.status === 200) {
        this.setState({
          follow1: true,
        });
        if (!this.props.focus) {
          Toast.smile('关注成功');
        }
      } else {
        Toast.sad('关注失败');
      }
    } else if (number === 2) {
      if (message.status === 200) {
        this.setState({
          follow: true,
        });
        if (!this.props.focus) {
          Toast.smile('关注成功');
        }
      } else {
        Toast.sad('关注失败');
      }
    } else if (number === 3) {
      if (message.status === 200) {
        this.setState({
          follow3: true,
        });
        if (!this.props.focus) {
          Toast.smile('关注成功');
        }
      } else {
        Toast.sad('关注失败');
      }
    }

  };

  // 取消关注用户
  unfocusUser = async (number) => {
    // const request = this.props.RootStore.globalStore.allData.Http;
    const message = await Http.unfocusUser(
      {},
      '/a64bbe91e048638e09ef6b7213f02d32/follower',
    );
    if (number === 1) {
      if (message.status === 200) {
        this.setState({
          follow1: false,
        });
        Toast.smile('取消成功');
      } else {
        Toast.sad('取消失败');
      }
    } else if (number === 2) {
      if (message.status === 200) {
        this.setState({
          follow: false,
        });
        Toast.smile('取消成功');
      } else {
        Toast.sad('取消失败');
      }
    } else if (number === 3) {
      if (message.status === 200) {
        this.setState({
          follow3: false,
        });
        Toast.smile('取消成功');
      } else {
        Toast.sad('取消失败');
      }
    }

  };

  handleClick(number) {
    const token = this.props.RootStore.userStore.allData.accessToken;
    console.log(token)
    if (!token) {
      Toast.message('您尚未登录');
      return;
    }
    if (number === 1) {
      if (!this.state.follow1) {
        // 如果没有关注，点击之后关注
        this.focusUser(number);
      } else {
        this.unfocusUser(number);
      }
    } else if (number === 2) {
      if (!this.state.follow) {
        // 如果没有关注，点击之后关注
        this.focusUser(number);
      } else {
        this.unfocusUser(number);
      }
    } else if (number === 3) {
      if (!this.state.follow3) {
        // 如果没有关注，点击之后关注
        this.focusUser(number);
      } else {
        this.unfocusUser(number);
      }
    }

  }
  // ——————————————————————————点击关注按钮部分结束————————————————————————————
  render() {
    const {
      top3,
      onPressChampion,
      onPressRunner_up,
      onPressThird_place,
    } = this.props;
    return (
      <View>
        <ImageBackground
          style={styles.bg}
          source={require('../../../asserts/images/rankCardBg.png')}
        >
          <View style={styles.threeRankBorder}>
            <View style={styles.runner_up}>
              <ImageBackground
                style={styles.rank2Bg}
                source={require('../../../asserts/images/rank2.png')}
              >
                <Image
                  style={styles.rank2Photo}
                  source={{ uri: top3[1].runner_up_photo }}
                />
              </ImageBackground>
              <View style={styles.rank2_nameAndZan}>
                <Text numberOfLines={1} style={styles.rank2Name}>
                  {top3[1].runner_up_name}
                </Text>
                <View style={styles.rank2Svg_text_box}>
                  <SvgUri
                    svgXmlData={like}
                    width={pxToDp(30)}
                    height={pxToDp(32)}
                    style={styles.rank2Like}
                  />
                  <Text style={styles.rank2LikeNumber}>13269</Text>
                </View>
                <TouchableOpacity
                  style={styles.guanzhuBtn}
                  onPress={() => this.handleClick(2)}
                >
                  {this.state.follow === false ? <Text style={styles.rank2_add}>+ </Text> : null}
                  <Text style={styles.rank2_addAttention}>{this.state.follow === false ? '关注' : '已关注'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.champion}>
              <ImageBackground
                style={styles.rank1Bg}
                source={require('../../../asserts/images/rank1.png')}
              >
                <Image
                  style={styles.rank1Photo}
                  source={{ uri: top3[0].champion_photo }}
                />
              </ImageBackground>
              <View style={styles.rank2_nameAndZan}>
                <Text numberOfLines={1} style={styles.rank2Name}>
                  {top3[0].champion_name}
                </Text>
                <View style={styles.rank2Svg_text_box}>
                  <SvgUri
                    svgXmlData={like}
                    width={pxToDp(30)}
                    height={pxToDp(32)}
                    style={styles.rank2Like}
                  />
                  <Text style={styles.rank2LikeNumber}>
                    {top3[0].champion_hot}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.guanzhuBtn1}
                  onPress={() => this.handleClick(1)}
                >
                  {this.state.follow1 === false ? <Text style={styles.rank2_add}>+ </Text> : null}
                  <Text style={styles.rank2_addAttention}>{this.state.follow1 === false ? '关注' : '已关注'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.third_place}>
              <ImageBackground
                style={styles.rank2Bg}
                source={require('../../../asserts/images/rank3.png')}
              >
                <Image
                  style={styles.rank2Photo}
                  source={{ uri: top3[2].third_place_photo }}
                />
              </ImageBackground>
              <View style={styles.rank2_nameAndZan}>
                <Text numberOfLines={1} style={styles.rank2Name}>
                  {top3[2].third_place_name}
                </Text>
                <View style={styles.rank2Svg_text_box}>
                  <SvgUri
                    svgXmlData={like}
                    width={pxToDp(30)}
                    height={pxToDp(32)}
                    style={styles.rank2Like}
                  />
                  <Text style={styles.rank2LikeNumber}>
                    {top3[2].third_place_hot}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.guanzhuBtn}
                  onPress={() => this.handleClick(3)}
                >
                   {this.state.follow3 === false ? <Text style={styles.rank2_add}>+ </Text> : null}
                  <Text style={styles.rank2_addAttention}>{this.state.follow3 === false ? '关注' : '已关注'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: pxToDp(554),
  },
  threeRankBorder: {
    height: pxToDp(554),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: pxToDp(10),
  },
  runner_up: {
    width: pxToDp(224),
    height: pxToDp(286),
    backgroundColor: '#FFF',
    borderTopLeftRadius: pxToDp(20),
    borderTopRightRadius: pxToDp(20),
    elevation: 1,
  },
  champion: {
    width: pxToDp(266),
    height: pxToDp(320),
    backgroundColor: '#FFF',
    borderTopLeftRadius: pxToDp(20),
    borderTopRightRadius: pxToDp(20),
    elevation: 10,
  },
  third_place: {
    width: pxToDp(224),
    height: pxToDp(286),
    backgroundColor: '#FFF',
    borderTopLeftRadius: pxToDp(20),
    borderTopRightRadius: pxToDp(20),
    elevation: 1,
  },
  rank2Bg: {
    width: pxToDp(147),
    height: pxToDp(127),
    marginLeft: pxToDp(60),
    marginTop: pxToDp(-6),
  },
  rank2Photo: {
    borderRadius: pxToDp(999),
    height: pxToDp(88),
    width: pxToDp(88),
    marginTop: pxToDp(33),
    marginLeft: pxToDp(6),
  },
  rank2Name: {
    maxWidth: pxToDp(180),
    fontSize: pxToDp(28),
    fontWeight: '700',
    color: '#333333',
    marginTop: pxToDp(16),
  },
  rank2Svg_text_box: {
    flexDirection: 'row',
  },
  rank2Like: {
    marginTop: pxToDp(10),
  },
  rank2LikeNumber: {
    fontSize: pxToDp(26),
    fontWeight: '500',
    color: '#999999',
    marginTop: pxToDp(10),
    marginLeft: pxToDp(6),
  },
  rank2_nameAndZan: {
    alignItems: 'center',
  },
  guanzhuBtn: {
    width: pxToDp(110),
    height: pxToDp(34),
    backgroundColor: '#FE9E0E',
    borderRadius: pxToDp(30),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pxToDp(10),
  },
  rank2_add: {
    color: '#FFF',
    fontSize: pxToDp(35),
    marginTop: -2,
  },
  rank2_addAttention: {
    color: '#FFF',
    fontSize: pxToDp(24),
    fontWeight: '700',
  },
  rank1Bg: {
    width: pxToDp(188),
    height: pxToDp(143),
    marginLeft: pxToDp(60),
    marginTop: pxToDp(-6),
  },
  rank1Photo: {
    borderRadius: pxToDp(999),
    width: pxToDp(100),
    height: pxToDp(100),
    marginTop: pxToDp(34),
    marginLeft: pxToDp(28.6),
  },
  guanzhuBtn1: {
    width: pxToDp(110),
    height: pxToDp(34),
    backgroundColor: '#FE9E0E',
    borderRadius: pxToDp(30),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pxToDp(16),
  },
});

export default rankCardTop3;

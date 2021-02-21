import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Avatar from '../common/Avatar';
import PropTypes from 'prop-types';
import { pxToDp } from '../../utils/pxToDp';
import utils from '../../utils/utils';
import request from '../../action/request';
import Toast from '../common/Toast/Toast';
import RootStore from '../../mobx/index';


import {
  flexColumnSpb,
  flexRowCenter,
  flexRowSpb,
  fontStyle,
  margin,
  padding,
} from '../../utils/StyleUtils';
import { activeOpacity } from '../../constants/config';
import Icon from '../common/Icon';

const COLORARRAY = [
  '#E74C3C',
  '#6BB9F0',
  '#BF55EC',
  '#F84975',
  '#2ECC71',
  '#F9690E',
  '#F9BF3B',
  '#03C9A9',
];

class UserXCard extends Component {
  static propTypes = {
    image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    isVip: PropTypes.bool,
    avatarText: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    type: PropTypes.number,
  };

  static defaultProps = {
    isVip: false,
    text: 121312312312,
    name: '夏允',
    type: 2,
  };

  constructor(props) {
    super(props);
    let temp = Math.floor(Math.random() * 7);
    this.state = {
      follow: false,
      bgColor: COLORARRAY[temp],
    };
  }

  // ——————————————————————————点击关注按钮部分开始————————————————————————————
  // 关注用户
  focusUser = async () => {
    const message = await request.focusUser({}, false, {
      userId: 'a64bbe91e048638e09ef6b7213f02d32',
    });

    if (message.status === 200) {
      this.setState({
        follow: true,
      });
      Toast.smile('关注成功');
    } else {
      Toast.sad('关注失败');
    }
  };

  // 取消关注用户
  unfocusUser = async () => {
    const message = await request.unfocusUser({}, false, {
      userId: 'a64bbe91e048638e09ef6b7213f02d32',
    });

    if (message.status === 200) {
      this.setState({
        follow: true,
      });
      Toast.smile('取消成功');
    } else {
      Toast.sad('取消失败');
    }
  };

  handleClick() {
    const token = RootStore.userStore.allData.token;
    if (!token) {
      Toast.message('您尚未登录');
      return;
    }

    if (!this.state.follow) {
      // 如果没有关注，点击之后关注
      this.focusUser();
    } else {
      this.unfocusUser();
    }
  }
  // ——————————————————————————点击关注按钮部分结束————————————————————————————
  get userCard__wrap_style() {
    if (this.props.type === 1) {
      return {
        width: pxToDp(330),
        height: pxToDp(346),
        ...flexColumnSpb,
        ...padding(0, 43, 0, 30),
        backgroundColor: this.state.bgColor,
        ...margin(30, 30, 0, 0),
      };
    } else {
      return {
        width: pxToDp(690),
        height: pxToDp(200),
        ...flexRowSpb,
        justifyContent: 'flex-start',
        ...padding(22, 23, 29, 23),
        backgroundColor: '#fff',
        ...styles.shallow,
        ...margin(30, 30, 30, 0),
      };
    }
  }
  get fontColor() {
    return this.props.type === 1 ? ['#fff', '#fff'] : ['#333', '#666'];
  }
  render() {
    const { image, isVip, text, name, type, avatarText } = this.props;
    const { follow } = this.state;
    return (
      <View
        style={{
          ...styles.userCard__wrap,
          ...this.userCard__wrap_style,
        }}
      >
        <View style={styles.userCard__Avatar}>
          <Avatar isVip={isVip} image={image} size={160} text={avatarText} />
        </View>
        <View
          style={{
            ...styles.userCard__footer,
            width: type === 1 ? '100%' : '75%',
          }}
        >
          <View style={[styles.footer_left]}>
            <Text
              style={{
                ...styles.left_title,
                color: this.fontColor[0],
                lineHeight: pxToDp(40),
                height: pxToDp(40),
              }}
            >
              {name}
            </Text>
            <View style={styles.left_text__container}>
              <Text style={{ ...styles.left_text, color: this.fontColor[1] }}>
                {utils.bigNumberTransform(text)}
              </Text>
              {type === 1 ? <Text style={styles.left_text2}>粉丝</Text> : null}
            </View>
          </View>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={
              type === 1
                ? ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.3)']
                : ['#FE9E0E', '#FD7609']
            }
            style={[styles.footer_right, type === 1 ? null : styles.shallow]}
          >
            <TouchableOpacity
              activeOpacity={activeOpacity}
              onPress={() => this.handleClick()}
              style={{ ...flexRowCenter }}
            >
              {type === 2 && follow === false ? (
                <Icon
                  name={'attention'}
                  style={{
                    marginRight: pxToDp(10),
                    marginBottom: pxToDp(3),
                    fontSize: pxToDp(20),
                    color: '#fff',
                  }}
                />
              ) : null}
              <Text style={styles.right_text}>
                {follow ? '取消关注' : '关注'}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

export default UserXCard;

const styles = StyleSheet.create({
  userCard__wrap: {
    borderRadius: pxToDp(10),
  },
  userCard__Avatar: {},
  userCard__footer: {
    ...flexRowSpb,
    ...padding(20, 0, 20, 0),
  },
  footer_left: {},
  left_title: {
    maxWidth: pxToDp(150),
    overflow: 'hidden',
    marginBottom: pxToDp(27),
    ...fontStyle(30, 32, 32, 'bold', '#fff', 'left'),
  },
  left_text__container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  left_text: {
    maxWidth: pxToDp(300),
    overflow: 'hidden',
    ...fontStyle(22, 24, 24, 'normal', '#fff', 'left'),
  },
  left_text2: {
    ...fontStyle(22, 24, 24, 'normal', '#fff', 'left'),
  },
  footer_right: {
    width: pxToDp(120),
    height: pxToDp(46),
    borderRadius: pxToDp(6),
    justifyContent: 'center',
  },
  right_text: {
    ...fontStyle(22, 24, 24, 'normal', '#fff', 'center'),
  },
  shallow: {
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
});

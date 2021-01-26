import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Avatar from '../common/Avatar';
import PropTypes from 'prop-types';
import { pxToDp } from '../../utils/pxToDp';
import {
  flexColumnSpb,
  flexRowSpb,
  fontStyle,
  margin,
  padding,
} from '../../utils/StyleUtils';
import { activeOpacity } from '../../constants/config';

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
    text: PropTypes.string,
    isVip: PropTypes.bool,
    fanNumber: PropTypes.string,
    name: PropTypes.string,
  };

  static defaultProps = {
    isVip: false,
    fanNumber: '1',
    name: '夏允',
  };

  constructor(props) {
    super(props);
    let temp = Math.floor(Math.random() * 7);
    this.state = {
      follow: true,
      bgColor: COLORARRAY[temp],
    };
  }
  render() {
    const { image, isVip, text, name, fanNumber } = this.props;
    const { follow } = this.state;
    return (
      <View
        style={{
          ...flexColumnSpb,
          ...margin(30, 30, 0, 0),
          ...padding(0, 43, 0, 30),
          width: pxToDp(330),
          height: pxToDp(346),
          backgroundColor: this.state.bgColor,
          borderRadius: pxToDp(10),
        }}
      >
        <View style={styles.userCard__Avatar}>
          <Avatar isVip={isVip} image={image} size={154} text={text} />
        </View>
        <View style={styles.userCard__footer}>
          <View style={styles.footer_left}>
            <Text style={styles.left_title}>{name}</Text>
            <View style={styles.left_text__container}>
              <Text style={styles.left_text}>{fanNumber}</Text>
              <Text style={styles.left_text2}>粉丝</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={() => this.handleClick()}
            style={{
              width: pxToDp(120),
              height: pxToDp(46),
              borderRadius: pxToDp(6),
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <Text style={styles.right_text}>
              {follow ? '取消关注' : '关注'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  handleClick() {
    this.setState({
      follow: !this.state.follow,
    });
  }
}

export default UserXCard;

const styles = StyleSheet.create({
  userCard__wrap: {},
  userCard__Avatar: {},
  userCard__footer: {
    width: pxToDp(330),
    ...flexRowSpb,
    ...padding(20, 0, 20, 0),
  },
  footer_left: {},
  left_title: {
    width: pxToDp(150),
    overflow: 'hidden',
    marginBottom: pxToDp(27),
    ...fontStyle(30, 32, 32, 'bold', '#fff', 'left'),
  },
  left_text__container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  left_text: {
    maxWidth: pxToDp(110),
    overflow: 'hidden',
    ...fontStyle(22, 24, 24, 'normal', '#fff', 'left'),
  },
  left_text2: {
    ...fontStyle(22, 24, 24, 'normal', '#fff', 'left'),
  },
  footer_right: {},
  right_text: {
    ...fontStyle(22, 24, 24, 'normal', '#fff', 'center'),
  },
});

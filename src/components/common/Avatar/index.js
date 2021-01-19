/*
      image,           头像路径 image={}
      size,            number 直接传设计稿上px
      color,
      backgroundColor,
      text,            number 直接传设计稿上px
      textSize,        number 直接传设计稿上px
      borderColor,
      borderWidth,     number 直接传设计稿上px
      style
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import { pxToDp } from '../../../utils/pxToDp';

export default class Avatar extends Component {
  static propTypes = {
    image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    size: PropTypes.number,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    text: PropTypes.string,
    textSize: PropTypes.number,
    borderRadius: PropTypes.number,
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    size: pxToDp(40),
    color: '#ffffff',
    backgroundColor: 'skyblue',
    borderColor: 'rgba(0,0,0,.1)',
    borderWidth: 1,
  };

  render() {
    const {
      image,
      size,
      color,
      backgroundColor,
      text,
      textSize,
      borderColor,
      borderWidth,
      style = {},
    } = this.props;

    if (image) {
      return (
        <View style={{ padding: pxToDp(3), ...style }}>
          <Image
            style={{
              width: pxToDp(size),
              height: pxToDp(size),
              borderRadius: pxToDp(size) / 2,
              borderColor: borderColor,
              borderWidth: pxToDp(borderWidth),
            }}
            source={image}
          />
        </View>
      );
    }

    if (text) {
      return (
        <View style={{ padding: pxToDp(5) }}>
          <View
            style={{
              width: pxToDp(size),
              height: pxToDp(size),
              borderRadius: pxToDp(size) / 2,
              backgroundColor: backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: color, fontSize: pxToDp(textSize) }}>
              {text}
            </Text>
          </View>
        </View>
      );
    }

    return null;
  }
}

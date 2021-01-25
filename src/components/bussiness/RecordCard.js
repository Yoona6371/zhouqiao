import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { pxToDp } from '../../../utils/pxToDp';
import Icon from '../../common/Icon';
import { color } from 'react-native-reanimated';

export default class RecordCard extends React.Component {
  static propTypes = {
    image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    Title: PropTypes.string,
    user_img: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    RecordCard_type: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { image, Title, user_img, RecordCard_type } = this.props;
    return (
      <View
        style={{
          justifyContent: 'center',
          width: '100%',
          height: pxToDp(200),
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            width: pxToDp(690),
            height: pxToDp(200),
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/*1.一个浏览记录组件开始*/}
          {/*1.1浏览记录图片开始*/}
          <View
            style={{
              width: pxToDp(200),
              height: pxToDp(160),
              justifyContent: 'center',
            }}
          >
            <Image
              style={{ width: pxToDp(200), height: pxToDp(160) }}
              source={require('../../../asserts/images/RecordCard__background.png')}
            />
          </View>
          {/*浏览图片结束*/}
          {/*1.2浏览记录右半部分*/}
          <View style={{ marginLeft: pxToDp(22) }}>
            <TouchableOpacity>
              <Text
                style={{
                  width: pxToDp(290),
                  height: pxToDp(75),
                  fontSize: pxToDp(28),
                }}
              >
                {Title}
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginTop: pxToDp(32) }}>
              {/*用户头像开始*/}
              <View>
                <Image
                  style={{
                    width: pxToDp(50),
                    height: pxToDp(50),
                    borderRadius: pxToDp(25),
                  }}
                  source={require('../../../asserts/images/RecordCard__userImage.png')}
                />
              </View>
              {/*用户头像结束*/}
              {/*浏览记录类型开始*/}
              <View style={{ justifyContent: 'center' }}>
                <View
                  style={{
                    width: pxToDp(100),
                    height: pxToDp(40),
                    borderBottomLeftRadius: pxToDp(20),
                    borderTopRightRadius: pxToDp(20),
                    backgroundColor: '#ffefd8',
                    marginLeft: pxToDp(20),
                    alignContent: 'center',
                  }}
                >
                  <Text style={{ color: '#fe9e0e', textAlign: 'center' }}>
                    {this.props.RecordCard_type}
                  </Text>
                </View>
              </View>
              {/*浏览记录类型结束*/}
              {/*叉号开始*/}
              <View
                style={{
                  width: pxToDp(33),
                  height: pxToDp(33),
                  borderRadius: pxToDp(16),
                  backgroundColor: '#fc2937',
                  justifyContent: 'center',
                  marginTop: pxToDp(20),
                  marginLeft: pxToDp(208),
                }}
              >
                <TouchableOpacity activeOpacity={0.5}>
                  <Text
                    style={{
                      color: '#d1d2d4',
                      fontSize: pxToDp(20),
                      textAlign: 'center',
                    }}
                  >
                    <Icon
                      name="add"
                      style={{
                        color: '#ffffff',
                        width: pxToDp(33),
                        height: pxToDp(33),
                        fontSize: pxToDp(40),
                      }}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
              {/*叉号结束*/}
            </View>
          </View>
          {/*浏览记录左半部分结束*/}
        </View>
      </View>
    );
  }
}

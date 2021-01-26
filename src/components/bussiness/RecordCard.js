import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { pxToDp } from '../../utils/pxToDp';
import Icon from '../common/Icon';

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
      <View style={styles.RecordCard__boxContainer}>
        <View style={styles.RecordCard__mainBox}>
          {/*1.一个浏览记录组件开始*/}
          {/*1.1浏览记录图片开始*/}
          <View style={styles.RecordCard__ImageBox}>
            <Image
              style={styles.RecordCard__Image}
              source={require('../../asserts/images/RecordCard__background.png')}
            />
          </View>
          {/*浏览图片结束*/}
          {/*1.2浏览记录右半部分*/}
          <View style={styles.RecordCard__left}>
            <TouchableOpacity>
              <Text style={styles.RecordCard__title}>{Title}</Text>
            </TouchableOpacity>
            <View style={styles.RecordCard__leftBottom}>
              {/*用户头像开始*/}
              <View>
                <Image
                  style={styles.RecordCard__userImage}
                  source={require('../../asserts/images/RecordCard__userImage.png')}
                />
              </View>
              {/*用户头像结束*/}
              {/*浏览记录类型开始*/}
              <View style={{ justifyContent: 'center' }}>
                <View style={styles.RecordCard__typeBox}>
                  <Text style={styles.RecordCard__typeText}>
                    {this.props.RecordCard_type}
                  </Text>
                </View>
              </View>
              {/*浏览记录类型结束*/}
              {/*叉号开始*/}
              <View style={styles.RecordCard__crossSignBox}>
                <TouchableOpacity activeOpacity={0.5}>
                  <Text style={styles.RecordCard__crossSignIconBox}>
                    <Icon name="add" style={styles.RecordCard__icon} />
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
const styles = StyleSheet.create({
  RecordCard__boxContainer: {
    justifyContent: 'center',
    width: '100%',
    height: pxToDp(200),
    flexDirection: 'row',
  },
  RecordCard__mainBox: {
    width: pxToDp(690),
    height: pxToDp(200),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  RecordCard__ImageBox: {
    width: pxToDp(200),
    height: pxToDp(160),
    justifyContent: 'center',
  },
  RecordCard__Image: { width: pxToDp(200), height: pxToDp(160) },
  RecordCard__left: { marginLeft: pxToDp(22) },
  RecordCard__title: {
    width: pxToDp(290),
    height: pxToDp(75),
    fontSize: pxToDp(28),
  },
  RecordCard__leftBottom: { flexDirection: 'row', marginTop: pxToDp(32) },
  RecordCard__userImage: {
    width: pxToDp(50),
    height: pxToDp(50),
    borderRadius: pxToDp(25),
  },
  RecordCard__typeBox: {
    width: pxToDp(100),
    height: pxToDp(40),
    borderBottomLeftRadius: pxToDp(20),
    borderTopRightRadius: pxToDp(20),
    backgroundColor: '#ffefd8',
    marginLeft: pxToDp(20),
    alignContent: 'center',
  },
  RecordCard__typeText: { color: '#fe9e0e', textAlign: 'center' },
  RecordCard__crossSignBox: {
    width: pxToDp(33),
    height: pxToDp(33),
    borderRadius: pxToDp(16),
    backgroundColor: '#fc2937',
    justifyContent: 'center',
    marginTop: pxToDp(20),
    marginLeft: pxToDp(208),
  },
  RecordCard__crossSignIconBox: {
    color: '#d1d2d4',
    fontSize: pxToDp(20),
    textAlign: 'center',
  },
  RecordCard__icon: {
    color: '#ffffff',
    width: pxToDp(33),
    height: pxToDp(33),
    fontSize: pxToDp(40),
  },
});

import React, { Component } from 'react';
import { pxToDp } from '../../utils/pxToDp';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../common/Icon';
import PropTypes from 'prop-types';
import { padding } from '../../utils/StyleUtils';

export default class WelfareCard extends Component {
  static propTypes = {
    topImageUri: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
      .isRequired,
    timeRemin: PropTypes.string,
    title: PropTypes.string,
    welfareFund: PropTypes.number,
    userNumber: PropTypes.number,
  };
  static defaultProps = {
    topImage: require('../../asserts/images/WelfareCard_image.png'),
    timeRemin: '5天',
    title: '超简单的英文字体设计套路超简单的英文字体 设计套路',
    welfareFund: 500,
    userNumber: 219,
  };

  constructor() {
    super();
  }

  render() {
    const { topImage, timeRemin, title, welfareFund, userNumber } = this.props;
    return (
      //card__box
      <View style={styles.card__box}>
        {/*top__box 开始*/}
        <View
          style={{
            position: 'relative',
          }}
        >
          <Image
            source={topImage}
            style={{ width: pxToDp(690), height: pxToDp(260) }}
          />
          {/*top__text__box*/}
          <View style={styles.top__text__box}>
            <Text style={styles.top__text}>剩余时间:</Text>
            <Text style={styles.top__text}>{timeRemin}</Text>
          </View>
        </View>
        {/*top__box 结束*/}
        {/* center 开始 */}
        <View style={{ flex: 1, ...padding(35, 16, 34, 25) }}>
          {/*center__title*/}
          <View style={{ height: pxToDp(75) }}>
            <Text style={styles.center__title}>{title}</Text>
          </View>
          {/*  center__content*/}
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            {/*content__left*/}
            <View
              style={{ flexDirection: 'row', flex: 3, alignItems: 'center' }}
            >
              <Text style={{ color: '#F55B56', fontSize: pxToDp(22) }}>
                公益基金：￥
              </Text>
              <Text
                style={{
                  color: '#F55B56',
                  fontWeight: 'bold',
                  fontSize: pxToDp(30),
                }}
              >
                {welfareFund}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: pxToDp(36),
                  alignItems: 'center',
                }}
              >
                <Icon name="welfare_people" style={styles.Icon} />
                <Text style={{ color: '#999999', fontSize: pxToDp(24) }}>
                  {userNumber}
                </Text>
              </View>
            </View>
            {/*  content__right*/}
            <View style={styles.content__right}>
              <TouchableOpacity style={styles.touchableOpacity}>
                <Text style={styles.touchableOpacity__text}>立即报名</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* center 结束 */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  top__text: {
    color: '#ffffff',
    fontSize: pxToDp(25),
  },
  top__text__box: {
    position: 'absolute',
    width: pxToDp(200),
    height: pxToDp(70),
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card__box: {
    width: pxToDp(690),
    height: pxToDp(436),
    backgroundColor: '#FFFFFF',
    borderTopStartRadius: pxToDp(10),
    borderTopEndRadius: pxToDp(10),
    marginBottom: pxToDp(20),
  },
  touchableOpacity: {
    width: pxToDp(183),
    height: pxToDp(56),
    backgroundColor: '#ff9900',
    borderRadius: pxToDp(33),
    justifyContent: 'center',
    alignItems: 'center',
  },
  center__title: {
    fontSize: pxToDp(30),
    color: '#333333',
    fontWeight: 'bold',
  },
  Icon: {
    fontSize: pxToDp(23),
    color: '#999999',
    marginRight: pxToDp(13),
  },
  touchableOpacity__text: {
    fontSize: pxToDp(30),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  center__right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

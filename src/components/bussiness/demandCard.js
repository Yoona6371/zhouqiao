import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import PropTypes from 'prop-types';
import { fontStyle } from '../../utils/StyleUtils';
{
  /*参数列表
   *
   * */
}
export default class DemandCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    project_Title: PropTypes.string,
    project_contacts: PropTypes.string,
    project_budget: PropTypes.number,
    project_escrow: PropTypes.number,
    project_describe: PropTypes.string,
    type: PropTypes.number,
    // project_colors: PropTypes.array,
  };
  static defaultProps = {
    project_Title: '公益活动设计项目',
    project_contacts: '冯泽明',
    project_budget: '6666',
    project_escrow: '5555',
    project_describe:
      '做组件，做组件，做组件，俺要做组件，不要拦着我！不要拦着我！不要拦着我！',
    type: 1,
  };

  render() {
    const {
      project_Title,
      project_contacts,
      project_budget,
      project_escrow,
      project_describe,
      type,
    } = this.props;
    let boxImg = {};
    if (type === 1) {
      boxImg = require('../../asserts/images/demandCard_background.png');
    } else if (type === 2) {
      boxImg = require('../../asserts/images/demandCard_backgroundTwo.png');
    } else {
      boxImg = require('../../asserts/images/demandCard_backgroundThree.png');
    }
    return (
      <View style={{ width: '100%', alignItems: 'center' }}>
        <ImageBackground style={styles.ImageBackground_box} source={boxImg}>
          {/*标题和联系人模块开始*/}
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={styles.demandCard_Title}>{project_Title}</Text>
            </View>
            <View
              style={{
                ...styles.demandCard_contactsBox,
                backgroundColor:
                  type === 1
                    ? colors[0].componentStyle.contacts_color
                    : type === 2
                    ? colors[1].componentStyle.contacts_color
                    : colors[2].componentStyle.contacts_color,
              }}
            >
              <Text style={styles.demandCard_contactsText}>
                联系人：{project_contacts}
              </Text>
            </View>
          </View>
          {/*标题和联系人模块结束*/}
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: pxToDp(37),
            }}
          >
            {/*金额盒子开始*/}
            <View
              style={{
                ...styles.money_box,
                backgroundColor:
                  type === 1
                    ? colors[0].componentStyle.money
                    : type === 2
                    ? colors[1].componentStyle.money
                    : colors[2].componentStyle.money,
              }}
            >
              {/*预算金额开始*/}
              <View>
                <Text style={styles.money_budget}>
                  <View style={{ paddingRight: pxToDp(18) }}>
                    <Text style={styles.money_describe}>预算金额:</Text>
                  </View>
                  <Text style={styles.money}>{project_budget}</Text>
                </Text>
              </View>
              {/*预算金额结束*/}
              {/*线开始*/}
              <View style={styles.money_line} />
              {/*线结束*/}
              {/*托管金额开始*/}
              <View>
                <Text style={styles.money_escrow}>
                  <View style={{ paddingRight: pxToDp(18) }}>
                    <Text style={styles.money_describe}>已托管金额:</Text>
                  </View>
                  <Text style={styles.money}>{project_escrow}</Text>
                </Text>
              </View>
              {/*托管金额结束*/}
            </View>
            {/*金额盒子结束*/}
          </View>
          {/*底部描述开始*/}
          <View
            style={{
              ...styles.demandCard_bottomDescribeBox,
              backgroundColor:
                type === 1
                  ? colors[0].componentStyle.bottom_color
                  : type === 2
                  ? colors[1].componentStyle.bottom_color
                  : colors[2].componentStyle.bottom_color,
            }}
          >
            <Text style={styles.demandCard_bottomDescribe} numberOfLines={1}>
              {project_describe}
            </Text>
          </View>
          {/*底部描述结束*/}
        </ImageBackground>
      </View>
    );
  }
}
const colors = [
  {
    colorImg: '../../asserts/images/demandCard_background.png',
    componentStyle: {
      contacts_color: '#609293',
      money: '#049962FF',
      bottom_color: '#049962',
    },
  },
  {
    colorImg: '../../asserts/images/demandCard_backgroundTwo.png',

    componentStyle: {
      contacts_color: '#948C54',
      money: '#CCB307FF',
      bottom_color: '#CCB307',
    },
  },
  {
    colorImg: '../../asserts/images/demandCard_backgroundThree.png',
    componentStyle: {
      contacts_color: '#FFC874FF',
      money: '#CC800EFF',
      bottom_color: '#D78100',
    },
  },
];
// const colorIndex = Math.floor(Math.random() * colors.length);

const styles = StyleSheet.create({
  ImageBackground_box: {
    width: pxToDp(691.5),
    height: pxToDp(317.9),
    position: 'relative',
    borderRadius: pxToDp(10),
  },
  demandCard_Title: {
    ...fontStyle(32, 34, 34, 'bold', '#FFFFFF'),
    marginTop: pxToDp(34),
    marginLeft: pxToDp(31),
  },
  demandCard_contactsBox: {
    width: pxToDp(242),
    height: pxToDp(78),
    backgroundColor: '#609293',
    borderTopRightRadius: pxToDp(20),
    borderBottomLeftRadius: pxToDp(30),
    position: 'absolute',
    right: pxToDp(0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  demandCard_contactsText: {
    ...fontStyle('24', 26, 26, 'bold', '#FFFFFF'),
  },
  money_box: {
    width: pxToDp(630),
    height: pxToDp(83),
    backgroundColor: '#049962FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pxToDp(10),
    opacity: 0.8,
  },
  money_line: {
    width: pxToDp(1),
    height: pxToDp(66),
    backgroundColor: '#FFFFFF',
  },
  money_describe: { ...fontStyle(24, 26, 26, '100', '#FFFFFF') },
  money: { ...fontStyle(27, 32, 32, 'bold', '#FFFFFF') },
  money_budget: { marginRight: pxToDp(46) },
  money_escrow: { marginLeft: pxToDp(49) },
  demandCard_bottomDescribe: {
    width: pxToDp(624),
    ...fontStyle(24, 26, 26, 'bold', '#FFFFFF', 'center'),
  },
  demandCard_bottomDescribeBox: {
    width: pxToDp(690),
    height: pxToDp(100),
    backgroundColor: '#049962',
    opacity: 0.4,
    position: 'absolute',
    bottom: pxToDp(0),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: pxToDp(20),
    borderBottomLeftRadius: pxToDp(20),
  },
});

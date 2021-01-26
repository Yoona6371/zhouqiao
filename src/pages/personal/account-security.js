import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from '../../components/common/Icon';
import Option from '../../components/bussiness/Options';
import { pxToDp } from '../../utils/pxToDp';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          svg: 'autonym',
          title: '实名认证',
          text: '完善个人信息资料',
          router: '',
          color: '#f19f3c',
        },
        {
          svg: 'firm',
          title: '企业认证',
          text: '完善企业信息资料',
          router: '',
          color: '#ed5d4c',
        },
        {
          svg: 'passwordUpdate',
          title: '修改登陆密码',
          text: '密码忘记啦？去修改下',
          router: '',
          color: '#4d9bf8',
        },
        {
          svg: 'telUpdate',
          title: '修改绑定手机',
          text: '换手机号了？去修改下绑定吧',
          router: '',
          color: '#9c76f7',
        },
        {
          svg: 'appeal',
          title: '账户申诉',
          text: '用的不爽？我有意见',
          router: '',
          color: '#61d4b3',
        },
      ],
    };
  }

  render() {
    let { list } = this.state;
    return (
      <ScrollView style={styles.option__wrap}>
        {list.map((v, i) => (
          <Option
            key={i}
            title={v.title}
            text={v.text}
            type={2}
            style={styles.option}
            svg={v.svg}
            router={v.router}
            color={v.color}
            navigation={this.props.navigation}
          />
        ))}
      </ScrollView>
    );
  }
}
let styles = StyleSheet.create({
  option__wrap: {
    marginLeft: pxToDp(30),
    marginRight: pxToDp(30),
  },
  option: {
    marginTop: pxToDp(20),
  },
});

export default Index;

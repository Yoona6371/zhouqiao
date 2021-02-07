import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from '../../../components/common/Icon';
import Option from '../../../components/bussiness/Options';
import { pxToDp } from '../../../utils/pxToDp';
import { margin } from '../../../utils/StyleUtils';
import TopTitle from '../../../components/common/TopTitle';

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
          colors: ['#f5be4c', '#f19a39'],
        },
        {
          svg: 'firm',
          title: '企业认证',
          text: '完善企业信息资料',
          router: '',
          colors: ['#f29e6b', '#eb4a44'],
        },
        {
          svg: 'passwordUpdate',
          title: '修改登陆密码',
          text: '密码忘记啦？去修改下',
          router: '',
          colors: ['#5db0f9', '#408bf7'],
        },
        {
          svg: 'telUpdate',
          title: '修改绑定手机',
          text: '换手机号了？去修改下绑定吧',
          router: '',
          colors: ['#c192f8', '#8a68f6'],
        },
        {
          svg: 'appeal',
          title: '账户申诉',
          text: '用的不爽？我有意见',
          router: '',
          colors: ['#65dccf', '#67d2aa'],
        },
      ],
    };
  }

  render() {
    let { list } = this.state;
    return (
      <ScrollView>
        <TopTitle title="账户安全" showBtn={false} />
        {list.map((v, i) => (
          <Option
            key={i}
            title={v.title}
            text={v.text}
            type={2}
            svg={v.svg}
            router={v.router}
            colors={v.colors}
            style={{ ...margin(30, 20, 30, 0) }}
          />
        ))}
      </ScrollView>
    );
  }
}
let styles = StyleSheet.create({});

export default Index;

import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { pxToDp } from '../../../utils/pxToDp';
import { margin } from '../../../utils/StyleUtils';
import Option from '../../../components/bussiness/Options';
import { file2, position, security } from '../../../constants/svg';

// 缺少：版本号获取

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listIndividual: [
        {
          title: '个人资料',
          text_more: '去完善',
          svg: file2,
          router: '',
        },
        {
          title: '地址管理',
          text_more: '',
          svg: position,
          router: '',
        },
        {
          title: '账户安全',
          text_more: '去设置',
          svg: security,
          router: '',
        },
      ],
      listSystem: [
        {
          title: '问题反馈',
          text_more: '去吐槽',
          svg: security,
          router: '',
        },
        {
          title: '新版本检测',
          text_more: '去吐槽',
          svg: security,
          router: '',
        },
        {
          title: '关于软件',
          text_more: '',
          svg: security,
          router: '',
        },
        {
          title: '切换账户',
          text_more: '',
          svg: security,
          router: '',
        },
        {
          title: '退出登录',
          text_more: '',
          svg: security,
          router: '',
        },
      ],
    };
  }
  componentDidMount() {}

  render() {
    let { listIndividual, listSystem } = this.state;
    return (
      <ScrollView>
        <View style={styles.individual}>
          {listIndividual.map((v, i) => (
            <Option
              key={i}
              title={v.title}
              type={1}
              text_more={v.text_more}
              navigation={this.props.navigation}
              router=""
              svg={v.svg}
            />
          ))}
        </View>
        <View style={styles.system}>
          {listSystem.map((v, i) => (
            <Option
              key={i}
              title={v.title}
              type={1}
              text_more={v.text_more}
              navigation={this.props.navigation}
              router={v.router}
              svg={v.svg}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  individual: {
    backgroundColor: '#fff',
    ...margin(30, 20, 30, 0),
    borderRadius: pxToDp(10),
  },
  system: {
    backgroundColor: '#fff',
    ...margin(30, 20, 30, 0),
    borderRadius: pxToDp(10),
  },
});
export default Index;
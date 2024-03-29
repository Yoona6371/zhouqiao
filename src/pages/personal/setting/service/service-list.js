import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Option from '../../../../components/bussiness/Options';
import TopTitle from '../../../../components/common/TopTitle';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          title: '欢迎使用',
          text_left: '22M',
          text_right: '2020-01-21 11:51:36',
        },
        {
          title: '用户使用隐私协议',
          text_left: '22M',
          text_right: '2020-01-21 11:51:36',
        },
        {
          title: '用户使用免责说明',
          text_left: '22M',
          text_right: '2020-01-21 11:51:36',
        },
        {
          title: '系统安全协议',
          text_left: '22M',
          text_right: '2020-01-21 11:51:36',
        },
        {
          title: '法律声明',
          text_left: '22M',
          text_right: '2020-01-21 11:51:36',
        },
        {
          title: '用户使用须知',
          text_left: '22M',
          text_right: '2020-01-21 11:51:36',
        },
        {
          title: '用户发布内容规范',
          text_left: '22M',
          text_right: '2020-01-21 11:51:36',
        },
        {
          title: '其他',
          text_left: '22M',
          text_right: '2020-01-21 11:51:36',
        },
      ],
    };
  }
  render() {
    let { list } = this.state;
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <TopTitle title="服务列表" showBtn={false} />
        {list.map((v, i) => (
          <Option
            key={i}
            title={v.title}
            text_left={v.text_left}
            text_right={v.text_right}
            type={0}
            router={'ServiceDetail'}
          />
        ))}
      </ScrollView>
    );
  }
}

export default Index;

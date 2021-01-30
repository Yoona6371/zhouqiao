import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Option from '../../../components/bussiness/Options';
import { margin } from '../../../utils/StyleUtils';
import { pxToDp } from '../../../utils/pxToDp';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          title: '头像',
          image: '',
          type: 3,
        },
        {
          title: '昵称',
          text_more: '小白',
          type: 1,
        },
        {
          title: '性别',
          text_more: '男',
          type: 1,
        },
        {
          title: '个性签名',
          text_more: '开心最重要',
          type: 1,
        },
        {
          title: '生日',
          text_more: '2021-01-23',
          type: 1,
        },
        {
          title: '手机号码',
          text_more: '未绑定',
          type: 1,
        },
        {
          title: '微信号',
          text_more: '已绑定',
          text_more_status: true,
          type: 1,
        },
        {
          title: 'QQ号',
          text_more: '未绑定',
          type: 1,
          last: true,
        },
      ],
    };
  }
  render() {
    let { list } = this.state;
    return (
      <View style={styles.edit__wrap}>
        <ScrollView>
          {list.map((v, i) => (
            <Option
              key={i}
              title={v.title}
              type={v.type}
              navigation={this.props.navigation}
              text_more={v.text_more}
              text_more_status={v.text_more_status}
              last={v.last}
              svgRemove={true}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  edit__wrap: {
    backgroundColor: '#fff',
    ...margin(30, 196, 30, 0),
  },
});

export default Test;

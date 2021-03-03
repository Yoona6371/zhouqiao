import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Option from '../../../components/bussiness/Options';
import { margin } from '../../../utils/StyleUtils';
import { pxToDp } from '../../../utils/pxToDp';
import TopTitle from '../../../components/common/TopTitle';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          title: '头像',
          image: props.route.params.userAvatar,
          type: 3,
          option: 1,
        },
        {
          title: '昵称',
          text_more: props.route.params.nickName,
          type: 1,
          option: 2,
          detail: 0,
        },
        {
          title: '性别',
          text_more: props.route.params.gender === 1 ? '女' : '男',
          type: 1,
          option: 3,
        },
        {
          title: '个性签名',
          text_more: props.route.params.introduction,
          type: 1,
          option: 2,
          detail: 1,
        },
        {
          title: '生日',
          text_more: '',
          type: 1,
          option: 5,
          isDate: true,
        },
        {
          title: '手机号码',
          text_more: props.route.params.mobile || '未绑定',
          type: 1,
          option: 6,
        },
        {
          title: '微信号',
          text_more:
            props.route.params.weChat === undefined ? '未绑定' : '已绑定',
          text_more_status: props.route.params.weChat !== undefined,
          type: 1,
          option: 7,
        },
        {
          title: 'QQ号',
          text_more: props.route.params.qq === undefined ? '未绑定' : '已绑定',
          text_more_status: props.route.params.qq !== undefined,
          type: 1,
          last: true,
          option: 8,
        },
      ],
      info: {},
    };
  }

  componentDidMount() {
    Http.getMyInfo().then((res) => {
      if (res.status === 200) {
        this.setState({
          info: {
            birthday: res.data.data.birthday,
            gender: res.data.data.gender,
            introduction: res.data.data.introduction,
            nickName: res.data.data.nickName,
            userAvatar: res.data.data.userAvatar,
            mobile: res.data.data.mobile,
          },
        });
      }
    });
  }

  render() {
    let { list } = this.state;
    return (
      <View>
        <ScrollView>
          <TopTitle
            title="资料编辑"
            showBtn={false}
            style={{ marginBottom: pxToDp(30) }}
          />
          <View style={styles.edit__wrap}>
            {list.map((v, i) => (
              <Option
                key={i}
                title={v.title}
                type={v.type}
                text_more={v.text_more}
                text_more_status={v.text_more_status}
                last={v.last}
                svgRemove={true}
                image={v.image}
                option={v.option}
                info={this.state.info}
                detail={v.detail}
                isDate={v.isDate}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  edit__wrap: {
    backgroundColor: '#fff',
    ...margin(30, 20, 30, 0),
  },
});

export default Test;

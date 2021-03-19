import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
import { deviceWidthDp, pxToDp } from '../../../utils/pxToDp';
import { fontStyle, padding } from '../../../utils/StyleUtils';
import { inject } from 'mobx-react';

@inject('RootStore')
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.card.item.count,
      toId:props.card.item.to_id,
    };
  }

  timeFormmat(data) {
    let hour = this.timeJudge(parseInt((data / 1000 / 60 / 60) % 24));
    let minute = this.timeJudge(parseInt((data / 1000 / 60) % 60));
    let second = this.timeJudge(parseInt((data / 1000) % 60));
    return hour + ':' + minute + ':' + second;
  }
  timeJudge(data) {
    if (data > 9) {
      return data;
    } else {
      return '0' + data;
    }
  }

  componentDidMount() {
    if (
      this.props.RootStore.globalStore.allData.Socket._callbacks
        .$messageptop === undefined
    ) {
      this.props.RootStore.globalStore.allData.Socket.on(
        'messageptop',
        (data) => {
          // count更新
          this.setState({ count: this.state.count + 1 });
          this.props.countUpdate();
          console.log(JSON.parse(data))
          // 消息页实时更新
          DeviceEventEmitter.emit(
            'messageUpdate',
            JSON.parse(data).msgContent,
            JSON.parse(data).contentType,
            JSON.parse(data).fromAvatar,
            JSON.parse(data).fromId
          );
        },
      );
    }
  }

  // 父组件调用此函数实现count+1
  // count = (id) => {
  //   // if (id === this.state.id) {
  //     this.setState({ count: 20 });
  //   console.log(this.state.count);
  //   // }
  // };

  render() {
    let v = this.props.card.item;
    return (
      <TouchableOpacity
        style={styles.message_list}
        onPress={() => {
          this.props.messageClear(this.state.count);
          this.setState({ count: 0 });
          NavigationHelper.navigate('MessageDetail', {
            fromId: v.from_id,
            toId: this.props.RootStore.userStore.allData.userId,
            avatar_self: this.props.RootStore.userStore.allData.img,
            nickName: v.from_name,
            avatar_opposite: v.from_avatar,
          });
        }}
      >
        <View style={{ alignSelf: 'center' }}>
          <Image
            source={{
              uri: v.from_avatar,
            }}
            style={{
              height: pxToDp(90),
              width: pxToDp(90),
              borderRadius: pxToDp(45),
              marginRight: pxToDp(20),
            }}
          />
        </View>
        <View>
          <Text style={{ ...fontStyle(30, 64, 64, 'bold', '#333') }}>
            {v.from_name}
          </Text>
          <Text style={{ ...fontStyle(24, 64, 64, '500', '#999') }}>
            尊敬的用户，您收到一条新的消息
          </Text>
        </View>
        <View>
          <Text
            style={{
              ...fontStyle(24, 64, 64, '500', '#999', 'right'),
            }}
          >
            {this.timeFormmat(v.lasttime)}
          </Text>
          {this.state.count === 0 ? (
            <Text
              style={{
                ...styles.message_tips,
                backgroundColor: 'transparent',
                marginTop: pxToDp(16),
                marginLeft: pxToDp(92),
              }}
            />
          ) : (
            <Text
              style={{
                ...styles.message_tips,
                marginTop: pxToDp(16),
                marginLeft: pxToDp(92),
              }}
            >
              {this.state.count}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  message__wrap: {
    position: 'relative',
    marginTop: pxToDp(115),
    alignSelf: 'center',
    ...fontStyle(34, 36, 36, 'bold', '#F1A23C'),
  },
  message_title: {
    backgroundColor: '#fff',
    paddingBottom: pxToDp(40),
    marginBottom: pxToDp(20),
  },
  message_assist: {
    backgroundColor: '#FFF6EA',
    width: pxToDp(80),
    height: pxToDp(24),
    alignSelf: 'center',
    marginTop: pxToDp(-15),
    zIndex: -1,
    borderTopLeftRadius: pxToDp(10),
    borderBottomRightRadius: pxToDp(10),
  },
  message_tips: {
    width: pxToDp(52),
    height: pxToDp(32),
    backgroundColor: '#FF313D',
    ...fontStyle(24, 32, 32, 'bold', '#fff', 'center'),
    borderTopLeftRadius: pxToDp(13),
    borderTopRightRadius: pxToDp(13),
    borderBottomRightRadius: pxToDp(13),
  },
  message_tips_position: {
    position: 'absolute',
    top: pxToDp(95),
    left: deviceWidthDp / 2 + pxToDp(35),
  },
  message_list_wrap: {
    backgroundColor: '#fff',
    ...padding(30, 0, 30, 0),
    paddingBottom: pxToDp(44),
  },
  message_list: {
    marginTop: pxToDp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Index;

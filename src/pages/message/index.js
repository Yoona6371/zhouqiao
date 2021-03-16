import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import { deviceWidthDp, pxToDp } from '../../utils/pxToDp';
import {
  flexColumnSpb,
  fontStyle,
  margin,
  padding,
} from '../../utils/StyleUtils';
import Icon from '../../components/common/Icon';
import Avatar from '../../components/common/Avatar';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { parse } from 'react-native-svg';
import RefreshListView, {
  RefreshState,
} from '../../components/common/RefreshListView';
import DemandList from '../../components/bussiness/DemandList';
// import { createFlowAnnotation } from 'mobx/dist/types/flowannotation';
import ListCard from '../../components/bussiness/message/ListCard';
import { inject } from 'mobx-react';

@inject('RootStore')
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      userId: this.props.RootStore.userStore.allData.userId,
      avatar: this.props.RootStore.userStore.allData.img,
      count: 0,
      refreshState: RefreshState.Idle,
      totalPage: 1,
      currentPage: 1,
    };
  }

  async componentDidMount() {
    await this.onHeaderRefresh();
  }

  onHeaderRefresh = async () => {
    this.setState({ refreshState: RefreshState.HeaderRefreshing });

    let list = await this.getList(true);

    this.setState({
      list: list,
      refreshState:
        list.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
    });
  };

  onFooterRefresh = async () => {
    if (this.state.list.length > 20) {
      this.setState({ refreshState: RefreshState.FooterRefreshing });
      const { totalPage, currentPage } = this.state;

      let list = await this.getList(false, currentPage + 1);
      this.setState({
        list: list,
        refreshState:
          list.length === totalPage
            ? RefreshState.NoMoreData
            : RefreshState.Idle,
      });
    }
  };

  // 获取测试数据
  async getList(isReload: boolean, currentPage = 1): Array<Object> {
    let key = this.props.route.key;
    if (this.props.route.key === '0') {
      key = null;
    }
    let res = await Http.messageList({ page: 1, size: 20 });
    let count = 0;
    res.data.data.dataList.forEach((v) => {
      count += v.count;
    });
    this.setState({ count: count });

    const newList = res.data.data.dataList;
    this.setState({
      totalPage: 1,
      currentPage: res.data.data.currentPage,
    });
    return isReload ? newList : [...this.state.list, ...newList];
  }

  // timeFormmat(data) {
  //   let hour = this.timeJudge(parseInt((data / 1000 / 60 / 60) % 24));
  //   let minute = this.timeJudge(parseInt((data / 1000 / 60) % 60));
  //   let second = this.timeJudge(parseInt((data / 1000) % 60));
  //   return hour + ':' + minute + ':' + second;
  // }
  // timeJudge(data) {
  //   if (data > 9) {
  //     return data;
  //   } else {
  //     return '0' + data;
  //   }
  // }

  render() {
    const { list, count } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.message_title}>
          <Text style={styles.message__wrap}>消息</Text>
          {/* 消息下方黄框 */}
          <View style={styles.message_assist} />
          {/* 未读提示 */}
          <Text style={[styles.message_tips, styles.message_tips_position]}>
            {count}
          </Text>
        </View>
        <View style={styles.message_list_wrap}>
          {/* 系统通知 */}
          {/*  <TouchableOpacity*/}
          {/*    style={styles.message_list}*/}
          {/*    onPress={() => NavigationHelper.navigate('MessageNotice')}*/}
          {/*  >*/}
          {/*    <View style={{ alignSelf: 'center' }}>*/}
          {/*      <Avatar*/}
          {/*        image={{*/}
          {/*          uri:*/}
          {/*            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202101%2F15%2F20210115170419_ed8cd.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614850704&t=612446e233692bedd314d255c7faeff3',*/}
          {/*        }}*/}
          {/*        size={90}*/}
          {/*      />*/}
          {/*    </View>*/}
          {/*    <View>*/}
          {/*      <Text style={{ ...fontStyle(30, 64, 64, 'bold', '#333') }}>*/}
          {/*        通知*/}
          {/*      </Text>*/}
          {/*      <Text style={{ ...fontStyle(24, 64, 64, '500', '#999') }}>*/}
          {/*        尊敬的用户，您收到一条新的消息*/}
          {/*      </Text>*/}
          {/*    </View>*/}
          {/*    <View>*/}
          {/*      <Text*/}
          {/*        style={{*/}
          {/*          ...fontStyle(24, 64, 64, '500', '#999', 'right'),*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        一小时前*/}
          {/*      </Text>*/}
          {/*      <Text*/}
          {/*        style={{*/}
          {/*          ...styles.message_tips,*/}
          {/*          marginTop: pxToDp(16),*/}
          {/*          marginLeft: pxToDp(92),*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        18*/}
          {/*      </Text>*/}
          {/*    </View>*/}
          {/*  </TouchableOpacity>*/}
          <RefreshListView
            data={list}
            numColumns={1}
            contentContainerStyle={{ ...flexColumnSpb }}
            keyExtractor={this.keyExtractor}
            renderItem={(item, index) => <ListCard card={item} key={index} />}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}
            onFooterRefresh={this.onFooterRefresh}
            // 可选
            footerRefreshingText="玩命加载中 >.<"
            footerFailureText="我擦嘞，居然失败了 =.=!"
            footerNoMoreDataText="-我是有底线的-"
            footerEmptyDataText="-好像什么东西都没有-"
          />
        </View>
      </View>
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
    flex: 1,
  },
  message_list: {
    marginTop: pxToDp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Index;

import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import UserXCard from '../../components/bussiness/UserXCard';
import { pxToDp } from '../../utils/pxToDp';
import { bgColor } from '../../constants/config';
import TopTitle from '../../components/common/TopTitle';
import Toast from '../../components/common/Toast/Toast';

import RefreshListView, {
  RefreshState,
} from '../../components/common/RefreshListView';

import {
  flexColumnSpb,
  flexRowCenter,
  flexRowSpb,
  fontStyle,
  margin,
  padding,
} from '../../utils/StyleUtils';

class MyFocus extends Component {
  state = {
    dataList: [],
    refreshState: RefreshState.Idle,
    totalPage: 0,
    currentPage: 1,
    id: 0,
  };

  async componentDidMount() {
    await this.onHeaderRefresh();
  }

  onHeaderRefresh = async () => {
    this.setState({ refreshState: RefreshState.HeaderRefreshing });
    let dataList = await this.getList(true);

    this.setState({
      dataList: dataList,
      refreshState:
        dataList.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
    });
  };

  onFooterRefresh = async () => {
    this.setState({ refreshState: RefreshState.FooterRefreshing });
    const { totalPage, currentPage } = this.state;

    let dataList = await this.getList(false, currentPage + 1);
    this.setState({
      dataList: dataList,
      refreshState:
        dataList.length === totalPage
          ? RefreshState.NoMoreData
          : RefreshState.Idle,
    });
  };

  async getList(isReload: Boolean, currentPage = 1): Array<Object> {
    // {
    //   "dataList": [{
    //     "avatar": "1.jpg",
    //     "followedUser": true,
    //     "userId": "44515a6a1c25b33ceb259f9d080d7348",
    //     "userNick": "解亚伟最帅"
    //   }],
    //   "pageSize": 6,
    //   "totalPage": 1,
    //   "totalRecords": 1
    // }
    const message = await Http.myFocusList({ page: currentPage, size: 6 });
    if (!message || !message.status === 200) {
      Toast.sad('信息获取失败');
      return;
    }

    const newList = message.data.data.dataList;
    let ans = [];
    for (let i = 0; i < newList.length; i++) {
      ans.push({
        id: this.state.id + 1,
        // uri: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2F50%2Fv2-befba403346b040bf6122d1f5475b73b_hd.gif&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613785977&t=ed55d7d8daae65a8574f34292f4cedc9',
        uri: newList[i].avatar,
        name: newList[i].userNick,
      });
      this.setState({ id: this.state.id + 1 });
    }

    this.setState({
      totalPage: message.data.data.totalPage,
      currentPage: currentPage,
    });
    return isReload ? ans : [...this.state.dataList, ...ans];
  }

  _renderItem(item) {
    return (
      <UserXCard
        type={1}
        image={item.item}
        focus={true}
        name={item.item.name}
        userId={item.item.userId}
      />
    );
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <TopTitle title="我的关注" showBtn={false} />
        <RefreshListView
          // 如果要测试假数据，可以写data={Data}
          data={this.state.dataList}
          // data={Data}
          numColumns={2}
          // contentContainerStyle={{
          //   ...flexColumnSpb,
          //   backgroundColor: '#fff',
          // }}
          //item是从数据库中获取到的每个数据
          keyExtractor={(item) => item.id}
          renderItem={this._renderItem}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.onHeaderRefresh}
          onFooterRefresh={this.onFooterRefresh}
          footerNoMoreDataText="-我是有底线的-"
        />
      </View>
    );
  }
}

export default MyFocus;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: pxToDp(30),
    backgroundColor: bgColor,
  },
});

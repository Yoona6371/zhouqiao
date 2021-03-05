import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import UserXCard from '../../components/bussiness/UserXCard';
import { pxToDp } from '../../utils/pxToDp';
import { bgColor } from '../../constants/config';
import TopTitle from '../../components/common/TopTitle';
import { inject, observer } from 'mobx-react';
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
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      refreshState: RefreshState.Idle,
      totalPage: 0,
      currentPage: 1,
      id: 0,
    };
  }

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
    console.log(message);
    this.setState({
      totalPage: message.data.data.totalRecords,
      currentPage: message.data.data.currentPage,
    });
    return isReload ? newList : [...this.state.dataList, ...newList];
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <TopTitle title="我的关注" showBtn={false} />
        <RefreshListView
          // 如果要测试假数据，可以写data={Data}
          data={this.state.dataList}
          numColumns={2}
          //item是从数据库中获取到的每个数据
          keyExtractor={(item) => item.userId}
          renderItem={(item) => {
            return (
              <UserXCard
                type={1}
                image={{ uri: item.item.avatar }}
                focus={true}
                name={item.item.userNick}
                userId={item.item.userId}
              />
            );
          }}
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
    );
  }
}

export default MyFocus;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: bgColor,
  },
});

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import TopTitle from '../../components/common/TopTitle';
import RankCardTop3 from '../../components/bussiness/rankCard/rankCardTop3';
import RankCard from '../../components/bussiness/rankCard/rankCard';
import { pxToDp } from '../../utils/pxToDp';
import { flexColumnSpb, padding } from '../../utils/StyleUtils';
import PullToRefresh from 'react-native-pull-refresh';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';

export class index extends Component {
  state = {
    isRefreshing: false, // 下拉刷新
    dataList: [], // 数据
    refreshState: RefreshState.Idle,
    totalPage: 0, // 总个数
    currentPage: 1, // 当前页数
    rankListOutOfThree: [],
    top33: [
      {
        userAvatar: '',
        nickName: '',
        hot: '',
      },
      {
        userAvatar: '',
        nickName: '',
        hot: '',
      },
      {
        userAvatar: '',
        nickName: '',
        hot: '',
      },
    ],
  };

  componentDidMount() {
    this.onHeaderRefresh();
  }

  // 下拉刷新函数
  async onRefresh() {
    this.setState({ isRefreshing: true });
    await this.onHeaderRefresh();
    this.setState({ isRefreshing: false });
  }

  getTestList(isReload: boolean, currentPage = 1): Array<Object> {
    Http.getRankList({
      page: currentPage,
      size: 5,
    }).then((res) => {
      const ans = res.data.data.dataList;
      if (currentPage === 1) {
        this.setState({ top33: ans.slice(0, 3) });
      }
      this.setState({
        currentPage: currentPage,
        totalPage: res.data.data.totalRecords,
      });
      return isReload ? ans : [...this.state.dataList, ...ans];
    });
  }

  onHeaderRefresh = async () => {
    this.setState({ refreshState: RefreshState.HeaderRefreshing });
    let dataList = await this.getTestList(true);

    this.setState({
      dataList: dataList,
      rankListOutOfThree: dataList.slice(3),
      refreshState:
        this.state.dataList.length < 1
          ? RefreshState.EmptyData
          : RefreshState.Idle,
    });
  };

  onFooterRefresh = async () => {
    this.setState({ refreshState: RefreshState.FooterRefreshing });
    let dataList = await this.getTestList(false, this.state.currentPage + 1);

    this.setState({
      dataList: dataList,
      rankListOutOfThree: dataList.slice(3),
      refreshState:
        this.state.currentPage === this.state.totalPage
          ? RefreshState.NoMoreData
          : RefreshState.Idle,
    });
  };

  render() {
    const { rankListOutOfThree, top33 } = this.state;
    return (
      <PullToRefresh
        isRefreshing={this.state.isRefreshing}
        onRefresh={this.onRefresh.bind(this)}
        animationBackgroundColor={'#564A63'}
        pullHeight={180}
        contentView={
          <ScrollView style={{ flex: 1 }}>
            <View style={{ position: 'absolute', top: 0, zIndex: 999 }}>
              <TopTitle
                title="设计师榜"
                showBtn={false}
                color="#FFF"
                bgColor=""
              />
            </View>
            <RankCardTop3
              onPressChampion={() => alert(1111)}
              onPressRunner_up={() => alert(222)}
              onPressThird_place={() => alert(333)}
              top3={top33}
            >
              {' '}
            </RankCardTop3>
            <RefreshListView
              data={rankListOutOfThree}
              numColumns={1}
              contentContainerStyle={{ ...flexColumnSpb, backgroundColor: '' }}
              keyExtractor={this.keyExtractor}
              renderItem={({ item, index }) => (
                <RankCard
                  userId={item.userId}
                  rankNumber={index + 4 < 10 ? '0' + (index + 4) : index + 4}
                  userPhoto={item.userAvatar}
                  userName={item.nickName}
                  hot={item.hot}
                  onPress={() => alert('哎，关注我')}
                />
              )}
              refreshState={this.state.refreshState}
              onHeaderRefresh={this.onHeaderRefresh}
              onFooterRefresh={this.onFooterRefresh}
              // 可选
              footerRefreshingText="玩命加载中 >.<"
              footerFailureText="我擦嘞，居然失败了 =.=!"
              footerNoMoreDataText="-我是有底线的-"
              footerEmptyDataText="-好像什么东西都没有-"
            />
          </ScrollView>
        }
      />
    );
  }
}

export default index;

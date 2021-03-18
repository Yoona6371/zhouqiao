import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import TopTitle from '../../components/common/TopTitle';
import RankCardTop3 from '../../components/bussiness/rankCard/rankCardTop3';
import RankCard from '../../components/bussiness/rankCard/rankCard';
import { pxToDp } from '../../utils/pxToDp';
import { flexColumnSpb, padding } from '../../utils/StyleUtils';
import PropTypes from 'prop-types';

import RefreshListView, {
  RefreshState,
} from '../../components/common/RefreshListView';

// import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import Shimmer from 'react-native-shimmer';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class index extends Component {
  state = {
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
    NineShimmer: [1, 2, 3, 4, 5, 6],
  };

  async componentDidMount() {
    await this.onHeaderRefresh();
  }

  async getTestList(isReload: boolean, currentPage = 1): Array<Object> {
    const message = await Http.getRankList({
      page: currentPage,
      size: 10,
    });

    const ans = message.data.data.dataList;
    console.log(ans); 
    if (currentPage === 1) {
      this.setState({ top33: ans.slice(0, 3) });
    }
    this.setState({
      currentPage: currentPage,
      totalPage: message.data.data.totalRecords / 10,
    });
    return isReload ? ans : [...this.state.dataList, ...ans];
  }

  onHeaderRefresh = async () => {
    this.setState({ refreshState: RefreshState.HeaderRefreshing });
    let dataList = await this.getTestList(true);
    this.setState({
      dataList: dataList,
      rankListOutOfThree: dataList.slice(3),
      refreshState:
        dataList.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
    });
  };

  onFooterRefresh = async () => {
    this.setState({ refreshState: RefreshState.FooterRefreshing });
    let dataList = await this.getTestList(false, this.state.currentPage + 1);
    console.log(this.state.currentPage);
    console.log(this.state.totalPage);
    this.setState({
      dataList: dataList,
      rankListOutOfThree: dataList.slice(3),
      refreshState:
        this.state.currentPage === this.state.totalPage
          ? RefreshState.NoMoreData
          : RefreshState.Idle,
    });
  };

  onPressChampion = () => {
    NavigationHelper.navigate('OthersPersonal', {
      params: {
        userId: this.state.top33[0].userId,
      },
    });
  };

  onPressRunner_up = () => {
    NavigationHelper.navigate('OthersPersonal', {
      params: {
        userId: this.state.top33[1].userId,
      },
    });
  };

  onPressThird_place = () => {
    NavigationHelper.navigate('OthersPersonal', {
      params: {
        userId: this.state.top33[2].userId,
      },
    });
  };

  render() {
    const { rankListOutOfThree, top33, NineShimmer } = this.state;
    return (
      <View>
        <View style={{ position: 'absolute', top: 0, zIndex: 999 }}>
          <TopTitle title="设计师榜" showBtn={false} color="#FFF" bgColor="" />
        </View>
        <RankCardTop3
          onPressChampion={this.onPressChampion}
          onPressRunner_up={this.onPressRunner_up}
          onPressThird_place={this.onPressThird_place}
          top3={top33}
          onPress={()=>{}}
        >
          {' '}
        </RankCardTop3>
        <SafeAreaView style={{ height: pxToDp(879) }}>
          <RefreshListView
            data={rankListOutOfThree}
            numColumns={1}
            contentContainerStyle={{ ...flexColumnSpb, backgroundColor: '' }}
            keyExtractor={this.keyExtractor}
            renderItem={({ item, index }) => (
              <RankCard
                key={index}
                userId={item.userId}
                rankNumber={index + 4 < 10 ? '0' + (index + 4) : index + 4 + ''}
                userPhoto={item.avatar}
                userName={item.userNick}
                hot={item.hot}
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
        </SafeAreaView>
      </View>
    );
  }
}

export default index;

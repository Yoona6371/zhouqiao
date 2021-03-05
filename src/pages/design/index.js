import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import TopTitle from '../../components/common/TopTitle';
import RankCardTop3 from '../../components/bussiness/rankCard/rankCardTop3';
import RankCard from '../../components/bussiness/rankCard/rankCard';
import { pxToDp } from '../../utils/pxToDp';
import { flexColumnSpb, padding } from '../../utils/StyleUtils';
import PullToRefresh from 'react-native-pull-refresh';

import RefreshListView, {
  RefreshState,
} from '../../components/common/RefreshListView';
export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  // 下拉刷新函数
  async onRefresh() {
    this.setState({ isRefreshing: true });
    await this.getRankData(this.state.currentPage + 1);
    this.setState({
      // 下拉刷新，一次只更新首页的5个数据; 如果向下滑动，更新10个数据
      rankListOutOfThree: dataList.slice(3 + this.state.currentPage * 5, 4 + (this.state.currentPage + 1) * 5),
      currentPage: this.state.currentPage + 1,
      isRefreshing: false,
    });
  }

  getRankData = (page = 1) => {
    Http.getRankList({
      page: page,
      size: 10,
    }).then((res) => {
      console.log(res.data.data);
      const dataList = [...this.state.dataList, ...res.data.data.dataList];
      if(page == 1) {
        this.setState({top33: dataList.slice(0, 3)});
      }
      this.setState({
        dataList: dataList,
        currentPage: res.data.data.currentPage,
        totalPage: res.data.data.totalRecords,
        rankListOutOfThree: dataList.slice(3),
        }),
      });
    });
  };
  componentDidMount() {
    this.getRankData();
  }
  onHeaderRefresh = async () => {
    this.setState({ refreshState: RefreshState.HeaderRefreshing });
    console.log(1111);
    await this.getRankData();
    this.setState({
      refreshState:
        this.state.dataList.length < 1
          ? RefreshState.EmptyData
          : RefreshState.Idle,
    });
  };

  onFooterRefresh = async () => {
    this.setState({ refreshState: RefreshState.FooterRefreshing });
    const { totalPage, currentPage } = this.state;

    let dataList = await this.getRankData(currentPage + 1);
    this.setState({
      dataList: dataList,
      refreshState:
        dataList.length === totalPage
          ? RefreshState.NoMoreData
          : RefreshState.Idle,
    });
  };

  render() {
    const { top3, rankListOutOfThree, top33 } = this.state;
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

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import TopTitle from '../../components/common/TopTitle';
import RankCardTop3 from '../../components/bussiness/rankCard/rankCardTop3';
import RankCard from '../../components/bussiness/rankCard/rankCard';
import { pxToDp } from '../../utils/pxToDp';
import { flexColumnSpb, padding } from '../../utils/StyleUtils';

import RefreshListView, {
  RefreshState,
} from '../../components/common/RefreshListView';
export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  getRankData = (page = 1) => {
    Http.getRankList({
      page: page,
      size: 10,
    }).then((res) => {
      console.log(res.data.data);
      let dataList = res.data.data.dataList;
      this.setState({
        dataList: dataList,
        top33: dataList.slice(0, 3),
        currentPage: res.data.data.currentPage,
        totalPage: res.data.data.totalRecords,
        rankListOutOfThree: dataList.filter((item, index) => {
          return index != 0 && index != 1 && index != 2;
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
      <View style={{ flex: 1 }}>
        <View style={{ position: 'absolute', top: 0, zIndex: 999 }}>
          <TopTitle title="设计师榜" showBtn={false} color="#FFF" bgColor="" />
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
      </View>
    );
  }
}

export default index;

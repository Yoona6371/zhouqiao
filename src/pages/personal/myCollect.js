import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import TopTitle from '../../components/common/TopTitle';
import { ScrollView } from 'react-native-gesture-handler';
import TopTabNavigator from '../../components/common/TopTabNavigator';
import { pxToDp } from '../../utils/pxToDp';
import CommodityCard from '../../components/bussiness/CommodityCard';
import RefreshListView, {
  RefreshState,
} from '../../components/common/RefreshListView';
import { flexColumnSpb, padding } from '../../utils/StyleUtils';

class CollectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [
        { case_name: '', picture: '', user_id: '', case_author_avatar: '' },
        { case_name: '', picture: '', user_id: '', case_author_avatar: '' },
        { case_name: '', picture: '', user_id: '', case_author_avatar: '' },
        { case_name: '', picture: '', user_id: '', case_author_avatar: '' },
        { case_name: '', picture: '', user_id: '', case_author_avatar: '' },
        { case_name: '', picture: '', user_id: '', case_author_avatar: '' },
      ],
      refreshState: RefreshState.Idle,
      totalPage: 0,
      currentPage: 1,
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
    // console.log(dataList);
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

  // 获取测试数据
  async getList(isReload: boolean, currentPage = 1): Array<Object> {
    let res = await Http.MyCollectList({
      page: currentPage,
      size: 3,
    });
    console.log('收藏的案例', res);
    const newList = res.data.data.list;
    this.setState({
      totalPage: res.data.data.totalCount,
      currentPage: res.data.data.currentPage,
    });
    return isReload ? newList : [...this.state.dataList, ...newList];
  }

  keyExtractor = (item: any, index: number) => {
    return index.toString();
  };

  render() {
    const { dataList } = this.state;
    const width = Dimensions.get('window').width;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <TopTitle title="我的收藏" showBtn={false} />

        <RefreshListView
          data={dataList}
          numColumns={2}
          contentContainerStyle={{ backgroundColor: '#fff' }}
          keyExtractor={this.keyExtractor}
          renderItem={({ item, index }) => (
            <CommodityCard
              Title={item.case_name}
              user_id={item.case_author}
              Commodity_type={item.category}
              image={item.cover}
              userId={item.case_author_id}
              user_image={item.case_author_avatar}
              style={{ ...padding(25, 0, 25, 0) }}
              caseId={item.case_id}
              type={2}
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

export default CollectList;

import React, { PureComponent } from 'react';
import { FlatList, ScrollView } from 'react-native';
import CommodityCard from '../../components/bussiness/CommodityCard';
import { pxToDp } from '../../utils/pxToDp';
import { flexColumnSpb, padding } from '../../utils/StyleUtils';
import RefreshListView, {
  RefreshState,
} from '../../components/common/RefreshListView';

export default class HomeTabShop extends PureComponent {
  state = {
    dataList: [], // 数据
    refreshState: RefreshState.Idle,
    totalPage: 0, // 总个数
    currentPage: 1, // 当前页数
  };

  async componentDidMount() {
    await this.onHeaderRefresh(); // 进来之前自动请求一次数据
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

  // 获取测试数据
  async getList(isReload: boolean, currentPage = 1): Array<Object> {
    let res = await Http.designCase_list({
      category_id: 3,
      page: currentPage,
      size: 12,
    });
    const newList = res.data.data.records;
    this.setState({
      totalPage: res.data.data.total,
      currentPage: res.data.data.current,
    });
    return isReload ? newList : [...this.state.dataList, ...newList];
  }
  render() {
    const { dataList } = this.state;
    return (
      <RefreshListView
        data={dataList}
        numColumns={2}
        contentContainerStyle={{ ...flexColumnSpb, backgroundColor: '#fff' }}
        keyExtractor={this.keyExtractor}
        renderItem={({ item, index }) => (
          <CommodityCard
            type={3}
            Title={item.Title}
            prince={item.prince}
            style={{ ...padding(25, 25, 0, 0) }}
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
    );
  }
}

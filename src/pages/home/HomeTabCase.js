import React, { Component, PureComponent } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import CommodityCard from '../../components/bussiness/CommodityCard';
import RefreshListView, {
  RefreshState,
} from '../../components/common/RefreshListView';
import { flexColumnSpb, padding } from '../../utils/StyleUtils';
import axios from 'axios';

export default class HomeTabCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
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
    let res = await Http.categoryCase({
      category_id: this.props.route.key,
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

  keyExtractor = (item: any, index: number) => {
    return index.toString();
  };

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
            Title={item.case_name}
            user_id={item.case_author}
            Commodity_type={this.props.route.title}
            image={item.picture}
            user_image={item.case_author_avatar}
            style={{ ...padding(25, 0, 25, 0) }}
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

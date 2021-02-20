import React, { Component, PureComponent } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import CommodityCard from '../../components/bussiness/CommodityCard';
import RefreshListView, {
  RefreshState,
} from '../../components/common/RefreshListView';
import { flexColumnSpb, padding } from '../../utils/StyleUtils';

export default class HomeTabCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      refreshState: RefreshState.Idle,
    };
  }

  componentDidMount() {
    this.setState({
      dataList: [
        { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
        { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
        { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
        { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
        { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
        { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
      ],
    });
  }

  onHeaderRefresh = () => {
    this.setState({ refreshState: RefreshState.HeaderRefreshing });

    // 模拟网络请求
    setTimeout(() => {
      // 模拟网络加载失败的情况

      //获取测试数据
      let dataList = this.getList(true);

      this.setState({
        dataList: dataList,
        refreshState:
          dataList.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
      });
    }, 2000);
  };

  onFooterRefresh = () => {
    this.setState({ refreshState: RefreshState.FooterRefreshing });

    // 模拟网络请求
    setTimeout(() => {
      // 模拟网络加载失败的情况

      //获取测试数据
      let dataList = this.getList(false);

      this.setState({
        dataList: dataList,
        refreshState:
          dataList.length > 50 ? RefreshState.NoMoreData : RefreshState.Idle,
      });
    }, 2000);
  };

  // 获取测试数据
  getList(isReload: boolean): Array<Object> {
    let newList = this.state.dataList;
    return isReload
      ? Math.random() < 0.2
        ? []
        : newList
      : [...this.state.dataList, ...newList];
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
            Title={item.Title}
            user_id={item.user_id}
            Commodity_type={item.Commodity_type}
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

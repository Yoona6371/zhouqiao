import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Search from '../../components/common/Search/index';
import TopTabNavigator from '../../components/common/TopTabNavigator';
import { deviceWidthDp, pxToDp } from '../../utils/pxToDp';
import CommodityCard from '../../components/bussiness/CommodityCard';
import RankCard from '../../components/bussiness/rankCard/rankCard';
import { padding } from '../../utils/StyleUtils';
import RefreshListView, {
  RefreshState,
} from '../../components/common/RefreshListView';
import { inject, observer } from 'mobx-react';

let all = React.createRef();
let wait = React.createRef();
let already = React.createRef();

@inject('RootStore')
class All extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshState: RefreshState.Idle,
      totalPage: 0,
      currentPage: 1,
      dataList: [],
    };
  }

  onHeaderRefresh = async () => {
    this.setState({
      refreshState: RefreshState.HeaderRefreshing,
    });

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
    let res = await Http.getSearchList({
      keywords: this.props.RootStore.globalStore.allData.search,
      type: 'DESIGN_CASE',
      page: currentPage,
      size: 12,
    });
    const newList = res.data.data.dataList;
    this.setState({
      totalPage: res.data.data.totalRecords,
      currentPage: res.data.data.currentPage,
    });
    return isReload ? newList : [...this.state.dataList, ...newList];
  }

  keyExtractor = (item: any, index: number) => {
    return item.id.itemId;
  };

  render() {
    const { dataList } = this.state;
    return (
      <RefreshListView
        ref={all}
        data={dataList}
        numColumns={2}
        contentContainerStyle={{ backgroundColor: '#fff' }}
        keyExtractor={this.keyExtractor}
        renderItem={({ item, index }) => (
          <CommodityCard
            Title={item.title}
            user_id={item.author}
            Commodity_type={item.extra.category}
            image={item.cover}
            userId={item.extra.authorId}
            caseId={item.itemId}
            user_image={item.extra.authorAvatar}
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

@inject('RootStore')
class Wait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshState: RefreshState.Idle,
      totalPage: 0,
      currentPage: 1,
      dataList: [],
      keywords: '',
    };
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
    let res = await Http.getSearchList({
      keywords: this.props.RootStore.globalStore.allData.search,
      type: 'COMMODITY',
      page: currentPage,
      size: 12,
    });
    const newList = res.data.data.dataList;
    this.setState({
      totalPage: res.data.data.totalRecords,
      currentPage: res.data.data.currentPage,
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
        ref={wait}
        key={2}
        data={dataList}
        numColumns={2}
        contentContainerStyle={{ backgroundColor: '#fff' }}
        keyExtractor={this.keyExtractor}
        renderItem={({ item, index }) => (
          <CommodityCard
            type={3}
            Title={item.title}
            user_id={item.author}
            Commodity_type={item.id.itemType}
            image={item.cover}
            caseId={item.itemId}
            prince={item.extra.price}
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
@inject('RootStore')
class Already extends Component {
  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.containerBox3}>
            <RankCard
              rankNumber="04"
              userPhoto="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e"
              userName="小焦同学"
              hot="6669"
              onPress={() => alert('哎，关注我')}
            />
            <RankCard
              rankNumber="04"
              userPhoto="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e"
              userName="小焦同学"
              hot="6669"
              onPress={() => alert('哎，关注我')}
            />
            <RankCard
              rankNumber="04"
              userPhoto="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e"
              userName="小焦同学"
              hot="6669"
              onPress={() => alert('哎，关注我')}
            />
            <RankCard
              rankNumber="04"
              userPhoto="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e"
              userName="小焦同学"
              hot="6669"
              onPress={() => alert('哎，关注我')}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

@inject('RootStore')
@observer
class index extends Component {
  state = {
    txt: '',
    pages: [
      {
        key: 'DESIGN_CASE',
        title: '设计案例',
        component: All,
      },
      {
        key: 'COMMODITY',
        title: '商品',
        component: Wait,
      },
      {
        key: 'USER',
        title: '设计师',
        component: Already,
      },
    ],
    dataList: [],
  };

  tabRef = React.createRef();

  changeTxt = (txt) => {
    this.setState({ txt });
  };

  handleSearch = async (tet) => {
    this.props.RootStore.globalStore.setSearch(this.state.txt);
    console.log(this.props.RootStore.globalStore.allData.search);
    all.current.props.onHeaderRefresh();
    wait.current.props.onHeaderRefresh();
    console.log(wait);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Search
          onEndEditing={() => this.handleSearch()}
          onPress={() => NavigationHelper.goBack()}
          callBack={(txt) => {
            this.changeTxt(txt);
          }}
        />
        <TopTabNavigator
          ifScrollEnabled={true}
          type={1}
          itemWidth={deviceWidthDp / 3}
          routes={this.state.pages}
          ref={this.tabRef}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerBox: {
    paddingBottom: pxToDp(40),
    paddingTop: pxToDp(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  containerBox2: {
    paddingBottom: pxToDp(40),
    paddingTop: pxToDp(42),
    paddingLeft: pxToDp(16),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  containerBox3: {
    paddingTop: pxToDp(24),
  },
});
export { All, Wait, Already };

export default index;

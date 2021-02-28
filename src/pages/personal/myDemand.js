import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import TopTitle from '../../components/common/TopTitle';
import { ScrollView } from 'react-native-gesture-handler';
import TopTabNavigator from '../../components/common/TopTabNavigator';
import DemandList from '../../components/bussiness/DemandList';
import RefreshListView, {
  RefreshState,
} from '../../components/common/RefreshListView';
import { flexColumnSpb, padding } from '../../utils/StyleUtils';

class page extends Component {
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
    let key = this.props.route.key;
    if (this.props.route.key === '0') {
      key = null;
    }
    const res = await Http.myRequirements({
      status: key,
      page: currentPage,
      size: 8,
    });
    console.log(res);
    const newList = res.data.data.dataList;
    this.setState({
      totalPage: res.data.data.totalPage,
      currentPage: res.data.data.currentPage,
    });
    return isReload ? newList : [...this.state.dataList, ...newList];
  }

  render() {
    const { dataList } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {/*<DemandList type={1} text="哈哈哈哈哈哈哈哈" date="2020-12-03" />*/}
        <RefreshListView
          data={dataList}
          numColumns={1}
          contentContainerStyle={{ ...flexColumnSpb }}
          keyExtractor={this.keyExtractor}
          renderItem={({ item, index }) => (
            <DemandList
              type={1}
              text={item.requirementAbstract}
              date={item.createTime}
              key={index}
              requirementId={item.requirementId}
              expectedPrice={item.expectedPrice}
              expectedTime={item.expectedTime}
              urgent={item.urgent}
              communityNumber={item.communityNumber}
              proficiency={item.proficiency}
              categoryId={item.categoryId}
              requirementTitle={item.requirementTitle}
              requirementContentHtml={item.requirementContentHtml}
              requirementContent={item.requirementContent}
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

class detail extends Component {
  state = {
    pages: [
      {
        key: '0',
        title: '全部',
        component: page,
      },
      {
        key: '1',
        title: '待接取',
        component: page,
      },
      {
        key: '2',
        title: '已选定',
        component: page,
      },
      {
        key: '3',
        title: '已完结',
        component: page,
      },
    ],
  };
  MyTabs = () => {
    const widthPhone = Dimensions.get('window').width;

    let { pages } = this.state;
    return (
      <TopTabNavigator
        ifScrollEnabled={true}
        type={1}
        itemWidth={widthPhone / 4}
        routes={pages}
      />
    );
  };

  render() {
    const width = Dimensions.get('window').width;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <TopTitle title="我的需求" showBtn={false} />
        <View style={{ flex: 1 }}>
          {this.MyTabs()}
          {/* <TopTabNavigator
            itemWidth={width / 4}
            ifScrollEnabled={false}
            type={1}
            name={['全部', '带接取', '已选定', '已完结']}
          >
            <ScrollView>
              <View
                style={{
                  paddingBottom: pxToDp(40),
                  paddingTop: pxToDp(33),
                }}
              >
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={3}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
              </View>
            </ScrollView>
            <ScrollView>
              <View
                style={{
                  paddingBottom: pxToDp(40),
                  paddingTop: pxToDp(33),
                }}
              >
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={3}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
              </View>
            </ScrollView>
            <ScrollView>
              <View
                style={{
                  paddingBottom: pxToDp(40),
                  paddingTop: pxToDp(33),
                }}
              >
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={3}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
              </View>
            </ScrollView>
            <ScrollView>
              <View
                style={{
                  paddingBottom: pxToDp(40),
                  paddingTop: pxToDp(33),
                }}
              >
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={3}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={2}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
                <DemandList
                  type={1}
                  text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗"
                  date="2020-02-01"
                />
              </View>
            </ScrollView>
          </TopTabNavigator> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
export default detail;

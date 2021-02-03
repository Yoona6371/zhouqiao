import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import OrderCard from '../../components/bussiness/OrderCard';
import { deviceWidthDp, pxToDp } from '../../utils/pxToDp';
import TopTopNavigator from '../../components/common/TopTabNavigator';
import TopTitle from '../../components/common/TopTitle';
class OrderList extends React.Component {
  static navigationOptions = { title: null };

  constructor(props) {
    super(props);
  }
  state = {
    evaluateData: [
      { type: 1 },
      { type: 1 },
      { type: 1 },
      { type: 1 },
      { type: 1 },
    ],
  };
  render() {
    const { evaluateData } = this.state;
    return (
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.evaluate_box}>
          <FlatList
            data={evaluateData}
            renderItem={({ item, index }) => (
              <OrderCard
                type={item.type}
                btnText={item.btnText}
                topStatus={item.topStatus}
                style={{ marginTop: pxToDp(20) }}
              />
            )}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  evaluate_box: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Index extends React.Component {
  static navigationOptions = { title: null };

  constructor(props) {
    super(props);
    this.state = {
      pages: [
        {
          key: '待付款',
          title: '待付款',
          component: OrderList,
        },
        {
          key: '进行中',
          title: '进行中',
          component: OrderList,
        },
        {
          key: '待收货',
          title: '待收货',
          component: OrderList,
        },
        {
          key: '已完成',
          title: '已完成',
          component: OrderList,
        },
        {
          key: '已取消',
          title: '已取消',
          component: OrderList,
        },
      ],
    };
  }
  MyTabs = () => {
    let { pages } = this.state;
    return (
      <TopTopNavigator
        ifScrollEnabled={true}
        itemWidth={deviceWidthDp / 5}
        type={3}
        routes={pages}
      />
    );
  };
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <TopTitle
          returnBack={console.log('进入订单页面')}
          title={'我的订单'}
          showBtn={false}
        />
        {this.MyTabs()}
      </ScrollView>
    );
  }
}

export default Index;

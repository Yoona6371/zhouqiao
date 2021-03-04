import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import OrderCard from '../../components/bussiness/OrderCard';
import { deviceWidthDp, pxToDp } from '../../utils/pxToDp';
import TopTopNavigator from '../../components/common/TopTabNavigator';
import TopTitle from '../../components/common/TopTitle';
class OrderList extends React.Component {
  static navigationOptions = { title: null };
  componentDidMount() {
    let key = this.props.route.key;
    Http.getOrderLists({ status: key, page: 1, size: 10 }).then(res => {
      console.log(res.data.data.dataList, res.data.data.dataList.length, 2222)
      this.setState({
        dateList: res.data.data.dataList
      });
    })
  }
  constructor(props) {
    super(props);
  }
  state = {
    dateList: [],
  };
  render() {
    const { dateList } = this.state;
    console.log(dateList, 888)
    return (
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.evaluate_box}>
          <FlatList
            data={dateList}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  NavigationHelper.navigate('OrderDetail', { item: item });
                }}
              >
                {item.status === 0 ?
                  <OrderCard
                    onpressRight={() => {
                      // NavigationHelper.navigate('OrderDetail', { item: item });
                      // NavigationHelper.navigate('CreatOrder', { item: item });
                      alert("删除订单")

                    }}
                    onpressLeft={() => {
                      NavigationHelper.navigate('OrderDetail', { item: item });
                    }}
                    number={item.shoppingNumber}
                    imgUri={item.cover != null ? item.cover : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1264377723,26636357&fm=26&gp=0.jpg'}
                    OrderCardNumber={item.orderId}
                    isUrgent={item.urgent === 1 ? true : false}
                    type={1}
                    OrderCardPrince={item.orderPrice}
                    OrderCardTitle={item.orderName}
                    style={{ marginTop: pxToDp(20) }}
                  />
                  : item.status === 1 ?
                    <View>
                      <OrderCard
                        onpressLeft={() => {
                          NavigationHelper.navigate('OrderDetail', { item: item });
                        }}
                        number={item.shoppingNumber}
                        isUrgent={item.urgent === 1 ? true : false}
                        imgUri={item.cover != null ? item.cover : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1264377723,26636357&fm=26&gp=0.jpg'}
                        OrderCardNumber={item.orderId}
                        type={2}
                        btnText='确认订单'
                        topStatus='进行中'
                        OrderCardPrince={item.orderPrice}
                        OrderCardTitle={item.orderName}
                        style={{ marginTop: pxToDp(20) }}
                      />
                    </View>
                    :
                    <OrderCard
                      onpressLeft={() => {
                        NavigationHelper.navigate('OrderDetail', { item: item });
                      }}
                      number={item.shoppingNumber}
                      isUrgent={item.urgent === 1 ? true : false}
                      imgUri={item.cover != null ? item.cover : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1264377723,26636357&fm=26&gp=0.jpg'}
                      OrderCardNumber={item.orderId}
                      type={2}
                      btnText='立即评价'
                      topStatus='待评价'
                      OrderCardPrince={item.orderPrice}
                      OrderCardTitle={item.orderName}
                      style={{ marginTop: pxToDp(20) }}
                    />
                }

              </TouchableOpacity>
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
          key: 0,
          title: '待付款',
          component: OrderList,
        },
        {
          key: 1,
          title: '进行中',
          component: OrderList,
        },
        {
          key: 3,
          title: '已完成',
          component: OrderList,
        }
      ],
    };
  }
  MyTabs = () => {
    let { pages } = this.state;
    return (
      <TopTopNavigator
        ifScrollEnabled={true}
        itemWidth={deviceWidthDp / 3}
        type={3}
        routes={pages}
      />
    );
  };
  render() {
    return (
      <ScrollView>
        <TopTitle title={'我的订单'} showBtn={false} />
        {this.MyTabs()}
      </ScrollView>
    );
  }
}

export default Index;

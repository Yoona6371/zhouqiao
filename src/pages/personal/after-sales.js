import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import OrderCard from '../../components/bussiness/OrderCard';
import { deviceWidthDp, pxToDp } from '../../utils/pxToDp';
// import TopTopNavigator from '../../components/common/TopTabNavigator';
import TopTitle from '../../components/common/TopTitle';

class AfterSales extends React.Component {
  static navigationOptions = { title: null };

  constructor(props) {
    super(props);
  }
  state = {
    evaluateData: [
      { type: 2, btnText: '查看进度', topStatus: '售后申请' },
      { type: 2, btnText: '查看进度', topStatus: '售后申请' },
      { type: 2, btnText: '查看进度', topStatus: '售后申请' },
      { type: 2, btnText: '查看进度', topStatus: '售后申请' },
      { type: 2, btnText: '查看进度', topStatus: '售后申请' },
    ],
  };
  render() {
    const { evaluateData } = this.state;
    return (
      <ScrollView style={{ width: '100%' }}>
        <View>
          <TopTitle title={'退款/售后'} showBtn={false} />
        </View>
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
export default AfterSales;

import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import OrderCard from '../../../components/bussiness/OrderCard';
import { deviceWidthDp, pxToDp } from '../../../utils/pxToDp';
import TopTopNavigator from '../../../components/common/TopTabNavigator';
import TopTitle from '../../../components/common/TopTitle';
class Evaluate extends React.Component {
  static navigationOptions = { title: null };

  constructor(props) {
    super(props);
  }
  state = {
    evaluateData: [
      { type: 2, btnText: '立即评价', topStatus: '待评价' },
      { type: 2, btnText: '立即评价', topStatus: '待评价' },
      { type: 2, btnText: '立即评价', topStatus: '待评价' },
      { type: 2, btnText: '立即评价', topStatus: '待评价' },
      { type: 2, btnText: '立即评价', topStatus: '待评价' },
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
// export default Evaluate;

class Index extends React.Component {
  static navigationOptions = { title: null };

  constructor(props) {
    super(props);
    this.state = {
      pages: [
        {
          key: '待评价',
          title: '待评价',
          component: Evaluate,
        },
        {
          key: '已评价/追评',
          title: '已评价/追评',
          component: Evaluate,
        },
      ],
    };
  }
  MyTabs = () => {
    let { pages } = this.state;
    return (
      <TopTopNavigator
        ifScrollEnabled={true}
        itemWidth={deviceWidthDp / 2}
        type={3}
        routes={pages}
      />
    );
  };
  render() {
    return (
      <ScrollView>
        <TopTitle title={'评价中心'} showBtn={false} />
        {this.MyTabs()}
      </ScrollView>
    );
  }
}

export default Index;

import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import OrderCard from '../../components/bussiness/OrderCard';
import { pxToDp } from '../../utils/pxToDp';
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
      <ScrollView style={{ width: '100%', height: pxToDp(1000) }}>
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
export default Evaluate;

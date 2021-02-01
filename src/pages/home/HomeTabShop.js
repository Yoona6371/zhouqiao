import React, { Component } from 'react';
import { FlatList, ScrollView } from 'react-native';
import CommodityCard from '../../components/bussiness/CommodityCard';
import { pxToDp } from '../../utils/pxToDp';

export default class HomeTabShop extends Component {
  state = {
    shoppingData: [
      { prince: 666, Title: 'One Plus 7' },
      { prince: 666, Title: 'One Plus 7' },
      { prince: 666, Title: 'One Plus 7' },
      { prince: 666, Title: 'One Plus 7' },
      { prince: 666, Title: 'One Plus 7' },
      { prince: 666, Title: 'One Plus 7' },
    ],
  };
  render() {
    const { shoppingData } = this.state;
    return (
      <ScrollView>
        {/*商品列表开始*/}
        <FlatList
          data={shoppingData}
          numColumns={2}
          columnWrapperStyle={{ marginLeft: pxToDp(10) }}
          renderItem={({ item, index }) => (
            <CommodityCard type={3} Title={item.Title} prince={item.prince} />
          )}
        />
        {/*商品列表结束*/}
      </ScrollView>
    );
  }
}

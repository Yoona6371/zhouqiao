import React, { PureComponent } from 'react';
import { FlatList, ScrollView } from 'react-native';
import CommodityCard from '../../components/bussiness/CommodityCard';
import { pxToDp } from '../../utils/pxToDp';
import { flexColumnSpb, padding } from '../../utils/StyleUtils';

export default class HomeTabShop extends PureComponent {
  state = {
    shoppingData: [],
  };

  componentDidMount() {
    this.setState({
      shoppingData: [
        { prince: 666, Title: 'One Plus 7' },
        { prince: 666, Title: 'One Plus 7' },
        { prince: 666, Title: 'One Plus 7' },
        { prince: 666, Title: 'One Plus 7' },
        { prince: 666, Title: 'One Plus 7' },
        { prince: 666, Title: 'One Plus 7' },
      ],
    });
  }

  render() {
    const { shoppingData } = this.state;
    return (
      <ScrollView>
        {/*商品列表开始*/}
        <FlatList
          data={shoppingData}
          numColumns={2}
          contentContainerStyle={{ backgroundColor: '#fff' }}
          renderItem={({ item, index }) => (
            <CommodityCard
              type={3}
              Title={item.Title}
              prince={item.prince}
              style={{ ...padding(25, 25, 0, 0) }}
            />
          )}
        />
        {/*商品列表结束*/}
      </ScrollView>
    );
  }
}

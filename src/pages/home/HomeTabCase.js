import React, { Component } from 'react';
import { FlatList, ScrollView } from 'react-native';
import CommodityCard from '../../components/bussiness/CommodityCard';

import { pxToDp } from '../../utils/pxToDp';
import { flexColumnSpb } from '../../utils/StyleUtils';

export default class HomeTabCase extends Component {
  state = {
    caseData: [
      { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
      { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
      { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
      { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
      { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
      { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
    ],
  };
  render() {
    const { caseData } = this.state;
    return (
      <ScrollView>
        {/*案例列表开始*/}
        <FlatList
          data={caseData}
          numColumns={2}
          contentContainerStyle={{ ...flexColumnSpb, backgroundColor: '#fff' }}
          renderItem={({ item, index }) => (
            <CommodityCard
              Title={item.Title}
              user_id={item.user_id}
              Commodity_type={item.Commodity_type}
            />
          )}
        />
        {/*案例列表结束*/}
      </ScrollView>
    );
  }
}

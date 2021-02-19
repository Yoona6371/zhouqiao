import React, { PureComponent } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import CommodityCard from '../../components/bussiness/CommodityCard';

import { flexColumnSpb, padding } from '../../utils/StyleUtils';

export default class HomeTabCase extends PureComponent {
  state = {
    caseData: [],
    refreshing: false,
  };

  componentDidMount() {
    this.setState({
      caseData: [
        { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
        { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
        { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
        { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
        { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
        { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
      ],
    });
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    setTimeout(() => {
      this.setState((prevState) => {
        return {
          refreshing: false,
          caseData: prevState.caseData.concat(
            this.state.caseData.slice(
              prevState.caseData.length,
              prevState.caseData.length + 50,
            ),
          ),
        };
      });
    }, 3000);
  };

  render() {
    const { caseData } = this.state;
    return (
      <SafeAreaView>
        <FlatList
          data={caseData}
          numColumns={2}
          contentContainerStyle={{ ...flexColumnSpb, backgroundColor: '#fff' }}
          renderItem={({ item, index }) => (
            <CommodityCard
              Title={item.Title}
              user_id={item.user_id}
              Commodity_type={item.Commodity_type}
              style={{ ...padding(25, 0, 25, 0) }}
            />
          )}
        />
      </SafeAreaView>
    );
  }
}

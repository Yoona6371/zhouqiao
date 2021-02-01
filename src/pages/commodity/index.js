import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import TopTab from '../../components/common/TopTabNavigator';
import { deviceWidthDp, pxToDp } from '../../utils/pxToDp';
import CommodityCard from '../../components/bussiness/CommodityCard';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ['关注', 'PS/AI', '平面', 'CAD', 'UI设计', '工业设计'],
      caseData: [
        [
          {
            Title: '冯泽明的买卖',
            Commodity_type: 'Man',
            user_id: 'Agan的故事',
          },
          {
            Title: '冯泽明的买卖',
            Commodity_type: 'Man',
            user_id: 'Agan的故事',
          },
          {
            Title: '冯泽明的买卖',
            Commodity_type: 'Man',
            user_id: 'Agan的故事',
          },
          {
            Title: '冯泽明的买卖',
            Commodity_type: 'Man',
            user_id: 'Agan的故事',
          },
          {
            Title: '冯泽明的买卖',
            Commodity_type: 'Man',
            user_id: 'Agan的故事',
          },
          {
            Title: '冯泽明的买卖',
            Commodity_type: 'Man',
            user_id: 'Agan的故事',
          },
        ],
      ],
    };
  }

  // 请求数据在这里请求获取tab栏数据，以及渲染第一个页面的值
  // componentWillMount() {
  // }

  render() {
    const { name, caseData, flatList } = this.state;
    let length = name.length;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TopTab
          name={name}
          ifScrollEnabled={true}
          itemWidth={deviceWidthDp / 4}
          type={3}
        >
          {name.map((v, i) => (
            <FlatList
              data={caseData[i]}
              numColumns={2}
              renderItem={({ item, index }) => (
                <CommodityCard
                  type={1}
                  Title={item.Title}
                  prince={item.prince}
                />
              )}
            />
          ))}
          {/*<FlatList*/}
          {/*  data={caseData[0]}*/}
          {/*  numColumns={2}*/}
          {/*  columnWrapperStyle={{ marginLeft: pxToDp(32) }}*/}
          {/*  renderItem={({ item, index }) => (*/}
          {/*    <CommodityCard type={1} Title={item.Title} prince={item.prince} />*/}
          {/*  )}*/}
          {/*/>*/}
          {/*<FlatList*/}
          {/*  data={caseData[0]}*/}
          {/*  numColumns={2}*/}
          {/*  columnWrapperStyle={{ marginLeft: pxToDp(32) }}*/}
          {/*  renderItem={({ item, index }) => (*/}
          {/*    <CommodityCard type={1} Title={item.Title} prince={item.prince} />*/}
          {/*  )}*/}
          {/*/>*/}
          {/*<FlatList*/}
          {/*  data={caseData[0]}*/}
          {/*  numColumns={2}*/}
          {/*  columnWrapperStyle={{ marginLeft: pxToDp(32) }}*/}
          {/*  renderItem={({ item, index }) => (*/}
          {/*    <CommodityCard type={1} Title={item.Title} prince={item.prince} />*/}
          {/*  )}*/}
          {/*/>*/}
          {/*<FlatList*/}
          {/*  data={caseData[0]}*/}
          {/*  numColumns={2}*/}
          {/*  columnWrapperStyle={{ marginLeft: pxToDp(32) }}*/}
          {/*  renderItem={({ item, index }) => (*/}
          {/*    <CommodityCard type={1} Title={item.Title} prince={item.prince} />*/}
          {/*  )}*/}
          {/*/>*/}
          {/*<FlatList*/}
          {/*  data={caseData[0]}*/}
          {/*  numColumns={2}*/}
          {/*  columnWrapperStyle={{ marginLeft: pxToDp(32) }}*/}
          {/*  renderItem={({ item, index }) => (*/}
          {/*    <CommodityCard type={1} Title={item.Title} prince={item.prince} />*/}
          {/*  )}*/}
          {/*/>*/}
        </TopTab>
      </View>
    );
  }
}

export default Test;

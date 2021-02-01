import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import TopTab from '../../components/common/TopTabNavigator';
import { deviceWidthDp } from '../../utils/pxToDp';
import CommodityCard from '../../components/bussiness/CommodityCard';
import TopTitle from '../../components/common/TopTitle';
import { padding } from '../../utils/StyleUtils';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ['关注', 'PS/AI', '平面', 'CAD', 'UI设计', '工业设计'],
      caseData: [
        [
          {
            Title: '冯泽明的买卖',
            Commodity_type: 'PS/AI',
            user_id: 'asd',
            router: '',
          },
          {
            Title: '冯泽明的买卖',
            Commodity_type: 'PS/AI',
            router: '',
          },
          {
            Title: '冯泽明的买卖',
            Commodity_type: 'PS/AI',
            router: '',
          },
          {
            Title: '冯泽明的买卖',
            Commodity_type: 'PS/AI',
            router: '',
          },
          {
            Title: '冯泽明的买卖',
            Commodity_type: 'PS/AI',
            router: '',
          },
          {
            Title: '冯泽明的买卖',
            Commodity_type: 'PS/AI',
            router: '',
          },
        ],
      ],
    };
  }

  // 请求数据在这里请求获取tab栏数据，以及渲染第一个页面的值
  // componentWillMount() {
  // }

  render() {
    const { name, caseData } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <TopTitle
          returnBack={() => {
            this.props.navigation.goBack();
          }}
          title="设计案例"
          showBtn={false}
        />
        <TopTab
          name={name}
          ifScrollEnabled={true}
          itemWidth={deviceWidthDp / 4}
          type={3}
        >
          {name.map((v, i) => (
            <FlatList
              style={{
                backgroundColor: '#fff',
                alignSelf: 'center',
              }}
              data={caseData[i]}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <CommodityCard
                  type={1}
                  Title={item.Title}
                  prince={item.prince}
                  user_id={item.user_id}
                  Commodity_type={item.Commodity_type}
                  router={item.router}
                  style={{ ...padding(20, 0, 20, 0) }}
                />
              )}
            />
          ))}
        </TopTab>
      </View>
    );
  }
}

export default Test;

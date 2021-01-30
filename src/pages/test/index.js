import React, { Component } from 'react';
import { View, Text } from 'react-native';
import UserXCard from '../../components/bussiness/UserXCard';
import DemandList from '../../components/bussiness/DemandList'
import TopTabNavigator from "../../components/common/TopTabNavigator/index";
import { pxToDp } from '../../utils/pxToDp';
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <DemandList type={2} text="高浩杰是大傻狗高浩杰是大傻狗高浩杰是大傻狗是大傻狗" date='2021-02-01'></DemandList> */}
        <TopTabNavigator type={3} itemWidth={pxToDp(245)} ifScrollEnabled={false} name={['手绘', 'PS/AI', 'UI']}>
          <View>
            <DemandList type={1} text="asdasdsadasdsad" date="2020-02-10"></DemandList>
          </View>
          <View>
            <DemandList type={2} text="asdasdsadasdsad" date="2020-02-10"></DemandList>
          </View>
          <View>
            <DemandList type={3} text="asdasdsadasdsad" date="2020-02-10"></DemandList>
          </View>
          
        </TopTabNavigator>
      </View>
    );
  }
}

export default App;

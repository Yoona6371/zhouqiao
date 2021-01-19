import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Svg from 'react-native-svg-uri';
import Home from '../pages/home';
import Personal from '../pages/personal';

// 导入svg
import { tabbar_index } from '../constants/svg';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabNavigator tabBarStyle={{}}>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="Home"
            renderIcon={() => (
              <Svg svgXmlData={tabbar_index} width="50" heigth="30" />
            )}
            renderSelectedIcon={() => (
              <Svg svgXmlData={tabbar_index} width="50" heigth="30" />
            )}
            onPress={() => this.setState({ selectedTab: 'home' })}
          >
            {<Home />}
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            title="Profile"
            renderIcon={() => (
              <Svg svgXmlData={tabbar_index} width="50" heigth="30" />
            )}
            renderSelectedIcon={() => (
              <Svg svgXmlData={tabbar_index} width="50" heigth="30" />
            )}
            onPress={() => this.setState({ selectedTab: 'profile' })}
          >
            {<Personal />}
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}
export default Index;

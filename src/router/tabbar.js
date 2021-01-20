import React, { Component } from 'react';
import { View } from 'react-native';
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
      pages: [
        {
          selected: 'home',
          title: 'home',
          renderIcon: () => (
            <Svg svgXmlData={tabbar_index} width="50" heigth="30" />
          ),
          renderSelectedIcon: () => (
            <Svg svgXmlData={tabbar_index} width="50" heigth="30" />
          ),
          onPress: () => {
            this.setState({ selectedTab: 'home' });
          },
          component: <Home />,
        },
        {
          selected: 'personal',
          title: 'personal',
          renderIcon: () => (
            <Svg svgXmlData={tabbar_index} width="50" heigth="30" />
          ),
          renderSelectedIcon: () => (
            <Svg svgXmlData={tabbar_index} width="50" heigth="30" />
          ),
          onPress: () => {
            this.setState({ selectedTab: 'personal' });
          },
          component: <Personal />,
        },
      ],
    };
  }
  render() {
    const { selectedTab, pages } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <TabNavigator>
          {pages.map((v, i) => (
            <TabNavigator.Item
              key={i}
              selected={v.selected == selectedTab}
              title={v.title}
              renderIcon={v.renderIcon}
              renderSelectedIcon={v.renderSelectedIcon}
              onPress={v.onPress}
              selectedTitleStyle={{
                color: '#888',
              }}
              tabStyle={{ backgroundColor: '#eee' }}
            >
              {v.component}
            </TabNavigator.Item>
          ))}
        </TabNavigator>
      </View>
    );
  }
}
export default Index;

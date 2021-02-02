zimport React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Svg from 'react-native-svg-uri';
import Home from '../pages/home';
import Personal from '../pages/personal';
import { pxToDp } from '../utils/pxToDp';
import { bgColor } from '../constants/config';

// 导入svg
import {
  tabbar_design_selected,
  tabbar_home_selected,
  tabbar_message_selected,
  tabbar_mine_selected,
} from '../constants/svg';
import Icon from '../components/common/Icon';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      pages: [
        {
          selected: 'home',
          title: 'home',
          renderIcon: () => <Icon name={'tabbar_home'} />,
          renderSelectedIcon: () => (
            <Svg
              svgXmlData={tabbar_home_selected}
              width={pxToDp(50)}
              heigth={pxToDp(50)}
            />
          ),
          onPress: () => {
            this.setState({ selectedTab: 'home' });
          },
          component: <Home {...props} />,
        },
        {
          selected: 'design',
          title: 'design',
          renderIcon: () => <Icon name={'tabbar_design'} />,
          renderSelectedIcon: () => (
            <Svg
              svgXmlData={tabbar_design_selected}
              width={pxToDp(50)}
              heigth={pxToDp(50)}
            />
          ),
          onPress: () => {
            this.setState({ selectedTab: 'home' });
          },
          component: <Text>1231</Text>,
        },
        {
          selected: 'release',
          title: 'release',
          renderIcon: () => (
            <Image
              source={require('../asserts/icons/release.png')}
              style={{ width: pxToDp(100), height: pxToDp(100) }}
            />
          ),
          renderSelectedIcon: () => (
            <Image source={require('../asserts/icons/release.png')} />
          ),
          onPress: () => {
            this.setState({ selectedTab: 'home' });
          },
          component: <Text>1231</Text>,
        },
        {
          selected: 'message',
          title: 'message',
          renderIcon: () => <Icon name={'tabbar_message'} />,
          renderSelectedIcon: () => (
            <Svg
              svgXmlData={tabbar_message_selected}
              width={pxToDp(50)}
              heigth={pxToDp(50)}
            />
          ),
          onPress: () => {
            this.setState({ selectedTab: 'home' });
          },
          component: <Text>1231</Text>,
        },
        {
          selected: 'personal',
          title: 'personal',
          renderIcon: () => <Icon name={'tabbar_mine'} />,
          renderSelectedIcon: () => (
            <Svg
              svgXmlData={tabbar_mine_selected}
              width={pxToDp(50)}
              heigth={pxToDp(50)}
            />
          ),
          onPress: () => {
            this.setState({ selectedTab: 'personal' });
          },
          component: <Personal {...props} />,
        },
      ],
    };
  }
  render() {
    const { selectedTab, pages } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require('../asserts/images/home_bottom.png')}
          style={styles.home_bottom}
        />
        <TabNavigator
          sceneStyle={{ backgroundColor: bgColor }}
          tabBarStyle={{ backgroundColor: '#fff' }}
        >
          {pages.map((v, i) => (
            <TabNavigator.Item
              key={i}
              selected={v.selected === selectedTab}
              title={v.title}
              renderIcon={v.renderIcon}
              renderSelectedIcon={v.renderSelectedIcon}
              onPress={v.onPress}
              selectedTitleStyle={{
                color: '#888',
              }}
              tabStyle={styles.tabStyle}
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

const styles = StyleSheet.create({
  home_bottom: {
    position: 'absolute',
    width: pxToDp(750),
    height: pxToDp(156),
    zIndex: 100,
    bottom: 0,
  },
  tabStyle: {
    position: 'relative',
    zIndex: 200,
  },
});

import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import Svg from 'react-native-svg-uri'

// 导入svg
import { tabbar_index } from '../constants/svg'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "home"
        }
    }
    render() {
        console.log("进入tabbar");
        return (
            <View style={{ flex: 1 }}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="Home"
                        renderIcon={() => <Svg svgXmlData={tabbar_index} width="50" heigth="30" />}
                        renderSelectedIcon={() => <Svg svgXmlData={tabbar_index} width="50" heigth="30" />}
                        onPress={() => this.setState({ selectedTab: 'home' })}>
                        <Text>giao</Text>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'profile'}
                        title="Profile"
                        renderIcon={() => <Svg svgXmlData={tabbar_index} width="50" heigth="30" />}
                        renderSelectedIcon={() => <Svg svgXmlData={tabbar_index} width="50" heigth="30" />}
                        onPress={() => this.setState({ selectedTab: 'profile' })}>
                        <Text>giaogiao</Text>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }

}
export default Index;
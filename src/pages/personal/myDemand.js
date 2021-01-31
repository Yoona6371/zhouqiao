import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, } from 'react-native'
import TopTitle from '../../components/common/TopTitle'
import { ScrollView } from 'react-native-gesture-handler'
import TopTabNavigator from '../../components/common/TopTabNavigator'
import DemandList from '../../components/bussiness/DemandList'
import { pxToDp } from '../../utils/pxToDp'
export class detail extends Component {
    render() {
        const width = Dimensions.get('window').width
        return (
            <View style={{
                flex: 1
            }}>
                <TopTitle title="我的需求" showBtn={false} returnBack={() => alert('asd')}></TopTitle>
                <View style={{ flex: 1 }}>
                    <TopTabNavigator itemWidth={width / 4} ifScrollEnabled={false} type={1} name={['全部', '带接取', '已选定', '已完结']}>
                        <ScrollView>
                            <View style={{
                                paddingBottom: pxToDp(40),
                                paddingTop: pxToDp(33)
                            }}>
                                <DemandList type={1} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={2} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={3} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={2} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={1} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                            </View>
                        </ScrollView>
                        <ScrollView>
                            <View style={{
                                paddingBottom: pxToDp(40),
                                paddingTop: pxToDp(33)
                            }}>
                                <DemandList type={1} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={2} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={3} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={2} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={1} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                            </View>
                        </ScrollView>
                        <ScrollView>
                            <View style={{
                                paddingBottom: pxToDp(40),
                                paddingTop: pxToDp(33)
                            }}>
                                <DemandList type={1} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={2} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={3} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={2} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={1} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                            </View>
                        </ScrollView>
                        <ScrollView>
                            <View style={{
                                paddingBottom: pxToDp(40),
                                paddingTop: pxToDp(33)
                            }}>
                                <DemandList type={1} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={2} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={3} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={2} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                                <DemandList type={1} text="高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗高浩杰是蠢狗" date="2020-02-01"></DemandList>
                            </View>
                        </ScrollView>
                    </TopTabNavigator>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})
export default (detail)

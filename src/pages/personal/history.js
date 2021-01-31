import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, } from 'react-native'
import TopTitle from '../../components/common/TopTitle'
import { ScrollView } from 'react-native-gesture-handler'
import TopTabNavigator from '../../components/common/TopTabNavigator'
import RecordCard from '../../components/bussiness/RecordCard'
import { pxToDp } from '../../utils/pxToDp'
export class detail extends Component {
    firstModel = () => {
        return (
            <ScrollView>
                <View style={{
                    marginTop: pxToDp(13),
                    paddingBottom: (20)
                }}>
                    <RecordCard Title="朗艺装饰企业网站建设 定制开发制作网页" RecordCard_type="PS/AI"></RecordCard>
                    <RecordCard Title="朗艺装饰企业网站建设 定制开发制作网页" RecordCard_type="PS/AI"></RecordCard>
                    <RecordCard Title="朗艺装饰企业网站建设 定制开发制作网页" RecordCard_type="PS/AI"></RecordCard>
                    <RecordCard Title="朗艺装饰企业网站建设 定制开发制作网页" RecordCard_type="PS/AI"></RecordCard>
                    <RecordCard Title="朗艺装饰企业网站建设 定制开发制作网页" RecordCard_type="PS/AI"></RecordCard>
                    <RecordCard Title="朗艺装饰企业网站建设 定制开发制作网页" RecordCard_type="PS/AI"></RecordCard>
                </View>
            </ScrollView>
        )
    }
    // 第2个标签下的内容
    secondModel = () => {
        return (
            <ScrollView>
                <View style={{
                    marginTop: pxToDp(13),
                    paddingBottom: (20)
                }}>
                    <RecordCard Title="朗艺装饰企业网站建设 定制开发制作网页" RecordCard_type="PS/AI"></RecordCard>
                </View>
            </ScrollView>
        )
    }
    // 第3个标签下的内容
    thirdModel = () => {
        return (
            <Text>
                asd
            </Text>
        )
    }
    // 第4个标签下的内容
    fourthModel = () => {
        return (
            <Text>
                asd
            </Text>
        )
    }
    // 第5个标签下的内容
    fifthdModel = () => {
        return (
            <Text>
                asd
            </Text>
        )
    }
    // 第6个标签下的内容
    sixthdModel = () => {
        return (
            <Text>
                asd
            </Text>
        )
    }
    render() {
        const width = Dimensions.get('window').width
        return (
            <View style={{
                flex: 1
            }}>
                <TopTitle title="浏览记录" showBtn={true} returnBack={() => alert('回不去了')} onPress={() => alert('别动我')}></TopTitle>
                <View style={{ flex: 1 }}>
                    <TopTabNavigator itemWidth={width / 6} ifScrollEnabled={false} type={1} name={['手绘', 'PS/AI', '漫画', '平面', 'CAD', 'UI']}>
                        {this.firstModel()}
                        {this.secondModel()}
                        {this.thirdModel()}
                        {this.fourthModel()}
                        {this.fifthdModel()}
                        {this.sixthdModel()}
                    </TopTabNavigator>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})
export default (detail)

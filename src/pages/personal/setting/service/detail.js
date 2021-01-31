import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import TopTitle from '../../../../components/common/TopTitle'
export class detail extends Component {
    render() {
        return (
            <View>
                <TopTitle title="隐私协议" showBtn={false} returnBack={()=>alert('asd')}></TopTitle>
                <Text> prop </Text>
            </View>
        )
    }
}


export default (detail)

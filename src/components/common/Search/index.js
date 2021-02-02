import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import { pxToDp } from '../../../utils/pxToDp'
import Icon from '../../common/Icon';
export class index extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }

    render() {
        return (
            <View style={styles.border}>
                <Icon name='back' style={{
                    marginTop: pxToDp(106),
                }}></Icon>
                <View style={{ marginLeft: pxToDp(30) }}>
                    <TextInput
                        placeholder="请输入搜索的关键词"
                        style={styles.input}>
                    </TextInput>
                    <Icon name='search2' style={{
                        fontSize: pxToDp(22),
                        position: 'absolute',
                        top: pxToDp(108),
                        right: pxToDp(32),
                    }}></Icon>
                </View>
                <View>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    border: {
        width: '100%',
        backgroundColor: '#FFF',
        height: pxToDp(160),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    input: {
        marginTop: pxToDp(90),
        height: pxToDp(62),
        width: pxToDp(630),
        borderRadius: pxToDp(30),
        backgroundColor: '#F5F5F5',
        fontSize: pxToDp(28),
        paddingVertical: 0,
        paddingLeft: pxToDp(39),
        paddingTop: pxToDp(10),
        paddingBottom: pxToDp(10)
    }
})
export default (index)

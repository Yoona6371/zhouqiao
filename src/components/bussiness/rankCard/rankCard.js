// 例子:
// <RankCard 
// rankNumber = "04"
// userPhoto = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile01.16sucai.com%2Fd%2Ffile%2F2011%2F0801%2F20110801111724537.jpg&refer=http%3A%2F%2Ffile01.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614743658&t=d8b2e5e37cdd5eb3ddd09d149f3b892e'
// userName = "小焦同学"
// hot = "6669"
// onPress = {() => alert('哎，关注我')}></RankCard >
import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { pxToDp } from '../../../utils/pxToDp'

export class rankCard extends Component {
    static propTypes = {
        rankNumber: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        hot: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        userPhoto: PropTypes.string.isRequired
    }

    render() {
        const { rankNumber, userPhoto, userName, hot, onPress } = this.props;
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <View style={styles.cardBox}>
                    <Text style={styles.Number}>{rankNumber}</Text>
                    <Image style={styles.photoStyle} source={{ uri: userPhoto }}></Image>
                    <Text style={styles.name}>{userName}</Text>
                    <Image style={styles.rankCardFire} source={require('../../../asserts/images/rankCardFire.png')}></Image>
                    <Text style={styles.clickGood}>{hot}</Text>
                    <TouchableOpacity style={styles.guanzhuBtn} onPress={onPress}>
                        <Text style={{
                            color: '#FFF',
                            fontSize: pxToDp(35),
                            marginTop: -2
                        }}>+ </Text>
                        <Text style={{
                            color: '#FFF',
                            fontSize: pxToDp(27),
                            fontWeight: '700'
                        }}>关注</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardBox: {
        height: pxToDp(136),
        backgroundColor: "#FFF",
        marginTop: pxToDp(17),
        paddingLeft: pxToDp(31),
        paddingRight: pxToDp(31),
        flexDirection: 'row',
        alignItems: 'center',
    },
    Number: {
        fontSize: pxToDp(38),
        fontWeight: '700',
        color: '#333333',
        lineHeight: pxToDp(136)
    },
    photoStyle: {
        width: pxToDp(84),
        height: pxToDp(84),
        marginLeft: pxToDp(32),
        borderRadius: pxToDp(200)
    },
    name: {
        fontSize: pxToDp(28),
        fontWeight: '700',
        color: '#333333',
        marginLeft: pxToDp(26),
    },
    rankCardFire: {
        width: pxToDp(21),
        height: pxToDp(27),
        marginLeft: pxToDp(15)
    },
    clickGood: {
        fontSize: pxToDp(32),
        fontWeight: '700',
        marginLeft: pxToDp(53),
        color: '#FE9E0E',
    },
    guanzhuBtn: {
        width: pxToDp(137),
        height: pxToDp(60),
        backgroundColor: '#FE9E0E',
        borderRadius: pxToDp(30),
        justifyContent: 'center',
        marginLeft: pxToDp(46),
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default (rankCard)

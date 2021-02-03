import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { pxToDp } from '../../../utils/pxToDp'
import SvgUri from 'react-native-svg-uri'
import { like } from '../../../constants/svg'
export class rankCardTop3 extends Component {
    static propTypes = {
        top3: PropTypes.array.isRequired,
        onPressChampion: PropTypes.func.isRequired,
        onPressRunner_up: PropTypes.func.isRequired,
        onPressThird_place: PropTypes.func.isRequired,
    }

    render() {
        const { top3, onPressChampion, onPressRunner_up, onPressThird_place } = this.props;
        return (
            <View>
                <ImageBackground style={styles.bg} source={require('../../../asserts/images/rankCardBg.png')}>
                    <View style={styles.threeRankBorder}>
                        <View style={styles.runner_up}>
                            <ImageBackground style={styles.rank2Bg} source={require('../../../asserts/images/rank2.png')}>
                                <Image style={styles.rank2Photo} source={{ uri: top3[1].runner_up_photo }}></Image>
                            </ImageBackground>
                            <View style={styles.rank2_nameAndZan}>
                                <Text numberOfLines={1} style={styles.rank2Name}>{top3[1].runner_up_name}</Text>
                                <View style={styles.rank2Svg_text_box}>
                                    <SvgUri
                                        svgXmlData={like}
                                        width={pxToDp(30)}
                                        height={pxToDp(32)}
                                        style={styles.rank2Like}
                                    >
                                    </SvgUri>
                                    <Text style={styles.rank2LikeNumber}>13269</Text>

                                </View>
                                <TouchableOpacity style={styles.guanzhuBtn} onPress={onPressRunner_up}>
                                    <Text style={styles.rank2_add}>+ </Text>
                                    <Text style={styles.rank2_addAttention}>关注</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.champion}>
                            <ImageBackground style={styles.rank1Bg} source={require('../../../asserts/images/rank1.png')}>
                                <Image style={styles.rank1Photo} source={{ uri: top3[0].champion_photo }}></Image>
                            </ImageBackground>
                            <View style={styles.rank2_nameAndZan}>
                                <Text numberOfLines={1} style={styles.rank2Name}>{top3[0].champion_name}</Text>
                                <View style={styles.rank2Svg_text_box}>
                                    <SvgUri
                                        svgXmlData={like}
                                        width={pxToDp(30)}
                                        height={pxToDp(32)}
                                        style={styles.rank2Like}
                                    >
                                    </SvgUri>
                                    <Text style={styles.rank2LikeNumber}>{top3[0].champion_hot}</Text>

                                </View>
                                <TouchableOpacity style={styles.guanzhuBtn1} onPress={onPressChampion}>
                                    <Text style={styles.rank2_add}>+ </Text>
                                    <Text style={styles.rank2_addAttention}>关注</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.third_place}>
                            <ImageBackground style={styles.rank2Bg} source={require('../../../asserts/images/rank3.png')}>
                                <Image style={styles.rank2Photo} source={{ uri: top3[2].third_place_photo }}></Image>
                            </ImageBackground>
                            <View style={styles.rank2_nameAndZan}>
                                <Text numberOfLines={1} style={styles.rank2Name}>{top3[2].third_place_name}</Text>
                                <View style={styles.rank2Svg_text_box}>
                                    <SvgUri
                                        svgXmlData={like}
                                        width={pxToDp(30)}
                                        height={pxToDp(32)}
                                        style={styles.rank2Like}
                                    >
                                    </SvgUri>
                                    <Text style={styles.rank2LikeNumber}>{top3[2].third_place_hot}</Text>

                                </View>
                                <TouchableOpacity style={styles.guanzhuBtn} onPress={onPressThird_place}>
                                    <Text style={styles.rank2_add}>+ </Text>
                                    <Text style={styles.rank2_addAttention}>关注</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: pxToDp(554),
    },
    threeRankBorder: {
        height: pxToDp(554),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: pxToDp(10)
    },
    runner_up: {
        width: pxToDp(224),
        height: pxToDp(286),
        backgroundColor: '#FFF',
        borderTopLeftRadius: pxToDp(20),
        borderTopRightRadius: pxToDp(20),
        elevation: 1,

    },
    champion: {
        width: pxToDp(266),
        height: pxToDp(320),
        backgroundColor: '#FFF',
        borderTopLeftRadius: pxToDp(20),
        borderTopRightRadius: pxToDp(20),
        elevation: 10

    },
    third_place: {
        width: pxToDp(224),
        height: pxToDp(286),
        backgroundColor: '#FFF',
        borderTopLeftRadius: pxToDp(20),
        borderTopRightRadius: pxToDp(20),
        elevation: 1
    },
    rank2Bg: {
        width: pxToDp(147),
        height: pxToDp(127),
        marginLeft: pxToDp(60),
        marginTop: pxToDp(-6),

    },
    rank2Photo: {
        borderRadius: pxToDp(999),
        height: pxToDp(88),
        width: pxToDp(88),
        marginTop: pxToDp(33),
        marginLeft: pxToDp(6),
    },
    rank2Name: {
        maxWidth: pxToDp(180),
        fontSize: pxToDp(28),
        fontWeight: '700',
        color: '#333333',
        marginTop: pxToDp(16),
    },
    rank2Svg_text_box: {
        flexDirection: 'row',
    },
    rank2Like: {
        marginTop: pxToDp(10),
    },
    rank2LikeNumber: {
        fontSize: pxToDp(26),
        fontWeight: '500',
        color: '#999999',
        marginTop: pxToDp(10),
        marginLeft: pxToDp(6)
    },
    rank2_nameAndZan: {
        alignItems: 'center'
    },
    guanzhuBtn: {
        width: pxToDp(110),
        height: pxToDp(34),
        backgroundColor: '#FE9E0E',
        borderRadius: pxToDp(30),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: pxToDp(10)
    },
    rank2_add: {
        color: '#FFF',
        fontSize: pxToDp(35),
        marginTop: -2
    },
    rank2_addAttention: {
        color: '#FFF',
        fontSize: pxToDp(24),
        fontWeight: '700'
    },
    rank1Bg: {
        width: pxToDp(188),
        height: pxToDp(143),
        marginLeft: pxToDp(60),
        marginTop: pxToDp(-6),
    },
    rank1Photo: {
        borderRadius: pxToDp(999),
        width: pxToDp(100),
        height: pxToDp(100),
        marginTop: pxToDp(34),
        marginLeft: pxToDp(28.6),
    },
    guanzhuBtn1: {
        width: pxToDp(110),
        height: pxToDp(34),
        backgroundColor: '#FE9E0E',
        borderRadius: pxToDp(30),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: pxToDp(16)
    },
})

export default (rankCardTop3)

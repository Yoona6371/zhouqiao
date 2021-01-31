
// 需要四个参数 例如  <TopTitle returnBack={this.sss} onPress={this.hello} title="购物列表" showBtn={true}></TopTitle>
// returnBack是返回按钮得参数，onpress是右侧详情按钮得函数，title是中间得文字，showBtn是右侧按钮是否展示
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { pxToDp } from '../../../utils/pxToDp'
import PropTypes from 'prop-types'
import SvgUri from 'react-native-svg-uri';
import { goBack } from '../../../constants/svg';
export class index extends Component {
    static propTypes = {
        returnBack: PropTypes.func.isRequired,
        onPress:PropTypes.func,
        title:PropTypes.string.isRequired,
        showBtn:PropTypes.bool
    }
    ifShowBtn = () => {
        if (this.props.showBtn === false) {
            return (
                <View style={{
                    marginTop: pxToDp(89),
                    // backgroundColor: 'blue',
                    width: pxToDp(180),
                    alignItems: 'flex-end',
                    justifyContent: 'center',

                }}>
                </View>
            )
        } else if (this.props.showBtn === true) {
            return (
                <View style={{
                    marginTop: pxToDp(89),
                    // backgroundColor: 'blue',
                    width: pxToDp(180),
                    alignItems: 'flex-end',
                    justifyContent: 'center',

                }}>
                    <TouchableOpacity
                        style={{
                            width: pxToDp(91),
                            height: pxToDp(46),
                            backgroundColor: '#FE9E0E',
                            borderRadius: pxToDp(8),
                            elevation: 10,
                            marginRight: pxToDp(18),
                            justifyContent: 'center',

                        }}
                        onPress={this.props.onPress}

                    >
                        <Text style={{
                            fontSize: pxToDp(24),
                            fontWeight: '500',
                            color: '#FFF',
                            alignSelf: 'center',
                        }}

                        >清空</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    render() {
        const { title } = this.props;
        return (
            <View style={{
                backgroundColor: '#fff',
                alignItems: 'center'
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: pxToDp(178),
                    width: '90%'
                }}>
                    <View style={{
                        marginTop: pxToDp(89),
                        // backgroundColor: 'red',
                        width: pxToDp(180),
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                         <TouchableOpacity
                            onPress={this.props.returnBack}
                         >
                        <SvgUri
                            svgXmlData={goBack}
                            width={26}
                            height={31}
                        />
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        marginTop: pxToDp(89),
                        // backgroundColor: 'yellow',
                        width: pxToDp(200),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: pxToDp(38),
                            fontWeight: 'bold',
                            color: '#222222',
                        }}
                        >
                            {title}
                        </Text>
                    </View>
                    {/* 右侧按钮开始 */}
                    {this.ifShowBtn()}
                    {/* 右侧按钮结束 */}
                </View>
            </View>
        )
    }
}

export default (index)


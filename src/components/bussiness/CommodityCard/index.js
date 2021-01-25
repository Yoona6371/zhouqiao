import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { pxToDp } from '../../../utils/pxToDp';
import PropTypes from 'prop-types';

export default class CommodityCard extends React.Component {
  static propTypes = {
    type: PropTypes.number,
    prince: PropTypes.number,
    Title: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    user_image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    Commodity_type: PropTypes.string,
    user_id: PropTypes.string,
  };
  static defaultProps = {
    type: 1, //1:案例 2.取消案例收藏 3.商品案例
  };

  constructor(props) {
    super(props);
  }
  render() {
    const {
      type,
      prince,
      Title,
      image,
      user_image,
      Commodity_type,
      user_id,
      shopping_Img,
    } = this.props;
    {
      /* type:3 -> 商品组件
       * type:2 -> 取消案例收藏组件
       * type:1(默认) ->案例组件
       */
    }
    return (
      <View>
        {this.props.type === 3 ? (
          <View style={{ width: pxToDp(330), height: pxToDp(482) }}>
            <View
              style={{
                width: pxToDp(330),
                height: pxToDp(300),
                backgroundColor: '#FFFFFF',
              }}
            >
              <Image
                source={require('../../../asserts/images/shopping_Image.png')}
                style={{ width: pxToDp(330), height: pxToDp(300) }}
              />
            </View>
            <View
              style={{
                width: pxToDp(306),
                height: pxToDp(69),
                marginTop: pxToDp(25),
              }}
            >
              <Text style={{ fontSize: pxToDp(30) }}>{Title}</Text>
            </View>
            <View style={{ marginTop: pxToDp(24) }}>
              <Text style={{ color: '#FE9E0E', fontSize: pxToDp(26) }}>
                ¥{this.props.prince}
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              width: pxToDp(325),
              height: pxToDp(520),
              backgroundColor: '#FFFFFF',
            }}
          >
            {/*案例图片开始*/}
            <View>
              <ImageBackground
                source={require('../../../asserts/images/CommodityCard_background.png')}
                style={{ width: pxToDp(325), height: pxToDp(325) }}
              >
                <View
                  style={{
                    width: pxToDp(110),
                    height: pxToDp(40),
                    borderBottomRightRadius: pxToDp(20),
                    borderTopRightRadius: pxToDp(20),
                    backgroundColor: '#F1A23C',
                    marginTop: pxToDp(20),
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      textAlign: 'center',
                      fontSize: pxToDp(22),
                    }}
                  >
                    {this.props.Commodity_type}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            {/*案例图片结束*/}
            {/*案例描述开始*/}
            <View>
              <View
                style={{
                  width: pxToDp(325),
                  height: pxToDp(68),
                  // flexDirection: 'row',
                  paddingLeft: pxToDp(9),
                  marginTop: pxToDp(24),
                }}
              >
                <Text
                  styel={{
                    fontSize: pxToDp(28),
                    width: pxToDp(289),
                    height: pxToDp(68),
                  }}
                >
                  {this.props.Title}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/*用户头像开始*/}
                <View
                  style={{
                    width: pxToDp(50),
                    height: pxToDp(50),
                    marginTop: pxToDp(24),
                    marginLeft: pxToDp(9),
                    borderRadius: pxToDp(25),
                    backgroundColor: '#FE9E0E',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={require('../../../asserts/images/CommodityCard_userImage.png')}
                    // styel={{ width: pxToDp(50), height: pxToDp(50) }}
                  />
                </View>
                {/*用户头像结束*/}
                {this.props.type === 1 ? (
                  <View
                    style={{
                      marginTop: pxToDp(20),
                      marginLeft: pxToDp(20),
                    }}
                  >
                    <Text style={{ fontSize: pxToDp(24), color: '#999999' }}>
                      {this.props.user_id}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      width: pxToDp(120),
                      height: pxToDp(46),
                      backgroundColor: '#F0F0F0',
                      justifyContent: 'center',
                      marginTop: pxToDp(27),
                      marginLeft: pxToDp(125),
                    }}
                  >
                    <TouchableOpacity>
                      <Text
                        style={{
                          color: '#999999',
                          fontSize: pxToDp(22),
                          textAlign: 'center',
                        }}
                      >
                        取消收藏
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

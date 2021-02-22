import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import PropTypes from 'prop-types';
import { activeOpacity } from '../../constants/config';
import Avatar from '../common/Avatar';
class CommodityCard extends React.PureComponent {
  static propTypes = {
    type: PropTypes.number,
    prince: PropTypes.number,
    Title: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.String, PropTypes.object]),
    user_image: PropTypes.oneOfType([PropTypes.String, PropTypes.object]),
    Commodity_type: PropTypes.string,
    user_id: PropTypes.string,
    router: PropTypes.string,
  };
  static defaultProps = {
    type: 1, //1:案例 2.取消案例收藏 3.商品案例
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  Press = () => {
    NavigationHelper.navigate('CommodityDetail');
  };
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
      style,
    } = this.props;
    {
      /* type:3 -> 商品组件
       * type:2 -> 取消案例收藏组件
       * type:1(默认) ->案例组件
       */
    }

    // let dataImage = { uri: image };

    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={this.Press.bind(this)}
      >
        <View style={{ ...style }}>
          {this.props.type === 3 ? (
            <View style={styles.CommodityCard__typeThreeContainer}>
              <View style={styles.CommodityCard__shoppingImageBox}>
                <Image
                  source={image}
                  style={styles.CommodityCard__shoppingImage}
                />
              </View>
              <View style={styles.CommodityCard__typeThreeShoppingTitleBox}>
                <Text style={styles.CommodityCard__typeOThreeShoppingTitle}>
                  {Title}
                </Text>
              </View>
              <View style={{ marginTop: pxToDp(24) }}>
                <Text
                  style={{
                    color: '#FE9E0E',
                    fontSize: pxToDp(26),
                    marginBottom: pxToDp(38),
                  }}
                >
                  ¥{this.props.prince}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.CommodityCard__typeOneCaseBox}>
              {/*案例图片开始*/}
              <View>
                <ImageBackground
                  source={{
                    uri: image,
                  }}
                  style={{ width: pxToDp(325), height: pxToDp(325) }}
                >
                  <View style={styles.CommodityCard__typeOneTypeBox}>
                    <Text style={styles.CommodityCard__typeOneTpyeText}>
                      {this.props.Commodity_type}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              {/*案例图片结束*/}
              {/*案例描述开始*/}
              <View>
                <View style={styles.CommodityCard__typeOneTitleBox}>
                  <Text
                    styel={styles.CommodityCard__typeOneTitle}
                    numberOfLines={2}
                  >
                    {this.props.Title}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {/*用户头像开始*/}
                  <View style={styles.CommodityCard__typeOneUserImage}>
                    <Avatar
                      image={{ uri: user_image }}
                      size={50}
                      // source={require('../../asserts/images/CommodityCard_userImage.png')}
                      // styel={{ width: pxToDp(50), height: pxToDp(50) }}
                    />
                  </View>
                  {/*用户头像结束*/}
                  {this.props.type === 1 ? (
                    <View style={styles.CommodityCard__typeOneUserIdBox}>
                      <Text style={styles.CommodityCard__typeOneUserId}>
                        {this.props.user_id}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.CommodityCard__typeTwoBtnBox}>
                      <TouchableOpacity>
                        <Text style={styles.CommodityCard__typeTwoBtnText}>
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
      </TouchableOpacity>
    );
  }
}

export default CommodityCard;

const styles = StyleSheet.create({
  CommodityCard__typeThreeContainer: {
    width: pxToDp(330),
    // height: pxToDp(482),
    marginRight: pxToDp(20),
  },
  CommodityCard__shoppingImageBox: {
    width: pxToDp(330),
    height: pxToDp(300),
    borderRadius: pxToDp(10),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
    overflow: 'hidden',
  },
  CommodityCard__shoppingImage: { width: pxToDp(330), height: pxToDp(300) },
  CommodityCard__typeThreeShoppingTitleBox: {
    width: pxToDp(306),
    height: pxToDp(69),
    marginTop: pxToDp(25),
  },
  CommodityCard__typeOThreeShoppingTitle: { fontSize: pxToDp(30) },
  CommodityCard__typeOneCaseBox: {
    width: pxToDp(325),
    height: pxToDp(520),
    backgroundColor: '#FFFFFF',
    // marginRight: pxToDp(32),
    marginTop: pxToDp(30),
  },
  CommodityCard__typeOneTypeBox: {
    width: pxToDp(110),
    height: pxToDp(40),
    borderBottomRightRadius: pxToDp(20),
    borderTopRightRadius: pxToDp(20),
    backgroundColor: '#F1A23C',
    marginTop: pxToDp(20),
    justifyContent: 'center',
  },
  CommodityCard__typeOneTpyeText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: pxToDp(22),
  },
  CommodityCard__typeOneTitleBox: {
    width: pxToDp(325),
    height: pxToDp(68),
    // flexDirection: 'row',
    paddingLeft: pxToDp(9),
    marginTop: pxToDp(24),
  },
  CommodityCard__typeOneTitle: {
    fontSize: pxToDp(28),
    width: pxToDp(289),
    height: pxToDp(68),
  },
  CommodityCard__typeOneUserImage: {
    width: pxToDp(50),
    height: pxToDp(50),
    marginTop: pxToDp(24),
    marginLeft: pxToDp(9),
    borderRadius: pxToDp(25),
    backgroundColor: '#FE9E0E',
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
  },
  CommodityCard__typeOneUserIdBox: {
    marginTop: pxToDp(20),
    marginLeft: pxToDp(20),
  },
  CommodityCard__typeOneUserId: { fontSize: pxToDp(24), color: '#999999' },
  CommodityCard__typeTwoBtnBox: {
    width: pxToDp(120),
    height: pxToDp(46),
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    marginTop: pxToDp(27),
    marginLeft: pxToDp(125),
  },
  CommodityCard__typeTwoBtnText: {
    color: '#999999',
    fontSize: pxToDp(22),
    textAlign: 'center',
  },
});

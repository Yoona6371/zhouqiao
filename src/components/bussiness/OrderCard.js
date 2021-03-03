import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import PropTypes from 'prop-types';
import { fontStyle } from '../../utils/StyleUtils';
{
  /*
   *评价中心 需要传参需要配套，btnText=立即评价，topStatus=待评价，type传2
   *退货售后 需要传参需要配套，btnText=查看进度，topStatus=售后声请，type传2
   *订单列表 type为1，默认是1
   */
}
class OrderCard extends React.Component {
  static navigationOptions = { title: null };
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    type: PropTypes.number,
    isUrgent: PropTypes.bool,
    OrderCardImage: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    OrderCardNumber: PropTypes.string,
    OrderCardType: PropTypes.string,
    OrderCardTitle: PropTypes.string,
    OrderCardPrince: PropTypes.number,
    shoppingNumber: PropTypes.number,
    btnText: PropTypes.string,
    topStatus: PropTypes.string,
  };
  static defaultProps = {
    type: 1,
    isUrgent: true,
    OrderCardNumber: '66666',
    OrderCardType: '叫爸爸',
    OrderCardTitle:
      '这是我的买卖，快快花十个亿买走吧快快花十个亿买走吧快快花十个亿买走吧快快花十个亿买走吧快快花十个亿买走吧',
    OrderCardPrince: 6666,
    // btnText: '222',
    // topStatus: 'asd',
    shoppingNumber: 1,
  };
  render() {
    const {
      type,
      isUrgent,
      OrderCardNumber,
      OrderCardTitle,
      OrderCardPrince,
      // OrderCardType,
      // OrderCardImage,
      btnText,
      topStatus,
      shoppingNumber,
      imgUri,
      onpressRight,
      onpressLeft
    } = this.props;
    return (
      <View style={{ ...styles.OrderCard_box, ...this.props.style }}>
        {/*订单卡片开始*/}
        <View>
          {/*订单上部开始*/}
          <View style={styles.OrderCard_topBox}>
            <View style={styles.Order_numberBox}>
              <Text style={styles.Order_number}>订单号：{OrderCardNumber}</Text>
            </View>
            <View style={styles.Order_statusBox}>
              <Text
                style={{
                  ...styles.Order_status,
                  ...(type === 2 ? { color: '#FE9E0EFF' } : null),
                }}
              >
                {type === 1 ? '待付款' : topStatus}
              </Text>
            </View>
          </View>
          {/*订单上部结束*/}
          {/*订单图片部分开始*/}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ImageBackground
              source={{ uri: imgUri }}
              style={styles.Order_imgBox}
            >
              {/* <View style={styles.Order_typeBox}>
                <Text style={styles.Order_typeText}>{OrderCardType}</Text>
              </View> */}
              {isUrgent === true ? (
                <View style={styles.Urgent_box}>
                  <Text style={styles.Urgent_text}>加急</Text>
                </View>
              ) : (
                  <View>
                    <Text />
                  </View>
                )}
            </ImageBackground>
          </View>
          {/*订单图片部分结束*/}
        </View>
        {/*订单下部开始*/}
        <View>
          {/*订单标题开始*/}
          <View style={styles.OrderCard_titleBox}>
            <Text style={styles.OrderCard_titleText} numberOfLines={2}>
              {OrderCardTitle}
            </Text>
          </View>
          {/*订单标题结束*/}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/*订单价格开始*/}
            <View style={styles.OrderCard_moneyBox}>
              <Text style={styles.OrderCard_moneyText}>
                ￥{OrderCardPrince}
              </Text>
            </View>
            <View>
              <Text style={{ ...fontStyle(24, 26, 26, 'normal', '#999999FF') }}>
                X {shoppingNumber}
              </Text>
            </View>
            {/*订单价格结束*/}
          </View>

          {/*底部按钮一栏开始*/}
          <View style={styles.bottom_box}>
            {type === 1 ? (
              <View>
                <Text>
                  应付款{' '}
                  <Text style={styles.payableMoney}>
                    ￥{OrderCardPrince * shoppingNumber}
                  </Text>
                </Text>
              </View>
            ) : (
                <View />
              )}

            {/*取消订单按钮开始*/}
            {type === 1 ? (
              <TouchableOpacity
                onPress={onpressRight}
              >
                <View style={styles.cancellation_box}>
                  <Text style={styles.cancellation_text}>取消订单</Text>
                </View>
              </TouchableOpacity>
            ) : (
                <View />
              )}
            <TouchableOpacity
              onPress={onpressLeft}
            >
              <View
                style={{
                  ...styles.payment_box,
                  ...{ marginLeft: type === 1 ? pxToDp(30) : pxToDp(460) },
                }}
              >
                <Text style={styles.payment_text}>
                  {type === 1 ? '立即支付' : btnText}
                </Text>
              </View>
            </TouchableOpacity>
            {/*支付按钮结束*/}
          </View>
          {/*底部按钮预览结束*/}
        </View>
        {/*订单下部结束*/}
        {/*订单卡片结束*/}
      </View>
    );
  }
}

export default OrderCard;

const styles = StyleSheet.create({
  OrderCard_box: {
    width: pxToDp(690),
    height: pxToDp(648),
    backgroundColor: '#FFFFFFFF',
  },
  OrderCard_topBox: {
    width: pxToDp(690),
    height: pxToDp(94),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Order_numberBox: {
    marginTop: pxToDp(33),
    marginLeft: pxToDp(30),
  },
  Order_number: {
    ...fontStyle(28, 30, 30, 'bold', '#333333FF'),
  },
  Order_statusBox: {
    marginTop: pxToDp(34),
    marginRight: pxToDp(31),
  },
  Order_status: {
    ...fontStyle(28, 30, 30, 'bold', '#F54949FF'),
  },
  Order_imgBox: {
    width: pxToDp(630),
    height: pxToDp(260),
    position: 'relative',
  },
  Order_typeBox: {
    width: pxToDp(133),
    height: pxToDp(35),
    backgroundColor: '#FF9900FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: pxToDp(20),
    position: 'absolute',
    top: pxToDp(0),
    left: pxToDp(0),
  },
  Order_typeText: {
    ...fontStyle(24, 26, 26, 'normal', '#FFFFFF'),
  },
  Urgent_box: {
    position: 'absolute',
    top: pxToDp(10),
    right: pxToDp(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: pxToDp(86),
    height: pxToDp(36),
    backgroundColor: '#FF4B4EFF',
    borderRadius: pxToDp(10),
  },
  Urgent_text: {
    ...fontStyle(23, 25, 25, 'normal', '#FFFFFF'),
  },
  OrderCard_titleBox: {
    width: pxToDp(630),
    height: pxToDp(75),
    justifyContent: 'center',
    marginLeft: pxToDp(30),
    marginTop: pxToDp(18),
    // display: 'flex',
  },
  OrderCard_titleText: {
    width: pxToDp(630),
    ...fontStyle(30, 75, 36, 'bold', '#222222FF'),
  },
  OrderCard_moneyBox: {
    marginLeft: pxToDp(30),
    marginTop: pxToDp(27),
  },
  OrderCard_moneyText: {
    ...fontStyle(36, 38, 38, 'bold', '#F54949FF'),
  },
  bottom_box: {
    flexDirection: 'row',
    marginTop: pxToDp(40),
    marginLeft: pxToDp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancellation_box: {
    width: pxToDp(172),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    borderColor: '#999999FF',
    borderStyle: 'solid',
    marginLeft: pxToDp(67),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: pxToDp(1),
  },
  payableMoney: {
    ...fontStyle(26, 28, 28, 'bold', '#F54949FF'),
  },
  cancellation_text: {
    ...fontStyle(26, 28, 28, 'normal', '#666666FF'),
  },
  payment_box: {
    width: pxToDp(172),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    borderColor: '#FE9E0EFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: pxToDp(1),
    marginLeft: pxToDp(30),
  },
  payment_text: {
    ...fontStyle(27, 29, 29, 'normal', '#FE9E0EFF'),
  },
});

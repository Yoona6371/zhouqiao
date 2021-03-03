import * as WeChat from 'react-native-wechat-lib';
import toast from '../components/common/Toast/Toast';

const shareOptions = {
  title: 'playground',
  description: '微信分享测试',
  thumbImage: 'https://i.loli.net/2019/09/03/62FauzAY37gsEXV.png',
  type: 'news',
  webpageUrl: 'https://github.com/little-snow-fox/react-native-wechat-lib',
};

export const handleOpenApp = async (isOpen) => {
  if (isOpen) {
    return WeChat.openWXApp();
  } else {
    alert('没有安装微信，请安装之后重试');
  }
};

/*
{
    partnerId {String} 商家向财付通申请的商家 ID
    prepayId {String} 预支付订单 ID
    nonceStr {String} 随机串
    timeStamp {String} 时间戳
    package {String} 商家根据财付通文档填写的数据和签名
    sign {String} 商家根据微信开放平台文档对数据做的签名
  }
 */

export const handlePayment = async (isOpen, payload) => {
  if (isOpen) {
    const { partnerId, prepayId, nonceStr, timeStamp, sign } = payload;
    console.log(payload);
    WeChat.pay({
      partnerId: partnerId, // 商家向财付通申请的商家id
      prepayId: prepayId, // 预支付订单
      nonceStr: nonceStr, // 随机串，防重发
      timeStamp: timeStamp, // 时间戳，防重发.
      package: 'Sign=WXPay', // 商家根据财付通文档填写的数据和签名
      sign: sign, // 商家根据微信开放平台文档对数据做的签名
    })
      .then((requestJson) => {
        //支付成功回调
        alert(123);
        if (requestJson.errCode == '0') {
          //回调成功处理
          console.log('支付成功');
        }
      })
      .catch((err) => {
        alert('支付失败');
      });
  } else {
    alert('没有安装微信，请安装之后重试');
  }
};

/*
微信好友分享的文本
 */
export const handleShareToSession = (isInstall) => {
  if (isInstall) {
    WeChat.shareText({
      text: 'Text content.',
      scene: 0,
    }).catch((e) => alert(e));
  } else {
    alert('没有安装微信，请安装之后重试');
  }
};

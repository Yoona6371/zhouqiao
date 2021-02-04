import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import TopTitle from '../../../../components/common/TopTitle';
import { pxToDp } from '../../../../utils/pxToDp';
import { ScrollView } from 'react-native-gesture-handler';
export class detail extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
          flex: 1,
        }}
      >
        <TopTitle title="隐私协议" showBtn={false} />
        <ScrollView>
          <View style={styles.border}>
            <Text style={styles.title}>用户使用隐私协议</Text>
            <Text style={styles.date}>2020-01-21 11:51:36</Text>
            <View style={styles.line} />
            <Text style={styles.contents}>
              1、如果客户端发现或收到他人举报或投诉用户违反本协议约定的，客户端有权不经通知随时对相关内容，包括但不限于用户资料、发贴记录进行审查、删除，并视情节轻重对违规账号处以包括但不限于警告、账号封禁、设备封禁、功能封禁的处罚，且通知用户处理结果。
            </Text>
            <Text style={styles.contents}>
              2、因违反用户协议被封禁的用户，可以自行与客户端联系。其中，被实施功能封禁的用户会在封禁期届满后自动恢复被封禁功能。被封禁用户可提交申诉，客户端将对申诉进行审查，并自行合理判断决定是否变更处罚措施。{' '}
            </Text>
            <Text style={styles.contents}>
              3、用户理解并同意，客户端有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何用户采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，用户应承担由此而产生的一切法律责任。
            </Text>
            <Text style={styles.contents}>
              4、用户理解并同意，因用户违反本协议约定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，用户应当赔偿客户端与合作公司、关联公司，并使之
            </Text>
            <Text style={styles.contents}>
              4、用户理解并同意，因用户违反本协议约定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，用户应当赔偿客户端与合作公司、关联公司，并使之
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    borderColor: '#000',
    borderRadius: 0.5,
    height: 1,
    borderWidth: 1,
    borderStyle: 'dotted',
    marginTop: pxToDp(20),
  },
  title: {
    fontSize: pxToDp(34),
    fontWeight: 'bold',
    color: '#333333',
    marginTop: pxToDp(36),
  },
  border: {
    // paddingLeft:pxToDp(30),
    // paddingRight:pxToDp(30)
    width: '90%',
    alignSelf: 'center',
  },
  date: {
    fontSize: pxToDp(24),
    fontWeight: '500',
    color: '#888888',
    marginTop: pxToDp(29),
  },
  img: {
    marginTop: pxToDp(36),
    width: '100%',
    height: pxToDp(2),
  },
  contents: {
    fontSize: pxToDp(26),
    fontWeight: '500',
    color: '#666666',
    lineHeight: pxToDp(48),
    marginTop: pxToDp(46),
  },
});
export default detail;

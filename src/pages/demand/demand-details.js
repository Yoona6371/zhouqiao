import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DemandCard from '../../components/bussiness/demandCard';
import Icon from '../../components/common/Icon';
import { flexRowCenter, fontStyle } from '../../utils/StyleUtils';
import { pxToDp } from '../../utils/pxToDp';
import LabelCard from '../../components/bussiness/labelCard';
import { Image } from 'react-native-svg';
import TopTitle from '../../components/common/TopTitle';
class DemandDetails extends Component {
  constructor(props) {
    super(props);
  }
  returnBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TopTitle
          title={'需求详情'}
          returnBack={this.returnBack.bind(this)}
          showBtn={false}
        />
        <ScrollView style={{ backgroundColor: '#fff', paddingTop: pxToDp(20) }}>
          {/*demand卡片开始*/}
          <DemandCard
            type={1}
            project_contacts={'冯泽明'}
            project_budget={666}
            project_escrow={555}
            project_describe={
              '拼页面，拼页面，我就是要拼页面，我就是要拼页面，我就是要拼页面，我就是要拼页面我就是要拼页面'
            }
            project_Title={'冯泽明的需求详情'}
          />
          {/*demand卡片结束*/}
          {/*中间的盒子开始*/}
          <View
            style={{
              flexDirection: 'row',
              marginTop: pxToDp(59),
              marginLeft: pxToDp(31),
              position: 'relative',
            }}
          >
            {/*盒子左边部分开始*/}
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Text style={styles.demandBox_titleTxt}>需求详情</Text>
                </View>
                <View>
                  <Text style={styles.demandBox_dataText}>2021-01-22发布</Text>
                </View>
              </View>
              <View style={{ marginTop: pxToDp(29) }}>
                <LabelCard typeText={'叫爸爸'} />
              </View>
            </View>
            {/*盒子左边部分结束*/}
            {/*盒子右边-》附件部分开始*/}
            <TouchableOpacity style={styles.enclosure_btn}>
              <Icon
                name={'telUpdate'}
                style={{
                  color: '#fff',
                  fontSize: pxToDp(20),
                  paddingRight: pxToDp(10),
                }}
              />
              <Text style={styles.enclosure_btnText}>查看附件</Text>
            </TouchableOpacity>
            {/*盒子右边-》附件部分结束*/}
          </View>
          {/*中间的盒子结束*/}
          {/*长描述文本开始*/}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: pxToDp(40),
            }}
          >
            <View
              style={{
                width: pxToDp(683),
                height: pxToDp(224),
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              <Text
                style={{
                  color: '#666666FF',
                  fontSize: pxToDp(24),
                  lineHeight: pxToDp(40),
                }}
              >
                {'      '}开发具有较高的通用性。无论是前端渲染的单页面应用
                ,还是后端模板渲染的多页面应用，组件化开发的概念都
                能适用。组件化开发具有较高的通用性。无论是前端渲染的单页面应用还是后端
                模板渲染的多页面应用，组件化开发的概念都能适用组件化开发
                具有较高的通用性。无论是前端渲染的单页面应用，还是后端模板渲染的多页面应用，组件化开发。
              </Text>
            </View>
          </View>
          {/*长描述文本结束*/}
          {/*底部图片开始*/}
          <View
            style={{
              marginTop: pxToDp(30),
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: pxToDp(8),
            }}
          >
            <View
              style={{
                width: pxToDp(690),
                height: pxToDp(300),
                // backgroundColor: 'red',
              }}
            >
              <Image />
            </View>
          </View>
          {/*底部图片结束*/}
          {/*底部按钮开始*/}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: pxToDp(166),
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.replace('myDemand')}
            >
              <View style={styles.bottom_btn}>
                <Text style={{ color: '#FFFFFF' }}>确定</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/*底部按钮结束*/}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  demandBox_titleTxt: {
    ...fontStyle(32, 36, 36, 'bold', '#1B2439FF'),
  },
  demandBox_dataText: {
    ...fontStyle(24, 26, 26, 'normal', '#5F6575FF'),
    marginTop: pxToDp(10),
    marginLeft: pxToDp(39),
  },
  enclosure_btn: {
    ...flexRowCenter,
    width: pxToDp(167),
    height: pxToDp(50),
    backgroundColor: '#FE9E0EFF',
    borderRadius: pxToDp(25),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(253,128,10,0.3)',
    shadowOpacity: pxToDp(8),
    position: 'absolute',
    right: pxToDp(30),
    top: pxToDp(30),
  },
  enclosure_btnText: {
    ...fontStyle(24, 26, 26, 'normal', '#FFFFFF'),
  },
  long_text: {
    ...fontStyle(24, 26, 26, 'normal', '#666666FF'),
  },
  bottom_btn: {
    width: pxToDp(690),
    height: pxToDp(88),
    borderRadius: pxToDp(44),
    backgroundColor: '#FE9E0EFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pxToDp(96),
  },
});
export default DemandDetails;

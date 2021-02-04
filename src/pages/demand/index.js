import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { deviceWidthDp, pxToDp } from '../../utils/pxToDp';
import LinearGradient from 'react-native-linear-gradient';
import { fontStyle, margin } from '../../utils/StyleUtils';
import Icon from '../../components/common/Icon';
import DemandInput from '../../components/bussiness/DemandInput';
import { TextInput } from 'react-native-gesture-handler';
import TopTitle from '../../components/common/TopTitle';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_1: [
        {
          title: '预算金额',
          tips: '请输入预算金额(元)',
          type: 0,
        },
        {
          title: '项目周期',
          tips: '请输入项目周期',
          type: 0,
        },
        {
          title: '是否加急',
          type: 4,
          last: true,
        },
      ],
      list_2: [
        {
          title: '联系电话',
          tips: '请输入联系电话',
          type: 0,
        },
        {
          title: '联系人',
          tips: '请选择类别',
          type: 1,
        },
        {
          title: '类别',
          tips: '请选择类别',
          type: 1,
          last: true,
        },
      ],
      list_3: [
        {
          title: '订单名字',
          tips: '请输入订单名字',
          type: 3,
        },
        {
          title: '附件',
          hint: '(非必须)',
          type: 2,
        },
        {
          title: '图片',
          hint: '(非必须)',
          type: 5,
          last: true,
        },
      ],
      images: [],
      textLength: 0,
      bgColor: 'transparent',
      color: '#fff',
    };
  }
  titleFixed = (e) => {
    if (e.nativeEvent.contentOffset.y > 30) {
      this.setState({ bgColor: '#feaa2c' });
    } else {
      this.setState({ bgColor: 'transparent' });
    }
  };
  render() {
    const { list_1, list_2, list_3, images, textLength, bgColor } = this.state;
    return (
      <ScrollView stickyHeaderIndices={[0]} onScroll={this.titleFixed}>
        <TopTitle
          title="发布需求"
          showBtn={false}
          bgColor={bgColor}
          color={'#fff'}
        />
        <ImageBackground
          style={styles.title_background}
          source={require('../../asserts/images/demand_back.png')}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#ffb340', 'transparent']}
            style={styles.title}
          >
            <Icon name={'editor2'} style={styles.title_icon} />
            <Text style={styles.title_text}>公益活动设计项目</Text>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.basicInfo}>
          <Image
            source={require('../../asserts/images/demand_backLeft.png')}
            style={styles.basicInfo_left}
          />
          <Image
            source={require('../../asserts/images/demand_backRight.png')}
            style={styles.basicInfo_right}
          />
          {list_1.map((v, i) => (
            <DemandInput
              key={i}
              type={v.type}
              title={v.title}
              tips={v.tips}
              last={v.last}
            />
          ))}
        </View>
        <View style={styles.persionalInfo}>
          {list_2.map((v, i) => (
            <DemandInput
              key={i}
              type={v.type}
              title={v.title}
              tips={v.tips}
              last={v.last}
            />
          ))}
        </View>
        <View style={styles.specificInfo}>
          {list_3.map((v, i) => (
            <DemandInput
              key={i}
              type={v.type}
              title={v.title}
              hint={v.hint}
              tips={v.tips}
              last={v.last}
            />
          ))}
          <View style={styles.picture}>
            {images.map((v, i) => (
              <Image
                key={i}
                source={{ uri: v.url }}
                style={{
                  width: pxToDp(140),
                  height: pxToDp(120),
                  marginRight: pxToDp(20),
                  marginBottom: pxToDp(30),
                }}
              />
            ))}
            <TouchableOpacity>
              <Icon
                name={'camera'}
                style={{
                  width: pxToDp(140),
                  height: pxToDp(120),
                  backgroundColor: '#f0eeeb',
                  lineHeight: pxToDp(120),
                  textAlign: 'center',
                  marginBottom: pxToDp(30),
                  color: '#b9b6b1',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detailInfo}>
          <DemandInput title={'详细信息'} type={5} last={true} />
          <TextInput
            style={styles.detail}
            multiline={true}
            maxLength={300}
            textAlignVertical={'top'}
            placeholder={'\ue639 请输入详细信息'}
            placeholderTextColor="#999"
            onChangeText={(e) => {
              this.setState({ textLength: e.length });
            }}
          />
          <Text style={styles.textLengthLimit}>{textLength}/300</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#fe9e0e', '#fd7609']}
            style={styles.button_linear}
          >
            <TouchableOpacity
              onPress={() => {
                NavigationHelper.navigate('DemandDetails');
              }}
            >
              <Text style={styles.button_text}>确认发布</Text>
            </TouchableOpacity>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title_background: {
    width: deviceWidthDp,
    height: pxToDp(421),
    marginTop: pxToDp(-178),
  },
  title: {
    ...margin(30, 188, 30, 0),
    height: pxToDp(83),
    flexDirection: 'row',
  },
  title_icon: {
    color: '#fff',
    width: pxToDp(28),
    height: pxToDp(26),
    alignSelf: 'center',
    ...margin(30, 0, 13, 0),
  },
  title_text: {
    ...fontStyle(28, 30, 30, '800', '#fff'),
    alignSelf: 'center',
  },
  basicInfo: {
    position: 'relative',
    ...margin(30, -100, 30, 0),
    height: pxToDp(320),
    borderRadius: pxToDp(20),
    backgroundColor: '#fff',
  },
  basicInfo_left: {
    position: 'absolute',
    width: pxToDp(243),
    height: pxToDp(53),
  },
  basicInfo_right: {
    position: 'absolute',
    right: 0,
    width: pxToDp(272),
    height: pxToDp(224),
  },
  persionalInfo: {
    ...margin(30, 20, 30, 0),
    height: pxToDp(320),
    backgroundColor: '#fff',
    borderRadius: pxToDp(20),
  },
  specificInfo: {
    ...margin(30, 20, 30, 0),
    // height: pxToDp(507),
    backgroundColor: '#fff',
    borderRadius: pxToDp(20),
    paddingBottom: pxToDp(30),
  },
  picture: {
    flexDirection: 'row',
    ...margin(30, 0, 30, 0),
    width: pxToDp(630),
    flexWrap: 'wrap',
  },
  detailInfo: {
    ...margin(30, 20, 30, 0),
    backgroundColor: '#fff',
    position: 'relative',
  },
  detail: {
    ...margin(30, 0, 30, 60),
    height: pxToDp(317),
    fontFamily: 'iconfont',
    borderRadius: pxToDp(16),
    backgroundColor: '#f8f8f8',
  },
  textLengthLimit: {
    color: '#999',
    position: 'absolute',
    right: pxToDp(52),
    top: pxToDp(380),
  },
  button: {
    ...margin(30, 100, 30, 156),
  },
  button_linear: {
    height: pxToDp(88),
    borderRadius: pxToDp(44),
  },
  button_text: {
    ...fontStyle(28, 88, 88, 'bold', '#fff', 'center'),
  },
});
export default Index;

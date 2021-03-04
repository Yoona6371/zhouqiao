import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  DeviceEventEmitter,
} from 'react-native';
import { deviceWidthDp, pxToDp } from '../../utils/pxToDp';
import LinearGradient from 'react-native-linear-gradient';
import { fontStyle, margin } from '../../utils/StyleUtils';
import Icon from '../../components/common/Icon';
import DemandInput from '../../components/bussiness/DemandInput';
import { TextInput } from 'react-native-gesture-handler';
import Toast from '../../components/common/Toast/Toast';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      titleOpacity: new Animated.Value(0),
      list_1: [
        {
          title: '预算金额',
          tips: '预算金额(元)，默认屏蔽单位',
          type: 0,
          input:
            this.props.route.params !== undefined
              ? props.route.params.expectedPrice.toString()
              : undefined,
          inputUpdate: (data) => {
            // console.log(data);
            this.setState({
              data: {
                ...this.state.data,
                expectedPrice: parseInt(data),
              },
            });
          },
        },
        {
          title: '项目周期',
          tips: '项目周期(天)，默认屏蔽单位',
          type: 0,
          input:
            this.props.route.params !== undefined
              ? props.route.params.expectedTime.toString()
              : undefined,
          inputUpdate: (data) => {
            this.setState({
              data: {
                ...this.state.data,
                expectedTime: parseInt(data),
              },
            });
          },
        },
        {
          title: '是否加急',
          type: 4,
          last: true,
          urgent:
            this.props.route.params !== undefined
              ? props.route.params.urgent
              : undefined,
          inputUpdate: (data) => {
            this.setState({
              data: {
                ...this.state.data,
                urgent: data,
              },
            });
          },
        },
      ],
      list_2: [
        {
          title: '聊天人数',
          tips: '最大可以聊天人数，上限8，默认2',
          type: 0,
          input:
            this.props.route.params !== undefined
              ? props.route.params.communityNumber.toString()
              : undefined,
          inputUpdate: (data) => {
            if (data > 8) {
              data = 8;
            }
            this.setState({
              data: {
                ...this.state.data,
                communityNumber: parseInt(data),
              },
            });
          },
        },
        {
          title: '面向设计',
          tips: '请选择类别 新手/老手 默认新手',
          type: 1,
          category: 1,
          option:
            this.props.route.params !== undefined
              ? props.route.params.proficiency
              : undefined,
          inputUpdate: (data) => {
            this.setState({
              data: {
                ...this.state.data,
                proficiency: data,
              },
            });
          },
        },
        {
          title: '类别',
          tips: '请选择类别',
          type: 1,
          category: 2,
          last: true,
          option:
            this.props.route.params !== undefined
              ? props.route.params.categoryId + 1
              : undefined,
          inputUpdate: (data) => {
            // console.log(data);
            this.setState({
              data: {
                ...this.state.data,
                categoryId: data - 1,
              },
            });
          },
        },
      ],
      list_3: [
        {
          title: '订单名字',
          tips: '请输入订单名字',
          type: 3,
          input:
            this.props.route.params !== undefined
              ? props.route.params.requirementTitle
              : undefined,
          inputUpdate: (data) => {
            this.setState({
              data: {
                ...this.state.data,
                requirementTitle: data,
              },
            });
          },
        },
        {
          title: '附件',
          hint: '(非必须)',
          type: 2,
          last: true,
          category: 3,
        },
        // {
        //   title: '图片',
        //   hint: '(非必须)',
        //   type: 5,
        //   last: true,
        // },
      ],
      images: [],
      textLength: 0,
      bgColor: 'transparent',
      color: '#fff',

      // 提交数据
      // 赋默认值
      data: {
        urgent: 0,
        communityNumber: 2,
        requirementContent:
          this.props.route.params !== undefined
            ? this.props.route.params.requirementContent
            : undefined,
      },
    };
  }

  titleFixed = () => {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: [0, 100, 200],
      outputRange: [0, 0.5, 1],
      extrapolate: 'clamp',
    });
  };

  demandSet = () => {
    if (
      this.Toast_number(this.state.data.expectedPrice, '预算金额') &&
      this.Toast_number(this.state.data.expectedTime, '项目周期') &&
      this.Toast_number(this.state.data.categoryId, '需求类别') &&
      this.Toast_text(this.state.data.requirementTitle, '订单名称') &&
      this.Toast_text(this.state.data.requirementContent, '详细信息')
    ) {
      if (this.props.route.params !== undefined) {
        Http.demandUpdate(
          this.state.data,
          '/' + this.props.route.params.requirementId,
        ).then((res) => {
          if (res.status === 200) {
            NavigationHelper.goBack();
          }
        });
      } else {
        Http.demandSet(this.state.data).then((res) => {
          if (res.status === 200) {
            NavigationHelper.navigate('DemandDetails');
            DeviceEventEmitter.emit('EventType');
          }
        });
      }
    }
  };

  Toast_number = (data, text) => {
    if (data === undefined) {
      Toast.fail(`${text}不能为空`);
    } else if (data <= 0) {
      Toast.fail('请输入有效数据');
    } else {
      return true;
    }
  };
  Toast_text = (data, text) => {
    console.log(data);
    if (data === undefined) {
      Toast.fail(`${text}不能为空`);
    } else {
      return true;
    }
  };

  render() {
    const { list_1, list_2, list_3, textLength } = this.state;
    const opacity_title = this.titleFixed();
    let list = ['asd', 'asd'];
    return (
      <ScrollView
        stickyHeaderIndices={[0, 1]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        <Animated.View
          style={{
            height: pxToDp(138),
            opacity: opacity_title,
            backgroundColor: '#FE990D',
            width: '100%',
            position: 'relative',
          }}
        />
        <Text
          style={{
            alignSelf: 'center',
            paddingTop: pxToDp(80),
            position: 'absolute',
          }}
        >
          <Text style={{ ...fontStyle(34, 36, 36, 'bold'), color: '#fff' }}>
            发布需求
          </Text>
        </Text>
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
              inputUpdate={v.inputUpdate}
              input={v.input}
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
              inputUpdate={v.inputUpdate}
              category={v.category}
              input={v.input}
              option={v.option}
            />
          ))}
        </View>
        <View style={styles.specificInfo}>
          {list_3.map((v, i) => (
            <DemandInput
              key={i}
              input={v.input}
              type={v.type}
              title={v.title}
              hint={v.hint}
              tips={v.tips}
              last={v.last}
              inputUpdate={v.inputUpdate}
              category={v.category}
            />
          ))}
          {/*<View style={styles.picture}>*/}
          {/*{images.map((v, i) => (*/}
          {/*  <Image*/}
          {/*    key={i}*/}
          {/*    source={{ uri: v.url }}*/}
          {/*    style={{*/}
          {/*      width: pxToDp(140),*/}
          {/*      height: pxToDp(120),*/}
          {/*      marginRight: pxToDp(20),*/}
          {/*      marginBottom: pxToDp(30),*/}
          {/*    }}*/}
          {/*  />*/}
          {/*))}*/}
          {/*<TouchableOpacity>*/}
          {/*  <Icon*/}
          {/*    name={'camera'}*/}
          {/*    style={{*/}
          {/*      width: pxToDp(140),*/}
          {/*      height: pxToDp(120),*/}
          {/*      backgroundColor: '#f0eeeb',*/}
          {/*      lineHeight: pxToDp(120),*/}
          {/*      textAlign: 'center',*/}
          {/*      marginBottom: pxToDp(30),*/}
          {/*      color: '#b9b6b1',*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</TouchableOpacity>*/}
          {/*</View>*/}
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
            value={this.state.data.requirementContent}
            onChangeText={(e) => {
              this.setState({
                textLength: e.length,
                data: {
                  ...this.state.data,
                  requirementContent: e,
                  requirementContentHtml: e + ' ',
                },
              });
            }}
          />
          <Text style={styles.textLengthLimit}>{textLength}/300</Text>
        </View>
        <View style={styles.button}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#fe9e0e', '#fd7609']}
            style={styles.button_linear}
          >
            <TouchableOpacity onPress={this.demandSet}>
              <Text style={styles.button_text}>确认发布</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title__wrap: {},
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
    ...margin(30, 100, 30, 100),
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

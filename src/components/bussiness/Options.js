import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../common/Icon';
import { file } from '../../constants/svg';
import Svg from 'react-native-svg-uri';
import { pxToDp } from '../../utils/pxToDp';
import { fontStyle, padding, margin } from '../../utils/StyleUtils';
import LinearGradient from 'react-native-linear-gradient';
import Avatar from '../common/Avatar';
import Picker from 'react-native-picker';
import DocumentPicker from 'react-native-document-picker';
import Overlay from '../common/Overlay/Overlay';
import DatePicker from 'react-native-datepicker';
import Toast from '../common/Toast/Toast';
import axios from 'axios';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday: '',
      introduction: '',
      gender: '',
      nickName: '',
      userAvatar: '',
      mobile: '',
      verifyCode: '',
      userInfo: {},
    };
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    svg: PropTypes.string,
    text_left: PropTypes.string,
    text_right: PropTypes.string,
    text: PropTypes.string,
    router: PropTypes.string,
    colors: PropTypes.array,
    text_more_status: PropTypes.bool,
    image: PropTypes.string,
  };

  dataEdit = async () => {
    if (this.props.option === 1) {
      Picker.hide();
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        let formData = new FormData();
        formData.append('file', res);
        formData.append('type', 0);
        axios
          .post('http://www.zhouqiao.art:8080/api/resource/file', formData, {
            headers: {
              Authorization: `Bearer ${this.props.RootStore.userStore.allData.accessToken}`,
            },
          })
          .then((res) => {
            if (res.data.code === 0) {
              Toast.success('上传成功');
            }
          });
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('cancleErr', err);
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
    } else if (this.props.option === 2) {
      let overlayView = (
        <Overlay.PullView side="bottom" modal={false}>
          <View style={styles.textSet__wrap}>
            <View style={{ flexDirection: 'row', marginTop: pxToDp(20) }}>
              <Text style={styles.textSet_text}>
                {this.props.detail === 0
                  ? '请输入昵称：'
                  : this.props.detail === 1
                  ? '请输入个性签名：'
                  : '请输入'}
              </Text>
              <TextInput
                placeholder="请输入"
                onChangeText={(e) => {
                  this.props.nick
                    ? this.setState({ nickName: e })
                    : this.setState({ introduction: e });
                }}
                style={styles.textSet_input}
              />
            </View>
            <TouchableOpacity onPress={this.infoSet}>
              <Text style={styles.textSet_button}>确定修改</Text>
            </TouchableOpacity>
          </View>
        </Overlay.PullView>
      );
      Overlay.show(overlayView);
    } else if (this.props.option === 3) {
      Picker.init({
        pickerData: ['男', '女'],
        pickerConfirmBtnText: '确定',
        pickerConfirmBtnColor: [254, 158, 14, 1],
        pickerCancelBtnColor: [254, 158, 14, 1],
        pickerCancelBtnText: '取消',
        pickerTitleText: '选择类别',
        pickerToolBarBg: [255, 255, 255, 1],
        pickerBg: [255, 255, 255, 1],
        onPickerConfirm: (data) => {
          data === '男'
            ? this.setState({ gender: 0 })
            : this.setState({ gender: 1 });
          this.infoSet();
        },
      });
      Picker.show();
    } else if (this.props.option === 6) {
      let overlayView = (
        <Overlay.PullView side="bottom" modal={false}>
          <View style={{ ...styles.textSet__wrap, minHeight: pxToDp(500) }}>
            <Text
              style={{
                ...fontStyle(34, 36, 36, 'bold', '#333', 'left'),
                ...margin(30, 20, 0, 10),
              }}
            >
              我当前绑定的手机号码：
            </Text>
            <Text style={{ ...fontStyle(46, 48, 48, '500', '#888', 'center') }}>
              {this.props.info.mobile}
            </Text>
            <TextInput
              placeholder={'请输入手机号码'}
              onChangeText={(e) => this.setState({ mobile: e })}
            />
            <Text onPress={this.verifyCodeRequest}>获取验证码</Text>
            <TextInput
              placeholder={'验证码'}
              onChangeText={(e) => {
                this.setState({ verifyCode: e });
              }}
            />
            <Text onPress={this.mobileSet}>确认修改</Text>
          </View>
        </Overlay.PullView>
      );
      Overlay.show(overlayView);
    } else if (this.props.option === 0) {
      NavigationHelper.resetTo('LoginAndRegister');
    } else {
      const res = await Http.getMyInfo();
      const userInfo = res.data.data;
      // console.log(res);
      this.setState({
        userInfo,
      });
      NavigationHelper.navigate(this.props.router, {
        userAvatar: this.state.userInfo.userAvatar,
        nickName: this.state.userInfo.nickName,
        gender: this.state.userInfo.gender,
        introduction: this.state.userInfo.introduction,
        birthday: this.state.userInfo.birthday,
        mobile: this.state.userInfo.mobile,
      });
    }
  };

  infoSet = () => {
    let data = {
      birthday: this.state.birthday,
      introduction: this.state.introduction,
      gender: this.state.gender,
      nickName: this.state.nickName,
      userAvatar: this.state.userAvatar,
    };
    Http.infoSet(data).then((res) => {
      if (res.status === 200) {
        Toast.success(res.data.msg, 1000, 'center');
      } else {
        Toast.fail(res.data.msg, 1000, 'center');
      }
    });
  };

  //申请验证码
  verifyCodeRequest = () => {
    Http.getVerifyCode({ code: 3, mobile: this.state.mobile }).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        Toast.success(res.data.msg, 1000, 'center');
      } else {
        Toast.fail(res.data.msg, 1000, 'center');
      }
    });
  };

  mobileSet = () => {
    Http.mobileSet({
      mobile: this.state.mobile,
      verifyCode: this.state.verifyCode,
    }).then((res) => {
      if (res.status === 200) {
        Toast.success(res.data.msg, 1000, 'center');
      } else {
        Toast.fail(res.data.msg, 1000, 'center');
      }
    });
  };

  componentDidMount() {
    Http.getMyInfo().then((res) => {
      if (res.status === 200) {
        this.setState({
          birthday: res.data.data.birthday,
          gender: res.data.data.gender,
          introduction: res.data.data.introduction,
          nickName: res.data.data.nickName,
          userAvatar: res.data.data.userAvatar,
          mobile: res.data.data.mobile,
        });
      }
    });
  }

  render() {
    let {
      type,
      title,
      text_left,
      text_right,
      svg,
      text,
      text_more,
      colors,
      style,
      text_more_status,
      image,
      last,
      svgRemove,
      router,
    } = this.props;
    const currentDate = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;
    return (
      <TouchableOpacity
        style={
          type === 2
            ? { backgroundColor: '#fff', marginTop: pxToDp(20), ...style }
            : { ...style }
        }
        onPress={this.dataEdit}
      >
        <View
          style={
            type === 2
              ? [styles.options__wrap, style]
              : type === 3
              ? {
                  ...styles.options__wrap,
                  ...styles.options__line,
                  ...style,
                  height: pxToDp(200),
                }
              : [styles.options__wrap, styles.options__line, style]
          }
        >
          {type === 0 ? (
            <View style={styles.options}>
              <View style={{ alignSelf: 'center' }}>
                <Svg svgXmlData={file} width={pxToDp(43)} height={pxToDp(53)} />
              </View>
              <View style={styles.center}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.transcript}>
                  <Text style={styles.transcript_text}>{text_left}</Text>
                  <Text style={styles.transcript_line}>|</Text>
                  <Text style={styles.transcript_text}>{text_right}</Text>
                </View>
              </View>
            </View>
          ) : type === 1 ? (
            <View style={styles.options}>
              <View style={{ alignSelf: 'center' }}>
                <Svg svgXmlData={svg} width={pxToDp(30)} height={pxToDp(30)} />
              </View>
              <Text
                style={
                  svgRemove
                    ? { ...styles.title_type02, marginLeft: pxToDp(0) }
                    : { ...styles.title_type02 }
                }
              >
                {title}
              </Text>
            </View>
          ) : type === 2 ? (
            <View style={styles.options}>
              <View style={{ alignSelf: 'center' }}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={colors}
                  style={styles.linear}
                >
                  <Icon
                    name={svg}
                    width={pxToDp(74)}
                    height={pxToDp(74)}
                    style={styles.svg_type03}
                  />
                </LinearGradient>
              </View>
              <View style={styles.center_type03}>
                <Text style={styles.title_type03}>{title}</Text>
                <Text style={styles.transcript_text_type03}>{text}</Text>
              </View>
            </View>
          ) : (
            <View style={{ ...styles.option, alignSelf: 'center' }}>
              <Text style={styles.title}>头像</Text>
            </View>
          )}
          <View style={styles.options}>
            {type === 1 ? (
              <Text
                style={
                  text_more_status
                    ? {
                        ...styles.more,
                        ...styles.mored,
                        lineHeight: pxToDp(24),
                      }
                    : { ...styles.more }
                }
              >
                {this.props.isDate ? (
                  <DatePicker
                    androidMode={'spinner'}
                    style={{ width: 200 }}
                    date={this.state.birthday}
                    mode="date"
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate={currentDate}
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    customStyles={{
                      dateIcon: {
                        display: 'none',
                      },
                      dateInput: {
                        marginTop: pxToDp(42),
                        borderWidth: 0,
                        textAlign: 'right',
                        alignItems: 'flex-end',
                      },
                      placeholderText: {
                        ...fontStyle(24, 36, 38, '500', '#999999', 'right'),
                      },
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                      this.setState({ birthday: date });
                      this.infoSet();
                    }}
                  />
                ) : (
                  text_more
                )}
              </Text>
            ) : (
              // type===3
              <View
                style={{
                  alignSelf: 'center',
                  marginRight: pxToDp(30),
                }}
              >
                <Avatar image={{ uri: image }} size={120} />
              </View>
            )}
            <Icon
              name={'more'}
              width={pxToDp(16)}
              height={pxToDp(27)}
              style={
                type === 3
                  ? { ...styles.more_icon, lineHeight: pxToDp(195) }
                  : styles.more_icon
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  options__wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: pxToDp(138),
    marginLeft: pxToDp(30),
  },
  options__line: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: pxToDp(1.5),
  },
  options: {
    flexDirection: 'row',
  },
  svg_type03: {
    color: '#fff',
    alignSelf: 'center',
    lineHeight: pxToDp(74),
  },
  linear: {
    width: pxToDp(74),
    height: pxToDp(74),
    borderRadius: pxToDp(37),
  },
  more: {
    alignSelf: 'center',
    marginRight: pxToDp(23),
    ...fontStyle(24, 36, 38, '500', '#999999', 'right'),
  },
  mored: {
    ...padding(14, 8, 14, 8),
    borderRadius: pxToDp(5),
    backgroundColor: '#ff9900',
    color: '#fff',
  },
  more_icon: {
    lineHeight: pxToDp(138),
    color: '#999999',
    marginRight: pxToDp(30),
  },
  center: {
    marginLeft: pxToDp(40),
    alignSelf: 'center',
  },
  center_type03: {
    marginLeft: pxToDp(30),
    alignSelf: 'center',
  },
  title: {
    ...fontStyle(30, 32, 32, 'bold', '#333333', 'left'),
    maxWidth: pxToDp(580),
  },
  title_type02: {
    maxWidth: pxToDp(500),
    color: '#333333',
    fontSize: pxToDp(28),
    fontWeight: 'bold',
    marginLeft: pxToDp(25),
    alignSelf: 'center',
    ...fontStyle(28, 30, 30, 'bold', '#333'),
  },
  title_type03: {
    ...fontStyle(34, 34, 36, 'bold', '#333'),
    maxWidth: pxToDp(550),
  },
  transcript: {
    flexDirection: 'row',
    lineHeight: pxToDp(18),
    marginTop: pxToDp(5),
  },
  transcript_text: {
    marginTop: pxToDp(10),
    ...fontStyle(24, 26, 26, 'bold', '#888888'),
  },
  transcript_text_type03: {
    marginTop: pxToDp(5),
    ...fontStyle(26, 34, 28, '500', '#999999'),
    maxWidth: pxToDp(550),
  },
  transcript_line: {
    color: '#e5e5e5',
    fontSize: pxToDp(24),
    marginLeft: pxToDp(29),
    marginRight: pxToDp(30),
  },
  textSet__wrap: {
    backgroundColor: '#fff',
    minWidth: pxToDp(300),
    minHeight: pxToDp(240),
  },
  textSet_text: {
    ...fontStyle(34, 36, 38, 'bold', '#333'),
    ...margin(30, 0, 20, 0),
    alignSelf: 'center',
  },
  textSet_input: {
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#fe9e0e',
    ...padding(20, 10, 0, 0),
    ...fontStyle(28, 56, 56, 'bold', '#888'),
    width: pxToDp(420),
  },
  textSet_button: {
    alignSelf: 'center',
    fontSize: pxToDp(34),
    color: '#fff',
    ...padding(20, 18, 20, 18),
    marginTop: pxToDp(30),
    backgroundColor: '#fd7609',
    borderRadius: pxToDp(20),
  },
});
export default Index;

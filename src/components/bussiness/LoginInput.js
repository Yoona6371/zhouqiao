import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import PropTypes from 'prop-types';
import Icon from '../common/Icon';
import utils from '../../utils/utils';
import { position } from '../../constants/svg';
import Toast from '../common/Toast/Toast';

export default class LoginInput extends Component {
  static propTypes = {
    type: PropTypes.number,
    phoneNumber: PropTypes.string,
    password: PropTypes.string,
    verifyCode: PropTypes.string,
    verifyType: PropTypes.number,
  };
  static defaultProps = {
    type: 1,
  };
  /* type:3 -> 找回密码 手机号 验证码 重置密码  验证码接口类型类型 2
   * type:2 -> 注册 手机号 验证码 密码          验证码接口类型类型 1
   * type:1(默认) ->登录 手机号 密码
   */
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      password: '',
      verifyCode: '',
      phoneNumberErrShow: false,
      passwordErrShow: false,
      verifyCodeErrShow: false,
      btnText:'获取验证码',
    };
  }

  //电话号码
  phoneNumberChangeText = (phoneNumber) => {
    this.setState({ phoneNumber });
    this.props.phoneNumberGet(phoneNumber);
  };
  phoneNumberSubmitEditing = () => {
    // const { phoneNumber } = this.state;
    // console.log(utils.checkPhone(phoneNumber));
  };

  //密码
  passwordSubmitEditing = () => {
    this.props.passwordGet(this.state.password);
  };
  passwordChangeText = (password) => {
    this.setState({ password });
    this.props.passwordGet(password);
    // console.log(utils.checkPassword(password));
  };

  //申请验证码

  //倒计时
  countDown =()=>{
    let seconds =60;
    //重新获取60s
    this.setState({btnText:`重新获取(${seconds})`});
    let timeId = setInterval(() =>{
      seconds--;
      this.setState({btnText:`重新获取(${seconds})`});
      if(seconds === 0){
        clearInterval(timeId);
        this.setState({btnText:"重新获取"});
      }
    },1000);
  }
  //传入验证码接口类型
  verifyCodeRequest = (verifyType) => {
    Http.getVerifyCode({
      code: verifyType,
      mobile: this.state.phoneNumber,
    }).then((res) => {
      console.log(res);
      if (res.data.code === 0) {
        Toast.success(res.data.msg, 1000, 'center');
        this.countDown();
      } else {
        Toast.fail(res.data.msg, 1000, 'center');
      }
    });
  };
  verifyCodeSubmitEditing = () => {};
  verifyCodeChangeText = (verifyCode) => {
    this.setState({ verifyCode });
    this.props.verifyCodeGet(verifyCode);
  };
  render() {
    const {
      phoneNumber,
      password,
      verifyCode,
      phoneNumberErrShow,
      passwordErrShow,
      verifyCodeErrShow,
      btnText
    } = this.state;
    const { type, verifyType } = this.props;

    return (
      <View>
        {type === 1 ? (
          <View>
            <View>
              <View style={styles.input_box}>
                <TextInput
                  placeholder="输入手机号码"
                  placeholderTextColor="#918D87"
                  maxLength={11}
                  onSubmitEditing={this.phoneNumberSubmitEditing}
                  onChangeText={this.phoneNumberChangeText}
                  keyboardType="phone-pad"
                  style={{ fontSize: pxToDp(24) }}
                  onFocus={() => {
                    this.setState({ phoneNumberErrShow: false });
                  }}
                  onBlur={() => {
                    this.setState({ phoneNumberErrShow: true });
                  }}
                />
                <Icon name="phone" style={styles.icon__type12} />
              </View>
              {phoneNumberErrShow ? (
                <Text style={styles.errorText}>
                  {utils.checkPhone(phoneNumber)}
                </Text>
              ) : (
                <View />
              )}
            </View>
            <View>
              <View style={[styles.input_box, { marginTop: pxToDp(50) }]}>
                <TextInput
                  placeholder="输入密码"
                  style={{ fontSize: pxToDp(24) }}
                  placeholderTextColor="#918D87"
                  maxLength={16}
                  secureTextEntry={true}
                  onSubmitEditing={this.passwordSubmitEditing}
                  onChangeText={this.passwordChangeText}
                  onFocus={() => {
                    this.setState({ passwordErrShow: false });
                  }}
                  onBlur={() => {
                    this.setState({ passwordErrShow: true });
                  }}
                />
                <Icon name="lock" style={styles.icon__type12} />
              </View>
              {passwordErrShow ? (
                <Text style={styles.errorText}>
                  {utils.checkPassword(password)}
                </Text>
              ) : (
                <View />
              )}
            </View>
          </View>
        ) : type === 2 ? (
          <View>
            <View>
              <View style={styles.input_box}>
                <TextInput
                  placeholder="请输入手机号码"
                  placeholderTextColor="#918D87"
                  maxLength={11}
                  onSubmitEditing={this.phoneNumberSubmitEditing}
                  onChangeText={this.phoneNumberChangeText}
                  keyboardType="phone-pad"
                  style={{ fontSize: pxToDp(24) }}
                  onFocus={() => {
                    this.setState({ phoneNumberErrShow: false });
                  }}
                  onBlur={() => {
                    this.setState({ phoneNumberErrShow: true });
                  }}
                />
                <Icon name="phone" style={styles.icon__type12} />
              </View>
              {phoneNumberErrShow ? (
                <Text style={styles.errorText}>
                  {utils.checkPhone(phoneNumber)}
                </Text>
              ) : (
                <View />
              )}
            </View>
            <View
              style={[styles.input__box__type2__fix, { marginTop: pxToDp(30) }]}
            >
              <TextInput
                placeholder="请输入验证码"
                style={{ fontSize: pxToDp(24) }}
                placeholderTextColor="#918D87"
                onSubmitEditing={this.verifyCodeSubmitEditing}
                onChangeText={this.verifyCodeChangeText}
                onFocus={() => {
                  this.setState({ verifyCodeErrShow: false });
                }}
                onBlur={() => {
                  this.setState({ verifyCodeErrShow: true });
                }}
              />
              <View style={styles.touchableOpacity__type3}>
                <TouchableOpacity
                  style={{ justifyContent: 'center' }}
                  onPress={() => this.verifyCodeRequest(verifyType)}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: pxToDp(21),
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {btnText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {verifyCodeErrShow ? (
              <Text style={styles.errorText}>
                {utils.checkVerification(verifyCode)}
              </Text>
            ) : (
              <View />
            )}
            <View>
              <View style={[styles.input_box, { marginTop: pxToDp(30) }]}>
                <TextInput
                  placeholder="请输入密码"
                  style={{ fontSize: pxToDp(24) }}
                  placeholderTextColor="#918D87"
                  maxLength={16}
                  secureTextEntry={true}
                  onSubmitEditing={this.passwordSubmitEditing}
                  onChangeText={this.passwordChangeText}
                  onFocus={() => {
                    this.setState({ passwordErrShow: false });
                  }}
                  onBlur={() => {
                    this.setState({ passwordErrShow: true });
                  }}
                />
                <Icon name="lock" style={styles.icon__type12} />
              </View>
              {passwordErrShow ? (
                <Text style={styles.errorText}>
                  {utils.checkPassword(password)}
                </Text>
              ) : (
                <View />
              )}
            </View>
          </View>
        ) : (
          <View>
            <View>
              <View style={styles.input__box__type3}>
                <Icon name="phone" style={styles.icon__type3} />
                <TextInput
                  placeholder="请输入手机号码"
                  placeholderTextColor="#918D87"
                  maxLength={11}
                  onSubmitEditing={this.phoneNumberSubmitEditing}
                  onChangeText={this.phoneNumberChangeText}
                  keyboardType="phone-pad"
                  style={{ fontSize: pxToDp(24) }}
                  onFocus={() => {
                    this.setState({ phoneNumberErrShow: false });
                  }}
                  onBlur={() => {
                    this.setState({ phoneNumberErrShow: true });
                  }}
                />
              </View>
            </View>
            {phoneNumberErrShow ? (
              <Text style={styles.errorText}>
                {utils.checkPhone(phoneNumber)}
              </Text>
            ) : (
              <View />
            )}
            <View>
              <View style={styles.input__box__type3}>
                <Icon name="verification" style={styles.icon__type3} />
                <TextInput
                  placeholder="请输入验证码"
                  style={{ fontSize: pxToDp(24) }}
                  placeholderTextColor="#918D87"
                  onSubmitEditing={this.verifyCodeSubmitEditing}
                  onChangeText={this.verifyCodeChangeText}
                  onFocus={() => {
                    this.setState({ passwordErrShow: false });
                  }}
                  onBlur={() => {
                    this.setState({ passwordErrShow: true });
                  }}
                />
                <View style={styles.touchableOpacity__type3}>
                  <TouchableOpacity
                    style={{ justifyContent: 'center' }}
                    onPress={() => this.verifyCodeRequest(verifyType)}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: pxToDp(21),
                        alignSelf: 'center',
                      }}
                    >
                      {btnText}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {verifyCodeErrShow ? (
                <Text style={styles.errorText}>
                  {utils.checkVerification(verifyCode)}
                </Text>
              ) : (
                <View />
              )}
            </View>
            <View>
              <View style={styles.input__box__type3}>
                <Icon name="lock" style={styles.icon__type3} />
                <TextInput
                  placeholder="请重设密码"
                  style={{ fontSize: pxToDp(24) }}
                  placeholderTextColor="#918D87"
                  maxLength={16}
                  secureTextEntry={true}
                  onSubmitEditing={this.passwordSubmitEditing}
                  onChangeText={this.passwordChangeText}
                  onFocus={() => {
                    this.setState({ passwordErrShow: false });
                  }}
                  onBlur={() => {
                    this.setState({ passwordErrShow: true });
                  }}
                />
              </View>
              {passwordErrShow ? (
                <Text style={styles.errorText}>
                  {utils.checkPassword(password)}
                </Text>
              ) : (
                <View />
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon__type12: {
    color: '#fe9e0e',
    position: 'absolute',
    right: pxToDp(27),
    top: pxToDp(20),
  },
  icon__type3: {
    color: '#fe9e0e',
    fontSize: pxToDp(24),
    marginRight: pxToDp(15),
  },
  touchableOpacity__type3: {
    width: pxToDp(150),
    height: pxToDp(50),
    backgroundColor: '#fe970d',
    borderRadius: pxToDp(25),
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  input__box__type3: {
    width: pxToDp(630),
    height: pxToDp(107),
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: pxToDp(2),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input_box: {
    width: pxToDp(610),
    height: pxToDp(88),
    backgroundColor: '#F6F3EF',
    borderRadius: pxToDp(16),
    position: 'relative',
    paddingLeft: pxToDp(40),
  },
  input__box__type2__fix: {
    width: pxToDp(610),
    height: pxToDp(88),
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: pxToDp(40),
    backgroundColor: '#F6F3EF',
    borderRadius: pxToDp(16),
  },
  input_box_margin: {
    marginTop: pxToDp(60),
  },
  errorText: {
    color: 'red',
    fontSize: pxToDp(18),
    paddingLeft: pxToDp(20),
  },
});

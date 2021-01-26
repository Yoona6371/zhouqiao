import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import PropTypes from 'prop-types';
import Icon from '../common/Icon';
import utils from '../../utils/utils';

export default class LoginInput extends Component {
  static propTypes = {
    type: PropTypes.number,
    phoneNumber: PropTypes.string,
    password: PropTypes.string,
  };
  static defaultProps = {
    type: 1,
  };
  /* type:3 ->
   * type:2 -> 注册 手机号 密码 确认密码
   * type:1(默认) ->登录 手机号 密码
   */
  constructor(props) {
    super(props);
  }
  state = {
    phoneNumber: '',
    password: '',
  };
  //电话号码
  phoneNumberChangeText = (phoneNumber) => {
    this.setState({ phoneNumber });
  };
  phoneNumberSubmitEditing = () => {
    const { phoneNumber } = this.state;
    // console.log(utils.checkPhone(phoneNumber));
  };

  //密码
  passwordSubmitEditing = () => {
    this.setState({ password });
  };
  passwordChangeText = () => {
    const { password } = this.state;
    // console.log(utils.checkPassword(password));
  };

  render() {
    const { phoneNumber, password } = this.state;
    const { type } = this.props;

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
                />
                <Icon name="phone" style={styles.icon} />
              </View>
              <Text style={styles.errorText}>
                {utils.checkPhone(phoneNumber)}
              </Text>
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
                />
                <Icon name="lock" style={styles.icon} />
              </View>
              <Text style={styles.errorText}>
                {utils.checkPassword(password)}
              </Text>
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
                />
                <Icon name="phone" style={styles.icon} />
              </View>
              <Text style={styles.errorText}>
                {utils.checkPhone(phoneNumber)}
              </Text>
            </View>
            <View>
              <View style={[styles.input_box, { marginTop: pxToDp(50) }]}>
                <TextInput
                  placeholder="请输入密码"
                  style={{ fontSize: pxToDp(24) }}
                  placeholderTextColor="#918D87"
                  maxLength={16}
                  secureTextEntry={true}
                  onSubmitEditing={this.passwordSubmitEditing}
                  onChangeText={this.passwordChangeText}
                />
                <Icon name="lock" style={styles.icon} />
              </View>
              <Text style={styles.errorText}>
                {utils.checkPassword(password)}
              </Text>
            </View>
            <View>
              <View style={[styles.input_box, { marginTop: pxToDp(50) }]}>
                <TextInput
                  placeholder="请确认密码"
                  style={{ fontSize: pxToDp(24) }}
                  placeholderTextColor="#918D87"
                  maxLength={16}
                  secureTextEntry={true}
                  onSubmitEditing={this.passwordSubmitEditing}
                  onChangeText={this.passwordChangeText}
                />
                <Icon name="lock" style={styles.icon} />
              </View>
              <Text style={styles.errorText}>
                {utils.checkPassword(password)}
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.input_box}>
              <TextInput
                placeholder="输入手机号码"
                style={{ color: '#918D87', fontSize: pxToDp(24) }}
              />
              <Icon name="phone" style={styles.icon} />
            </View>
            <View style={[styles.input_box, { marginTop: pxToDp(60) }]}>
              <TextInput
                placeholder="输入密码"
                style={{ color: '#918D87', fontSize: pxToDp(24) }}
              />
              <Icon name="lock" style={styles.icon} />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    color: '#fe9e0e',
    position: 'absolute',
    right: pxToDp(27),
    top: pxToDp(20),
  },
  input_box: {
    width: pxToDp(610),
    height: pxToDp(88),
    backgroundColor: '#F6F3EF',
    borderRadius: pxToDp(16),
    position: 'relative',
    paddingLeft: pxToDp(40),
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

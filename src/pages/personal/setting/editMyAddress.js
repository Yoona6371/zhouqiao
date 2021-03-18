import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Switch,
} from 'react-native';
import { pxToDp } from '../../../utils/pxToDp';
import TopTitle, { index } from '../../../components/common/TopTitle';
import Textarea from 'react-native-textarea';
import { padding } from '../../../utils/StyleUtils';
import Toast from '../../../components/common/Toast/Toast';
import axios from 'axios';
import { inject } from 'mobx-react';
import { DeviceEventEmitter } from 'react-native';

@inject('RootStore')
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isDefault: false,
      phoneNumber: '',
      address: '',
    };
  }

  componentDidMount() {
    Http.addressDetails({}, this.props.route.params).then((res) => {
      console.log(res);
      if (res.data.code === 0) {
        this.setState({ name: res.data.data.contact });
        this.setState({ address: res.data.data.address });
        this.setState({ isDefault: res.data.data.isDefault });
        this.setState({ phoneNumber: res.data.data.mobile });
        if (res.data.data.isDefault === 1) {
          this.setState({ isDefault: true });
        } else {
          this.setState({ isDefault: false });
        }
        console.log(this.state);
      }
    });
  }

  //保存地址
  saveAddress = () => {
    //接口函数
    // console.log(this.state);
    let a = 0;
    if (this.state.isDefault === 1) {
      a = 0;
    } else {
      a = 1;
    }
    axios
      .put(
        `http://www.zhouqiao.art:8080/api/user/address/${this.props.route.params}`,
        {
          address: this.state.address,
          contact: this.state.name,
          isDefault: a,
          mobile: this.state.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.RootStore.userStore.allData.accessToken}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          Toast.success(res.data.msg, 1000, 'center');
          NavigationHelper.goBack();
          DeviceEventEmitter.emit('EventType');
        } else {
          Toast.fail(res.data.msg, 1000, 'center');
        }
      });
  };
  render() {
    const isDefault = this.state.isDefault;
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        {/* 标题开始 */}
        <TopTitle title="修改信息" showBtn={false} />
        {/* 标题结束 */}
        {/* 主体开始 */}
        <View style={{ alignItems: 'center' }}>
          {/* name 开始 */}
          <View style={styles.input__box}>
            <Text style={styles.input__text}>收货人</Text>
            <TextInput
              autoFocus={true}
              placeholder="名字"
              placeholderTextColor="#999999"
              maxLength={10}
              style={{ fontSize: pxToDp(30) }}
              value={this.state.name}
              onChangeText={(value) => {
                this.setState({ name: value });
              }}
            />
          </View>
          {/* 手机号码开始 */}
          <View style={styles.input__box}>
            <Text style={styles.input__text}>手机号码</Text>
            <TextInput
              placeholder="手机号"
              placeholderTextColor="#999999"
              value={this.state.phoneNumber}
              maxLength={11}
              style={{ fontSize: pxToDp(30) }}
              keyboardType="numeric"
              onChangeText={(value) => {
                this.setState({ phoneNumber: value });
              }}
            />
          </View>
          {/* 手机号码结束 */}
          {/* 详细地址开始 */}
          <View
            style={[
              styles.input__box,
              { height: pxToDp(180), alignItems: 'flex-start' },
            ]}
          >
            <Text style={[styles.input__text, { marginTop: pxToDp(30) }]}>
              详细地址
            </Text>
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={(value) => {
                this.setState({ address: value });
              }}
              defaultValue={this.state.address}
              maxLength={300}
              placeholder={'省市区街道、小区'}
              placeholderTextColor={'#999999'}
              underlineColorAndroid={'transparent'}
            />
          </View>
          {/* 详细地址结束 */}
          {/* 是否设为默认地址  开始*/}
          <View style={styles.input__box}>
            <Text style={styles.input__text}>默认地址</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDefault ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={(res) => {
                this.setState({ isDefault: res });
              }}
              value={isDefault}
            />
          </View>
          {/* 是否设为默认地址  结束*/}
        </View>
        {/* 主体结束 */}
        {/* 按钮开始 */}
        {/*button start*/}
        <View
          style={{
            marginTop: pxToDp(110),
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={this.saveAddress}
          >
            <Text
              style={{
                alignSelf: 'center',
                fontSize: pxToDp(31),
                color: '#FFFFFF',
              }}
            >
              保存
            </Text>
          </TouchableOpacity>
        </View>
        {/*button  end*/}
        {/* 按钮结束 */}
      </View>
    );
  }
}
export default Index;
const styles = StyleSheet.create({
  input__box: {
    width: '80%',
    flexDirection: 'row',
    height: pxToDp(100),
    borderBottomWidth: pxToDp(3),
    borderBottomColor: '#f6f6f6',
    alignItems: 'center',
    paddingLeft: pxToDp(10),
    backgroundColor: '#ffffff',
  },
  input__text: {
    fontSize: pxToDp(28),
    fontWeight: 'bold',
    marginRight: pxToDp(40),
    width: pxToDp(115),
  },
  textarea: { fontSize: pxToDp(30), color: 'black' },
  textareaContainer: {
    width: '100%',
    height: '100%',
    ...padding(0, 0, 200, 0),
  },
  TouchableOpacity: {
    width: pxToDp(600),
    height: pxToDp(88),
    borderRadius: pxToDp(44),
    backgroundColor: '#FD840B',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

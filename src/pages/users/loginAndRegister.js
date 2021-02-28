import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LoginInput from '../../components/bussiness/LoginInput';
import { pxToDp } from '../../utils/pxToDp';
import SvgUri from 'react-native-svg-uri';
import { qq, WeChat } from '../../constants/svg';
import Icon from '../../components/common/Icon';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { inject, observer } from 'mobx-react';
import Toast from '../../components/common/Toast/Toast';
import RootStore from '../../mobx/index';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
const Tab = createMaterialTopTabNavigator();
import axios from 'axios';

@inject('RootStore')
@observer
class LoginTab extends Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: '',
      password: '',
      userId: '',
      accessToken: '',
      refreshToken: '',
      name: '',
      img: '',
    };
  }
  login = () => {
    Http.login({
      account: this.state.phoneNumber,
      password: this.state.password,
    }).then((res) => {
      console.log(res);
      if (res.data.code === 0) {
        Toast.success(res.data.msg, 1000, 'center');
        NavigationHelper.goBack();
        console.log(res);
        this.state.userId = res.data.data.userId;
        this.state.accessToken = res.data.data.accessToken;
        this.state.refreshToken = res.data.data.refreshToken;

        //存储信息至mobox
        RootStore.userStore.allData.accessToken = this.state.accessToken;
        RootStore.userStore.allData.userId = this.state.userId;
        RootStore.userStore.allData.refreshToken = this.state.refreshToken;
        RootStore.userStore.allData.password = this.state.password;

        //获取个人信息
        Http.getMyInfo().then((answer) => {
          console.log(answer);
          this.state.name = answer.data.data.nickName;
          RootStore.userStore.allData.name = this.state.name;
          this.state.img = answer.data.data.userAvatar;
          RootStore.userStore.allData.img = this.state.img;
        });

        //存储信息至本地
        LocalStorageUtils.set('refreshToken', this.state.refreshToken);
        LocalStorageUtils.set('accessToken', this.state.accessToken);
        LocalStorageUtils.set('userId', this.state.userId);
        LocalStorageUtils.set('name', this.state.name);
        LocalStorageUtils.set('img', this.state.img);
        console.log(LocalStorageUtils.get());
      } else {
        Toast.fail(res.data.msg, 1000, 'center');
      }
    });
  };

  render() {
    return (
      <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        {/*登录 start*/}
        <View style={{ marginTop: pxToDp(90) }}>
          <LoginInput
            type={1}
            phoneNumberGet={(value) => {
              this.setState({ phoneNumber: value });
            }}
            passwordGet={(value) => {
              this.setState({ password: value });
            }}
          />
          {/*forgetPassword start*/}
          <View style={{ marginTop: pxToDp(45) }}>
            <TouchableOpacity
              onPress={() => {
                NavigationHelper.navigate('FindPassword');
              }}
            >
              <Text
                style={{ color: '#16b0ff', fontSize: pxToDp(24) }}
              >
                忘记密码？
              </Text>
            </TouchableOpacity>
          </View>
          {/*forgetPassword end*/}
          {/*button start*/}
          <View style={{ marginTop: pxToDp(103), marginBottom: pxToDp(120) }}>
            <TouchableOpacity
              style={{
                width: pxToDp(610),
                height: pxToDp(88),
                borderRadius: pxToDp(44),
                backgroundColor: '#FD840B',
                justifyContent: 'center',
              }}
              onPress={this.login}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: pxToDp(27),
                  color: '#FFFFFF',
                }}
              >
                登录
              </Text>
            </TouchableOpacity>
          </View>
          {/*button  end*/}
        </View>
        {/*登录 end*/}
      </View>
    );
  }
}
class RegisterTab extends Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: '',
      password: '',
      verifyCode: '',
    };
  }

  register = () => {
    axios
      .post(
        'http://www.zhouqiao.art:8080/api/user/register',
        {
          mobile: this.state.phoneNumber,
          password: this.state.password,
          verifyCode: this.state.verifyCode,
        },
        { params: { role: '2' } },
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          Toast.success('注册成功', 1000, 'center');
        } else {
          Toast.fail(res.data.msg, 1000, 'center');
        }
      });
  };

  render() {
    return (
      <View
        style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}
      >
        {/*注册 start*/}
        <View style={{ marginTop: pxToDp(90) }}>
          <LoginInput
            type={2}
            verifyType={1}
            phoneNumberGet={(value) => {
              this.setState({ phoneNumber: value });
            }}
            passwordGet={(value) => {
              this.setState({ password: value });
            }}
            verifyCodeGet={(value) => {
              this.setState({ verifyCode: value });
            }}
          />
          {/*forgetPassword start*/}
          <View style={{ marginTop: pxToDp(25), flexDirection: 'row' }}>
            <Text style={{ color: '#999999', fontSize: pxToDp(24) }}>
              已有帐号？
            </Text>
            <TouchableOpacity
              onPress={() => {
                NavigationHelper.navigate();
              }}
            >
              <Text style={{ color: '#16b0ff', fontSize: pxToDp(24) }}>
                立即登录
              </Text>
            </TouchableOpacity>
          </View>
          {/*forgetPassword end*/}
          {/*button start*/}
          <View style={{ marginTop: pxToDp(45), marginBottom: pxToDp(72) }}>
            <TouchableOpacity
              style={{
                width: pxToDp(610),
                height: pxToDp(88),
                borderRadius: pxToDp(44),
                backgroundColor: '#FD840B',
                justifyContent: 'center',
              }}
              onPress={this.register}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: pxToDp(27),
                  color: '#FFFFFF',
                }}
              >
                注册
              </Text>
            </TouchableOpacity>
          </View>
          {/*button  end*/}
        </View>
        {/* 注册 end*/}
      </View>
    );
  }
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [
        {
          name: '登录',
          component: LoginTab,
        },
        {
          name: '注册',
          component: RegisterTab,
        },
      ],
    };
  }
  MyTabs = () => {
    let { pages } = this.state;
    return (
      <Tab.Navigator
        tabBarOptions={{
          inactiveTintColor: '#FE9E0E',
          // inactiveBackgroundColor: '#fffbf6',
          activeTintColor: '#FFFFFF',
          // activeBackgroundColor: '#FE9E0E',
          pressColor: '#FE9E0E',
          indicatorStyle: {
            height: 0,
          },
          labelStyle: {
            fontSize: pxToDp(30),
          },
          style: styles.tabBarOptions,
        }}
      >
        {pages.map((v, i) => (
          <Tab.Screen name={v.name} component={v.component} />
        ))}
      </Tab.Navigator>
    );
  };
  render() {
    const { pages } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {/*top start*/}
        <View>
          <StatusBar backgroundColor="transparent" translucent={true} />
          {/*top__box*/}
          <ImageBackground
            style={styles.top__box}
            source={require('../../asserts/images/Login_top.png')}
          >
            {/*close 图标*/}
            <TouchableOpacity
              style={styles.TouchableOpacity__close}
              onPress={() => {
                NavigationHelper.navigate('Tab');
              }}
            >
              <Icon name="close" style={styles.Icon__close} />
            </TouchableOpacity>
            {/*logo*/}
            <View style={styles.logo}>
              <Image
                style={{
                  width: pxToDp(100),
                  height: pxToDp(67),
                }}
                source={require('../../asserts/images/Login_logo.png')}
              />
            </View>
            {/*logo__text*/}
            <View style={styles.logo__text}>
              <Text
                style={{
                  color: 'white',
                  fontSize: pxToDp(44),
                  fontWeight: 'bold',
                }}
              >
                您好
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: pxToDp(24),
                }}
              >
                欢迎登录舟桥之家
              </Text>
            </View>
          </ImageBackground>
        </View>
        {/*top end*/}

        <View style={{ alignItems: 'center', flex: 1 }}>
          {/*top__decorate start*/}
          {/*center__box*/}
          <View style={styles.center__box}>
            {/*top__decorate__2*/}
            <View style={styles.top__decorate__2} />
            {/*top__decorate__1*/}
            <View style={styles.top__decorate__1} />
            {/*top__decorate end*/}
            <View
              style={{
                width: '100%',
                height: pxToDp(780),
              }}
            >
              {this.MyTabs()}
            </View>
            {/*bottom start*/}
            <View>
              {/*  bottom__text*/}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../asserts/images/Login_line_left.png')}
                  style={{ width: pxToDp(187), height: pxToDp(3) }}
                />
                <Text
                  style={{
                    color: '#666666',
                    margin: pxToDp(10),
                    fontWeight: 'bold',
                  }}
                >
                  第三方登录
                </Text>
                <Image
                  source={require('../../asserts/images/Login_line_right.png')}
                  style={{ width: pxToDp(187), height: pxToDp(3) }}
                />
              </View>
              {/*  bottom__svg*/}
              <View style={styles.bottom__svg}>
                <TouchableOpacity>
                  <SvgUri
                    svgXmlData={WeChat}
                    width={pxToDp(44)}
                    height={pxToDp(36)}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <SvgUri
                    svgXmlData={qq}
                    width={pxToDp(31)}
                    height={pxToDp(35)}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/*bottom end*/}
            <View
              style={{
                marginTop: pxToDp(20),
                flex: 1,
                justifyContent: 'flex-end',
              }}
            >
              <Image
                source={require('../../asserts/images/Login_bottom.png')}
                width={'100%'}
                height={pxToDp(73)}
              />
            </View>
            {/*bottom  end*/}
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
const styles = StyleSheet.create({
  center__box: {
    width: '100%',
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: pxToDp(-60),
    borderTopLeftRadius: pxToDp(70),
    borderTopRightRadius: pxToDp(70),
    alignItems: 'center',
  },
  top__decorate__1: {
    position: 'absolute',
    width: pxToDp(690),
    height: pxToDp(100),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: pxToDp(70),
    borderTopRightRadius: pxToDp(70),
    marginTop: pxToDp(-35),
    opacity: 0.7,
  },
  top__decorate__2: {
    width: pxToDp(630),
    height: pxToDp(120),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: pxToDp(70),
    borderTopRightRadius: pxToDp(70),
    marginTop: pxToDp(-60),
    opacity: 0.5,
  },

  Icon__close: {
    position: 'absolute',
    left: pxToDp(10),
    top: pxToDp(10),
    color: 'white',
    fontSize: pxToDp(36),
  },
  TouchableOpacity__close: {
    width: pxToDp(60),
    height: pxToDp(60),
    marginTop: pxToDp(80),
    marginLeft: pxToDp(29),
    position: 'relative',
  },
  logo: {
    alignItems: 'center',
    position: 'absolute',
    top: pxToDp(170),
    left: 0,
    right: 0,
  },
  logo__text: {
    alignItems: 'center',
    position: 'absolute',
    top: pxToDp(258),
    left: 0,
    right: 0,
  },
  top__box: {
    width: '100%',
    height: pxToDp(560),
    backgroundColor: '#FB8504',
    position: 'relative',
  },
  bottom__svg: {
    flexDirection: 'row',
    marginTop: pxToDp(70),
    justifyContent: 'space-evenly',
    height: pxToDp(30),
  },
  tabBarOptions: {
    width: pxToDp(460),
    alignSelf: 'center',
    borderRadius: pxToDp(40),
    borderWidth: pxToDp(1),
    borderColor: '#fec165',
    backgroundColor: '#FE9E0E',
  },
});

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { pxToDp } from '../../../utils/pxToDp';
import AddressList from '../../../components/bussiness/addressList';
import Icon from '../../../components/common/Icon';
import TopTitle, { index } from '../../../components/common/TopTitle';
import { padding } from '../../../utils/StyleUtils';
import { DeviceEventEmitter } from 'react-native';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  //获取地址列表
  addressRequire = async () => {
    //获取地址
    let addressRes = await Http.getMyAddress();
    console.log(addressRes.data.data);
    // // 地址信息列表
    let addressList = [];
    addressRes.data.data.forEach((item) => {
      addressList.push({
        address: item.address,
        name: item.contact,
        sex: item.gender,
        tel: item.mobile,
        defaultShow: item.isDefault,
        addressId: item.userAddressId,
        userId: item.userId,
      });
    });
    this.setState({
      list: addressList,
    });
    console.log('我在获取数据');
  };

  componentDidMount() {
    console.log('我在请求');
    this.addressRequire();
    // 路由监听事件
    this.subscription = DeviceEventEmitter.addListener('EventType', () => {
      //重新获取地址列表
      this.addressRequire();
    });
  }

  render() {
    const { list } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <TopTitle title="地址管理" showBtn={false} />
        <ScrollView style={styles.address__wrap}>
          {list.map((v, i) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ selectAddress: v });
                  console.log(this.props.route.params.ifBack);
                  if (this.props.route.params.ifBack === true) {
                    this.props.route.params.returnData(v);
                    NavigationHelper.goBack({ id: '4564564' });
                  }
                }}
              >
                <AddressList
                  style={{ marginBottom: pxToDp(20) }}
                  key={i}
                  name={v.name}
                  sex={v.sex}
                  tel={v.tel}
                  address={v.address}
                  defaultShow={v.defaultShow}
                  addressId={v.addressId}
                  addressRefresh={() => this.addressRequire()}
                />
              </TouchableOpacity>
            </View>
          ))}
          {/*button start*/}
          <View
            style={{
              marginTop: pxToDp(110),
              marginBottom: pxToDp(110),
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                width: pxToDp(461),
                height: pxToDp(88),
                borderRadius: pxToDp(44),
                backgroundColor: '#FD840B',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={() => {
                NavigationHelper.navigate('AddMyAddress');
              }}
            >
              <Icon
                name="add"
                style={{
                  fontSize: pxToDp(33),
                  color: '#FFFFFF',
                  marginRight: pxToDp(19),
                }}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: pxToDp(31),
                  color: '#FFFFFF',
                }}
              >
                新建收货地址
              </Text>
            </TouchableOpacity>
          </View>
          {/*button  end*/}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  address__wrap: {
    width: '100%',
    height: pxToDp(1624),
    ...padding(30, 20, 30, 0),
    backgroundColor: '#f8f8f8',
  },
  address__list: {
    marginBottom: pxToDp(20),
  },
});

export default Index;

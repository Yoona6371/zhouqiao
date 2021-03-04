import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import Icon from '../../components/common/Icon';
import RNRestart from 'react-native-restart';
import Toast from '../common/Toast/Toast';

export default class AddressList extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    address: '曹杨九村11栋30号楼210室',
    name: '卢伟军',
    sex: '女士',
    tel: '18721755801',
    defaultShow: 1,
  };

  delete = () => {
    console.log(this.props.addressId);
    Http.deleteAddress({}, this.props.addressId)
    .then((res) => {
      console.log(res);
      if (res.data.code === 0) {
        RNRestart.Restart();
      } else {
        Toast.fail(res.data.msg, 1000, 'center');
      }
    });
  };

  //编辑页面跳转
  editor = () => {
    NavigationHelper.navigate('EditMyAddress', this.props.addressId);
  };
  render() {
    const { address, name, sex, tel, defaultShow} = this.props;
    return (
      <View style={[styles.adressList_box, this.props.style]}>
        {/*详细地址strat*/}
        <View style={styles.detailedAddress}>
          <Text
            style={{
              color: '#333333',
              fontWeight: 'bold',
              fontSize: pxToDp(27),
            }}
          >
            {address}
          </Text>
          {defaultShow === 1 ? (
            <View style={styles.defaultShow_box}>
              <Text style={{ color: '#FFFFFF', fontSize: pxToDp(17) }}>
                默认
              </Text>
            </View>
          ) : (
            <Text />
          )}
        </View>
        {/*详细地址end*/}
        {/*身份信息start*/}
        <View style={styles.address_identity}>
          <Text style={styles.address_identity_text}>{name}</Text>
          <Text style={styles.address_identity_text}>{sex}</Text>
          <Text style={styles.address_identity_text}>{tel}</Text>
        </View>
        {/*身份信息end*/}
        {/*右下角编辑删除start*/}
        {/*编辑start*/}
        <View style={styles.adderss_editor}>
          <TouchableOpacity
            onPress={this.editor}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Icon
              name="editor"
              style={{
                fontSize: pxToDp(23),
                color: '#a5a5a5',
                marginRight: pxToDp(15),
              }}
            />
            <Text style={{ fontSize: pxToDp(24), color: '#999999' }}>编辑</Text>
          </TouchableOpacity>
          {/*编辑结束*/}
          {/*删除开始*/}
          <TouchableOpacity
            onPress={this.delete}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: pxToDp(41),
            }}
          >
            <Icon
              name="delete"
              style={{
                fontSize: pxToDp(23),
                color: '#a5a5a5',
                marginRight: pxToDp(15),
              }}
            />
            <Text style={{ fontSize: pxToDp(24), color: '#999999' }}>删除</Text>
          </TouchableOpacity>
          {/*  删除结束*/}
        </View>
        {/*右下角编辑删除end*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  adressList_box: {
    width: '100%',
    height: pxToDp(174),
    backgroundColor: '#ffffff',
    padding: pxToDp(20),
  },
  detailedAddress: { flex: 1.5, flexDirection: 'row', alignItems: 'center' },
  address_identity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: pxToDp(25),
    width: '60%',
    justifyContent: 'space-between',
    marginTop: pxToDp(20),
  },
  address_identity_text: { color: '#999999', fontSize: pxToDp(26) },
  adderss_editor: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  defaultShow_box: {
    height: pxToDp(35),
    width: pxToDp(61),
    backgroundColor: '#ff9900',
    padding: pxToDp(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: pxToDp(12),
  },
});

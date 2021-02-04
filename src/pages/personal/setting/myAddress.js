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
import TopTitle from '../../../components/common/TopTitle';
import { padding } from '../../../utils/StyleUtils';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          user: {
            detailedAddress: '曹杨九村11栋30号楼210室',
            name: '卢伟军',
            sex: '女士',
            tel: '18721755801',
          },
          defaultShow: true,
          jumPage: 'Tabber',
        },
        {
          user: {
            detailedAddress: '曹杨九村11栋30号楼210室',
            name: '卢伟军',
            sex: '女士',
            tel: '18721755801',
          },
          defaultShow: false,
          jumPage: 'Tabber',
        },
        {
          user: {
            detailedAddress: '曹杨九村11栋30号楼210室',
            name: '卢伟军',
            sex: '女士',
            tel: '18721755801',
          },
          defaultShow: false,
          jumPage: 'Tabber',
        },
        {
          user: {
            detailedAddress: '曹杨九村11栋30号楼210室',
            name: '卢伟军',
            sex: '女士',
            tel: '18721755801',
          },
          defaultShow: false,
          jumPage: 'Tabber',
        },
        {
          user: {
            detailedAddress: '曹杨九村11栋30号楼210室',
            name: '卢伟军',
            sex: '女士',
            tel: '18721755801',
          },
          defaultShow: false,
          jumPage: 'Tabber',
        },
      ],
    };
  }
  render() {
    const { list } = this.state;
    return (
      <View>
        <TopTitle title="地址管理" showBtn={false} />
        <ScrollView style={styles.address__wrap}>
          {list.map((v, i) => (
            <AddressList
              style={{ marginBottom: pxToDp(20) }}
              key={i}
              user={v.user}
              defaultShow={v.defaultShow}
              jumPage={v.jumPage}
            />
          ))}
          {/*button start*/}
          <View
            style={{
              marginTop: pxToDp(110),
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

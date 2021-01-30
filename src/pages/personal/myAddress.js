import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView } from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import AddressList from '../../components/bussiness/addressList';

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
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  address__wrap: {
    width: '100%',
    height: pxToDp(1624),
    padding: pxToDp(30),
    backgroundColor: '#f8f8f8',
  },
  address__list: {
    marginBottom: pxToDp(20),
  },
});

export default Index;


import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import AddressList from '../../components/bussiness/addressList'
import OrderCard from '../../components/bussiness/OrderCard'
import TopTitle from '../../components/common/TopTitle'
import { pxToDp } from '../../utils/pxToDp'
export class orderDetail extends Component {
  componentDidMount() {
  }
  state = {
    num: 1,
    address1: []
  }
  postOrder = () => {
    const { address1, num } = this.state;
    let address = address1.address;
    let id = this.props.route.params.caseId;
    if (this.props.route.params.caseType === 2) {
      // console.log('idhhhhhhtype', this.props.route.params.caseId, this.props.route.params.caseType);
      let orderDesignCaseForm1 = {
        address: address,
        commodityId: id,
        contact: address1.name,
        gender: address1.sex,
        mobile: address1.tel
      }
      console.log('form1', orderDesignCaseForm1)
      Http.orderDesignCase({
        orderDesignCaseForm: orderDesignCaseForm1
      }, '/' + id).then(res => {
        console.log(res)
      })
    } else if (this.props.route.params.caseType === 4) {
      let orderCommodityForm1 = {
        address: address,
        commodityId: id,
        number: num,
        contact: address1.name,
        gender: address1.sex,
        mobile: address1.tel
      }
      console.log('orderCommodityFormwww', orderCommodityForm1)
      Http.orderCommodity({
        orderCommodityForm: orderCommodityForm1
      }).then(res => {
        console.log(res.data, 999)
      })
    }
  }
  down = () => {
    const { num } = this.state
    let a = num - 1
    if (a < 0) {
      return;
    }
    this.setState({ num: a });
  }
  add = () => {
    const { num } = this.state
    let a = num + 1
    this.setState({ num: a });
  }
  returnData = (address) => {
    this.setState({ address1: address });
  }
  render() {
    const { num, address1 } = this.state
    // let { buyerMsg } = this.state;
    // let item = this.props.route.params.item;
    return (
      <View style={{ flex: 1 }}>
        <TopTitle title="生成订单" showBtn={false} />
        <View style={{ alignItems: 'center' }}>
          <View style={styles.addressBox}>
            <TouchableOpacity onPress={() => {
              NavigationHelper.navigate('MyAddress', {
                ifBack: true,
                returnData: this.returnData.bind(this)
              })
            }}>
              {address1 === [] ?
                <AddressList></AddressList>
                :
                <AddressList address={address1.address} name={address1.name} sex={address1.sex} tel={address1.tel}></AddressList>
              }
            </TouchableOpacity>
          </View>
          {this.props.route.params.caseType === 2 ? <View></View> :
            <View style={styles.numBox}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={this.down}
                  style={styles.numDown}>
                  <Text style={{ lineHeight: pxToDp(50) }}>-</Text>
                </TouchableOpacity>
                <TextInput keyboardType='numeric' style={styles.numInput}>
                  {this.state.num}
                </TextInput>
                <TouchableOpacity
                  onPress={this.add}
                  style={styles.numAdd}>
                  <Text style={{ lineHeight: pxToDp(50) }}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.payNum}>购买数量</Text>
            </View>
          }

          <View>
            <TouchableOpacity style={styles.payBtn}
              onPress={this.postOrder}
            >
              <Text style={styles.payText}>生成订单</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  addressBox: { marginTop: pxToDp(25), marginBottom: pxToDp(25), width: '98%' },
  numBox: { alignItems: 'center', flexDirection: 'row-reverse', marginTop: pxToDp(25), padding: pxToDp(16), marginBottom: pxToDp(25), width: '98%', backgroundColor: '#FFF' },
  numDown: { height: pxToDp(50), width: pxToDp(50), borderColor: '#000', borderWidth: pxToDp(1), alignItems: 'center' },
  numInput: { borderWidth: pxToDp(1), borderColor: "#000", height: pxToDp(50), width: pxToDp(80), padding: 0, textAlign: 'center' },
  numAdd: { height: pxToDp(50), width: pxToDp(50), borderColor: '#000', borderWidth: pxToDp(1), alignItems: 'center' },
  payNum: { fontWeight: '500', fontSize: pxToDp(30), marginRight: pxToDp(50) },
  payText: { color: '#FFF', lineHeight: pxToDp(70) },
  payBtn: { height: pxToDp(70), width: pxToDp(230), backgroundColor: "#FE9E0EFF", borderRadius: pxToDp(50), alignItems: 'center' },

})
export default (orderDetail)

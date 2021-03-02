
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import AddressList from '../../components/bussiness/addressList'
import OrderCard from '../../components/bussiness/OrderCard'
import TopTitle from '../../components/common/TopTitle'
import { pxToDp } from '../../utils/pxToDp'
export class orderDetail extends Component {
  componentDidMount() {
    // let item = this.props.route.params.item;
    // let id = item.orderId;
    // console.log(id, 'id')
    // Http.orderDetail({
    //   type: item.type
    // }, '/' + id).then(res => {
    //   console.log(res.data.data, 3333)
    //   this.setState({ buyerMsg: res.data.data });
    // })
  }
  state = {
    num: 1
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
  render() {
    const { num } = this.state
    // let { buyerMsg } = this.state;
    // let item = this.props.route.params.item;
    return (
      <View style={{ flex: 1 }}>
        <TopTitle title="生成订单" showBtn={false} />
        <View style={{ alignItems: 'center' }}>
          <View style={styles.addressBox}>
            <AddressList></AddressList>
          </View>
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
          <View>
            <TouchableOpacity style={styles.payBtn}>
              <Text style={styles.payText}>生成订单</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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

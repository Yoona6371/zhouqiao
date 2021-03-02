
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import AddressList from '../../components/bussiness/addressList'
import OrderCard from '../../components/bussiness/OrderCard'
import TopTitle from '../../components/common/TopTitle'
import { pxToDp } from '../../utils/pxToDp'
export class orderDetail extends Component {
  componentDidMount() {
    let item = this.props.route.params.item;
    let id = item.orderId;
    console.log(id, 'id')
    Http.orderDetail({
      type: item.type
    }, '/' + id).then(res => {
      console.log(res.data.data, 3333)
      this.setState({ buyerMsg: res.data.data });
    })
  }
  state = {
    buyerMsg: []
  }
  render() {
    let { buyerMsg } = this.state;
    let item = this.props.route.params.item;
    return (
      <View style={{ flex: 1}}>
        <TopTitle title="订单详情" showBtn={false} />
        <View style={{ alignItems: 'center' }}>
          <View style={{ marginTop: pxToDp(25), marginBottom: pxToDp(25), width: '98%' }}>
            <AddressList sex={buyerMsg.gender} name={buyerMsg.contact} detailedAddress={buyerMsg.address} ></AddressList>
          </View>
          <View style={{ width: '98%', alignItems: 'center', backgroundColor: '#FFF' }}>
            {item.status === 0 ?
              <OrderCard
                onpressRight={() => {
                  alert('取消订单:' + item.orderId)
                }}
                onpressLeft={() => {
                  alert('立即付款:' + item.orderId)
                }}
                number={item.shoppingNumber}
                imgUri={item.cover != null ? item.cover : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1264377723,26636357&fm=26&gp=0.jpg'}
                OrderCardNumber={item.orderId}
                isUrgent={item.urgent === 1 ? true : false}
                type={1}
                OrderCardPrince={item.orderPrice}
                OrderCardTitle={item.orderName}
                style={{ marginTop: pxToDp(20) }}
              />
              : item.status === 1 ?
                <View>
                  <OrderCard
                    onpressLeft={() => {
                      alert('确认订单:' + item.orderId)
                    }}
                    number={item.shoppingNumber}
                    isUrgent={item.urgent === 1 ? true : false}
                    imgUri={item.cover != null ? item.cover : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1264377723,26636357&fm=26&gp=0.jpg'}
                    OrderCardNumber={item.orderId}
                    type={2}
                    btnText='确认订单'
                    topStatus='进行中'
                    OrderCardPrince={item.orderPrice}
                    OrderCardTitle={item.orderName}
                    style={{ marginTop: pxToDp(20) }}
                  />
                </View>
                :
                <OrderCard
                  onpressLeft={() => {
                    alert('评价功能尚未开启:' + item.orderId)
                  }}
                  number={item.shoppingNumber}
                  isUrgent={item.urgent === 1 ? true : false}
                  imgUri={item.cover != null ? item.cover : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1264377723,26636357&fm=26&gp=0.jpg'}
                  OrderCardNumber={item.orderId}
                  type={2}
                  btnText='立即评价'
                  topStatus='待评价'
                  OrderCardPrince={item.orderPrice}
                  OrderCardTitle={item.orderName}
                  style={{ marginTop: pxToDp(20) }}
                />
            }
            {/* <OrderCard ifShow={false} type={1}></OrderCard> */}
          </View>
          <View style={{ height: pxToDp(200), backgroundColor: '#FFF', width: '98%', marginTop: pxToDp(25), paddingLeft: pxToDp(20) }}>
            <Text style={{ fontSize: pxToDp(26), fontWeight: '500', marginTop: pxToDp(12) }}>卖家ID:{' '}{item.sellerId}</Text>
            {item.status === 0 ?
              <Text style={{ fontSize: pxToDp(26), fontWeight: '500', marginTop: pxToDp(12) }}>买家ID:{' '}{item.purchaserId}</Text>
              :
              <Text style={{ fontSize: pxToDp(26), fontWeight: '500', marginTop: pxToDp(10) }}>付款时间:{' '}{item.paymentTime}</Text>
            }
            <Text style={{ fontSize: pxToDp(26), fontWeight: '500', marginTop: pxToDp(10) }}>订单编号:{' '}{item.orderId}</Text>


            <Text style={{ fontSize: pxToDp(26), fontWeight: '500', marginTop: pxToDp(10) }}>创建时间:{' '}{item.updateTime}</Text>
          </View>
        </View>

      </View>
    )
  }
}


export default (orderDetail)

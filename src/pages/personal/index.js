import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import { pxToDp } from '../../utils/pxToDp';
import Icon from '../../components/common/Icon/index';
import DemandList from '../../components/bussiness/DemandList';
import { DeviceEventEmitter } from 'react-native';
@inject('RootStore')
@observer
/**
 * 目前渲染了昵称和关注数
 */
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        birthday: [],
        clientStatistics: {
          followedNum: 0,
          orderNum: 2,
          orderInProgressNum: 0,
          orderRemainEvaluateNum: 0,
          orderAfterSaleNum: 0,
        },
      },
      myRequirements: [],
    };
  }

  async componentDidMount() {
    // 获取我的基本信息
    // await this.getMyInfo();
    // 我的关注列表
    // await this.getMyFocusList();
    await this.getMyInfo();
    //执行获取需求列表
    await this.getRequirement();
    //路由监听
    this.subscription = DeviceEventEmitter.addListener('EventType', () => {
      // RNRestart.Restart();
      this.getRequirement();
    });
  }
  //获取需求列表
  getRequirement = async () => {
    let res = await Http.myRequirements({ page: 1, size: 2 });
    this.setState({ myRequirements: res.data.data.dataList });
    // this.subscription.remove();
  };
  // ——————————————————————————昵称、关注数渲染开始——————————————————————
  // 获取我的基本信息
  // getMyInfo = async () => {
  //   // 获取token的方法
  //   // this.props.RootStore.userStore.allData.token
  //   const request = this.props.RootStore.globalStore.allData.Http;
  //   const message = await request.getMyInfo();
  //   // "data": {
  //   // 	"birthday": [Array],
  //   // 	"createTime": [Array],
  //   // 	"email": null,
  //   // 	"gender": 1,
  //   // 	"introduction": "七月初七 淮水竹亭",
  //   // 	"mobile": "19834422405",
  //   // 	"nickName": "DAOKO",
  //   // 	"status": 0,
  //   // 	"updateTime": [Array],
  //   // 	"userAvatar": "https://zhouqiao.oss-cn-beijing.aliyuncs.com/avatar/a9975b68-54ea-4220-9573-b041efdf6cc7.jpg",
  //   // 	"userId": "cfc241796dc3f8d4a86150a1131789d3"
  //   // },
  //   const userInfo = message.data.data;
  //   this.setState({
  //     nickname: userInfo.introduction,
  //   });
  // };
  //
  // getMyFocusList = async () => {
  //   const request = this.props.RootStore.globalStore.allData.Http;
  //   // {
  //   //   "dataList": [{
  //   //     "avatar": "1.jpg",
  //   //     "followedUser": true,
  //   //     "userId": "44515a6a1c25b33ceb259f9d080d7348",
  //   //     "userNick": "解亚伟最帅"
  //   //   }],
  //   //   "pageSize": 1,
  //   //   "totalPage": 1,
  //   //   "totalRecords": 1
  //   // }
  //   const message = await request.myFocusList({ page: 1, size: 1 });
  //   this.setState({
  //     numFocus: message.data.data.totalPage,
  //   });
  // };
  getMyInfo = async () => {
    // 获取token的方法
    const res = await Http.getMyInfo();
    // "data": {
    // 	"birthday": [Array],
    // 	"createTime": [Array],
    // 	"email": null,
    // 	"gender": 1,
    // 	"introduction": "七月初七 淮水竹亭",
    // 	"mobile": "19834422405",
    // 	"nickName": "DAOKO",
    // 	"status": 0,
    // 	"updateTime": [Array],
    // 	"userAvatar": "https://zhouqiao.oss-cn-beijing.aliyuncs.com/avatar/a9975b68-54ea-4220-9573-b041efdf6cc7.jpg",
    // 	"userId": "cfc241796dc3f8d4a86150a1131789d3"
    // },
    const userInfo = res.data.data;
    console.log(res);
    this.setState({
      userInfo,
    });
  };

  // ——————————————————————————昵称、关注数渲染结束——————————————————————

  render() {
    const { clientStatistics, nickName, userAvatar } = this.state.userInfo;
    const { myRequirements } = this.state;
    // console.log('在个人中心里的需求列表', myRequirements);
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.head_bg}>
          <TouchableOpacity
            onPress={() =>
              NavigationHelper.navigate('DataEdit', {
                userAvatar: this.state.userInfo.userAvatar,
                nickName: this.state.userInfo.nickName,
                gender: this.state.userInfo.gender,
                introduction: this.state.userInfo.introduction,
                birthday: this.state.userInfo.birthday,
                mobile: this.state.userInfo.mobile,
              })
            }
          >
            <View style={styles.section1_NamePhotoBorder}>
              <Image
                style={styles.photo}
                source={{
                  uri: userAvatar,
                }}
              />
              <View style={styles.name_attention}>
                <Text style={styles.name}>{nickName}</Text>
                <View style={styles.attentionBorder}>
                  <Text style={styles.attentionNumber}>
                    关注数:{clientStatistics.followedNum}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: pxToDp(70),
                }}
              >
                <Icon
                  name={'right'}
                  style={{
                    color: '#ffeaca',
                    fontSize: pxToDp(30),
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.fourIconBorder}>
            <View style={styles.ItemIcon}>
              <TouchableOpacity
                onPress={() => {
                  NavigationHelper.navigate('myCollect');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon
                  name={'personal_collection'}
                  style={{
                    color: '#000',
                    fontSize: pxToDp(50),
                  }}
                />
                <Text style={styles.ItemiconText}>我的收藏</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemIcon}>
              <TouchableOpacity
                onPress={() => {
                  NavigationHelper.navigate('history');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon
                  name={'personal_history'}
                  style={{
                    color: '#000',
                    fontSize: pxToDp(50),
                  }}
                />
                <Text style={styles.ItemiconText}>浏览记录</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemIcon}>
              <TouchableOpacity
                onPress={() => {
                  NavigationHelper.navigate('MyFocus');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon
                  name={'personal_focus'}
                  style={{
                    color: '#000',
                    fontSize: pxToDp(50),
                  }}
                />
                <Text style={styles.ItemiconText}>我的关注</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemIcon}>
              <TouchableOpacity
                onPress={() => {
                  NavigationHelper.navigate('SettingIndex');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon
                  name={'settings2'}
                  style={{
                    color: '#000',
                    fontSize: pxToDp(50),
                  }}
                />
                <Text style={styles.ItemiconText}>设置</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mySaleBorder}>
            <View style={styles.ItemIcon}>
              <TouchableOpacity
                onPress={() => {
                  NavigationHelper.navigate('OrderLists');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 8,
                    height: pxToDp(17),
                    width: pxToDp(28),
                    backgroundColor: '#ff2d4b',
                    borderRadius: pxToDp(10),
                    alignItems: 'center',
                    zIndex: 999,
                  }}
                >
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: pxToDp(16),
                      lineHeight: pxToDp(17),
                    }}
                  >
                    {clientStatistics.orderNum}
                  </Text>
                </View>
                <Icon
                  name={'myorders'}
                  style={{
                    color: '#FE9E0E',
                    fontSize: pxToDp(50),
                  }}
                />
                <Text style={styles.ItemiconText2}>我的订单</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemIcon}>
              <TouchableOpacity
                onPress={() => {
                  NavigationHelper.navigate('myWallet');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* <Icon
                  name={'wallet'}
                  style={{
                    color: '#FE9E0E',
                    fontSize: pxToDp(50),
                  }}
                /> */}
                <Image
                  style={{
                    width: pxToDp(45),
                    height: pxToDp(38),
                    marginTop: pxToDp(8),
                  }}
                  source={require('../../asserts/images/wallet.png')}
                />
                <Text style={styles.ItemiconText3}>我的钱包</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemIcon}>
              <TouchableOpacity
                onPress={() => {
                  NavigationHelper.navigate('OrderLists');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 2,
                    height: pxToDp(17),
                    width: pxToDp(28),
                    backgroundColor: '#ff2d4b',
                    borderRadius: pxToDp(10),
                    alignItems: 'center',
                    zIndex: 999,
                  }}
                >
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: pxToDp(16),
                      lineHeight: pxToDp(17),
                    }}
                  >
                    {clientStatistics.orderInProgressNum}
                  </Text>
                </View>
                <Icon
                  name={'ing'}
                  style={{
                    color: '#FE9E0E',
                    fontSize: pxToDp(50),
                  }}
                />
                <Text style={styles.ItemiconText2}>进行中</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemIcon}>
              <TouchableOpacity
                onPress={() => {
                  NavigationHelper.navigate('EvaluateRelease');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 2,
                    height: pxToDp(17),
                    width: pxToDp(28),
                    backgroundColor: '#ff2d4b',
                    borderRadius: pxToDp(10),
                    alignItems: 'center',
                    zIndex: 999,
                  }}
                >
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: pxToDp(16),
                      lineHeight: pxToDp(17),
                    }}
                  >
                    {clientStatistics.orderRemainEvaluateNum}
                  </Text>
                </View>
                <Icon
                  name={'toEvaluate'}
                  style={{
                    color: '#FE9E0E',
                    fontSize: pxToDp(50),
                  }}
                />
                <Text style={styles.ItemiconText2}>待评价</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemIcon}>
              <TouchableOpacity
                onPress={() => {
                  NavigationHelper.navigate('AfterSales');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 10,
                    height: pxToDp(17),
                    width: pxToDp(28),
                    backgroundColor: '#ff2d4b',
                    borderRadius: pxToDp(10),
                    alignItems: 'center',
                    zIndex: 999,
                  }}
                >
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: pxToDp(16),
                      lineHeight: pxToDp(17),
                    }}
                  >
                    {clientStatistics.orderAfterSaleNum}
                  </Text>
                </View>
                <Icon
                  name={'after_sales'}
                  style={{
                    color: '#FE9E0E',
                    fontSize: pxToDp(50),
                  }}
                />
                <Text style={styles.ItemiconText2}>退款/售后</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.myOutPut}>
          <Text style={styles.myOutPut_text}>我的发布</Text>
        </View>
        <View>
          {/* <ScrollView> */}
          <ScrollView style={{ paddingBottom: pxToDp(0) }}>
            {myRequirements.map((v, i) => (
              <DemandList
                key={i}
                type={v.urgent}
                text={v.requirementTitle}
                date={v.createTime}
                requirementId={v.requirementId}
                expectedPrice={v.expectedPrice}
                expectedTime={v.expectedTime}
                urgent={v.urgent}
                communityNumber={v.communityNumber}
                proficiency={v.proficiency}
                categoryId={v.categoryId}
                requirementTitle={v.requirementTitle}
                requirementContentHtml={v.requirementContentHtml}
                requirementContent={v.requirementContent}
                getRequirmentFun={this.getRequirement()}
              />
            ))}
          </ScrollView>
          {/* </ScrollView> */}
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => {
              NavigationHelper.navigate('myDemand');
            }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>查看更多</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head_bg: {
    width: '100%',
    height: pxToDp(485),
    backgroundColor: '#fca21b',
    alignItems: 'center',
  },
  photo: {
    width: pxToDp(100),
    height: pxToDp(100),
    borderRadius: pxToDp(999),
  },
  section1_NamePhotoBorder: {
    width: '90%',
    height: pxToDp(100),
    // backgroundColor: "red",
    marginTop: pxToDp(116),
    flexDirection: 'row',
  },
  name_attention: {
    width: '70%',
    // backgroundColor: 'yellow',
    paddingLeft: pxToDp(23),
    paddingTop: pxToDp(10),
  },
  name: {
    fontSize: pxToDp(30),
    fontWeight: '700',
  },
  attentionBorder: {
    width: pxToDp(200),
    height: pxToDp(44),
    backgroundColor: '#ee991a',
    borderRadius: pxToDp(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  attentionNumber: {
    color: '#fbde69',
    fontSize: pxToDp(20),
  },
  fourIconBorder: {
    width: '90%',
    height: pxToDp(120),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: pxToDp(44),
  },
  ItemIcon: {
    alignItems: 'center',
    flex: 1,
  },
  ItemiconText: {
    fontSize: pxToDp(24),
    marginTop: pxToDp(10),
  },
  ItemiconText2: {
    fontSize: pxToDp(24),
    marginTop: pxToDp(10),
    color: '#000',
  },
  ItemiconText3: {
    fontSize: pxToDp(24),
    marginTop: pxToDp(16),
    color: '#000',
  },
  mySaleBorder: {
    marginTop: pxToDp(20),
    width: '90%',
    height: pxToDp(160),
    backgroundColor: '#fff',
    borderRadius: pxToDp(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  myOutPut: {
    width: '90%',
    alignSelf: 'center',
  },
  myOutPut_text: {
    fontSize: pxToDp(32),
    fontWeight: '700',
    marginTop: pxToDp(120),
  },
  btnView: {
    alignItems: 'center',
    marginTop: pxToDp(32),
  },
  btn: {
    width: pxToDp(360),
    height: pxToDp(88),
    backgroundColor: '#f9efe0',
    borderWidth: pxToDp(2),
    borderColor: '#fe9e0e',
    borderRadius: pxToDp(50),
    alignItems: 'center',
  },
  btnText: {
    lineHeight: pxToDp(88),
    color: '#fe9e0e',
    fontWeight: '700',
    fontSize: pxToDp(28),
  },
});

export default Index;

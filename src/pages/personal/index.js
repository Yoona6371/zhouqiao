import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import { pxToDp } from '../../utils/pxToDp';
import Icon from '../../components/common/Icon/index';
import DemandList from '../../components/bussiness/DemandList';
@inject('RootStore')
@observer
class Index extends Component {
  constructor(props) {
    super(props);
    if (this.props.RootStore.userStore.allData.token === null) {
      NavigationHelper.navigate('LoginAndRegister');
    }
    this.state = {
      myOrderNum: 9,
      awaitPayNum: 1,
      payingNum: 2,
      commentNum: 3,
      serviceNum: 1,
    };
  }
  render() {
    const {
      myOrderNum,
      awaitPayNum,
      payingNum,
      commentNumv,
      serviceNum,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.head_bg}>
          <TouchableOpacity>
            <View style={styles.section1_NamePhotoBorder}>
              <Image
                style={styles.photo}
                source={{
                  uri:
                    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=384029267,1578774283&fm=26&gp=0.jpg',
                }}
              />
              <View style={styles.name_attention}>
                <Text style={styles.name}>硕硕爱老虎</Text>
                <View style={styles.attentionBorder}>
                  <Text style={styles.attentionNumber}>关注数:7894</Text>
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
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon
                  name={'myCollect'}
                  style={{
                    color: '#000',
                    fontSize: pxToDp(60),
                  }}
                />
                <Text style={styles.ItemiconText}>我的收藏</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemIcon}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon
                  name={'zuji'}
                  style={{
                    color: '#000',
                    fontSize: pxToDp(60),
                  }}
                />
                <Text style={styles.ItemiconText}>浏览记录</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemIcon}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon
                  name={'myAttention'}
                  style={{
                    color: '#000',
                    fontSize: pxToDp(60),
                  }}
                />
                <Text style={styles.ItemiconText}>我的关注</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemIcon}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon
                  name={'sets'}
                  style={{
                    color: '#000',
                    fontSize: pxToDp(60),
                  }}
                />
                <Text style={styles.ItemiconText}>设置</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mySaleBorder}>
            <View style={styles.ItemIcon}>
              <TouchableOpacity
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
                  }}
                >
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: pxToDp(16),
                      lineHeight: pxToDp(17),
                    }}
                  >
                    {myOrderNum}
                  </Text>
                </View>
                <Icon
                  name={'myCollect'}
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
                  }}
                >
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: pxToDp(16),
                      lineHeight: pxToDp(17),
                    }}
                  >
                    {awaitPayNum}
                  </Text>
                </View>
                <Icon
                  name={'myCollect'}
                  style={{
                    color: '#FE9E0E',
                    fontSize: pxToDp(50),
                  }}
                />
                <Text style={styles.ItemiconText2}>待付款</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemIcon}>
              <TouchableOpacity
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
                  }}
                >
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: pxToDp(16),
                      lineHeight: pxToDp(17),
                    }}
                  >
                    {payingNum}
                  </Text>
                </View>
                <Icon
                  name={'myCollect'}
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
                  }}
                >
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: pxToDp(16),
                      lineHeight: pxToDp(17),
                    }}
                  >
                    {commentNumv}
                  </Text>
                </View>
                <Icon
                  name={'myCollect'}
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
                  }}
                >
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: pxToDp(16),
                      lineHeight: pxToDp(17),
                    }}
                  >
                    {serviceNum}
                  </Text>
                </View>
                <Icon
                  name={'myCollect'}
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
          <View style={{ paddingBottom: pxToDp(0) }}>
            <DemandList
              type={1}
              text="哈哈哈哈哈哈哈阿斯顿萨达萨达萨达萨达萨达萨达萨达撒"
              date="2021-02-11"
            />
            <DemandList
              type={1}
              text="哈哈哈哈哈哈哈阿斯顿萨达萨达萨达萨达萨达萨达萨达撒"
              date="2021-02-11"
            />
          </View>
          {/* </ScrollView> */}
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity>
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
    marginTop: pxToDp(40),
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

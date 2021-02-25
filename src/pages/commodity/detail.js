import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  InteractionManager,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Banner from '../../components/bussiness/banner';
import Icon from '../../components/common/Icon';
import UserXCard from '../../components/bussiness/UserXCard';
import TopTitle from '../../components/common/TopTitle';
import {
  flexColumnCenter,
  flexRowCenter,
  flexRowSpb,
  fontStyle,
  margin,
  padding,
} from '../../utils/StyleUtils';
import { deviceWidthDp, pxToDp } from '../../utils/pxToDp';

import { activeOpacity } from '../../constants/config';
import { log } from 'react-native-reanimated';

class CommodityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderPlaceholderOnly: true, //交互管理器延时控制标识
      caseId: '', //案例的id
      detailsData: [], //案例详情总数据
      isCollect: '', //是否被收藏
      detailsDataList: [], //图片展示的数据列表
      pictureList: [], //轮播图 的数据，在componentDidMount进行了封装
    };
  }
  componentDidMount = async () => {
    let { caseId } = this.state;
    //转场动画完成之后改变标记值，重新渲染dom
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderPlaceholderOnly: false });
    });
    //绑定案例id
    console.log('这里试试', this.props);
    console.log('ggg', this.props.route.params.caseId);
    console.log(this.state.caseId);
    let newCaseId = this.props.route.params.caseId;
    await this.setState({ caseId: newCaseId });
    console.log('我的案例id', this.state.caseId);
    //获取案例详情
    let res = await Http.CaseDetails({
      designCaseId: this.state.caseId.toString(),
    });
    let detailsData = res.data.data;
    console.log('案例详情数据', detailsData);
    // console.log('案例详情数据', detailsData.list);
    await this.setState({
      detailsData: detailsData,
      detailsDataList: detailsData.list,
      isCollect: detailsData.collected,
    });
    //改装轮播图数据
    let pictureList = [];
    this.state.detailsDataList.forEach((item) => {
      pictureList.push({
        title: item.designCaseId,
        subtitle: item.designCaseId,
        illustration: item.picturePath,
      });
    });
    this.setState({ pictureList: pictureList });
    // console.log('图片list',pictureList);
  };
  //点击收藏 取消收藏
  CollectOnclick = async () => {
    let { caseId } = this.state;
    if (!this.state.isCollect) {
      let i = await Http.CollectCase({}, '', false, {
        params: { designCaseId: caseId },
      });
      this.setState({ isCollect: !this.state.isCollect });
    } else {
      let j = await Http.DeleteCase({ designCaseId: caseId });
      this.setState({ isCollect: !this.state.isCollect });
    }
  };
  render() {
    const { detailsData, isCollect, detailsDataList } = this.state;
    console.log('render里的list', detailsData.list);
    return (
      <View style={{ flex: 1 }}>
        <TopTitle title={'案例详情'} showBtn={false} />
        <ScrollView
          style={{
            backgroundColor: '#fff',
            paddingTop: pxToDp(20),
            paddingBottom: pxToDp(100),
          }}
        >
          <View style={styles.banner_wrap}>
            {this.state.renderPlaceholderOnly ? null : (
              <Banner
                type={2}
                list={this.state.pictureList}
                listLength={this.state.pictureList.length}
              />
            )}
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.3)', 'rgba(34,34,34,1)']}
              style={styles.banner_footer}
            >
              <Text style={styles.banner_footer_text}>123</Text>
            </LinearGradient>
            <TouchableOpacity style={styles.icon_box}>
              <Icon
                name={'collect'}
                style={{
                  fontSize: pxToDp(36),
                  paddingBottom: pxToDp(4),
                  color: '#fff',
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.design_box}>
            <Text style={styles.design_box_title}>设计师介绍</Text>
            <UserXCard
              image={{ uri: detailsData.caseAuthorAvatar }}
              name={detailsData.caseAuthor}
              text={detailsData.collectNum}
            />
          </View>
          <View style={styles.case_wrap}>
            <View style={styles.case_header}>
              <Text style={styles.case_header_title}>案例介绍</Text>
              <View style={styles.case_header_title_right}>
                <Text
                  style={{
                    ...fontStyle(24, 28, 28, 'normal', '#1C223A', 'left'),
                  }}
                >
                  价格：
                </Text>
                <Text
                  style={{
                    ...fontStyle(32, 36, 36, 'bold', '#F92035', 'left'),
                  }}
                >
                  {detailsData.price}
                </Text>
              </View>
            </View>
            <Text style={styles.case_text}>
              {'     '}
              {detailsData.content}
            </Text>
          </View>
          <View style={styles.pages_wrap}>
            <Text style={styles.pages_title}>页面展示</Text>
            {detailsDataList.map((item) => {
              return (
                <Image
                  style={{ width: pxToDp(690), height: pxToDp(1000) }}
                  source={{
                    uri: item.picturePath,
                  }}
                />
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.commodity_footer}>
          <TouchableOpacity
            activeOpacity={activeOpacity}
            style={styles.commodity_footer_but}
            onPress={() => {
              this.CollectOnclick();
            }}
          >
            <Icon
              name={'collect'}
              style={{
                fontSize: pxToDp(25),
                color: isCollect ? '#fe9e0eFF' : '#A1A3A5',
              }}
            />
            <Text style={{ ...styles.but_text, marginTop: pxToDp(15) }}>
              收藏
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={activeOpacity}
            style={styles.commodity_footer_but2}
          >
            <Icon
              name={'consult'}
              style={{ fontSize: pxToDp(25), color: '#fff' }}
            />
            <Text style={{ ...styles.but2_text, marginLeft: pxToDp(18) }}>
              咨询
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={activeOpacity}
            style={styles.commodity_footer_but3}
          >
            <View style={{ ...flexRowCenter }}>
              <Text style={{ ...styles.but_text, color: '#fff' }}>价格：</Text>
              <Text style={{ ...styles.but3_text, marginLeft: pxToDp(28) }}>
                ￥{detailsData.price}
              </Text>
            </View>
            <Text style={{ ...styles.but2_text, marginTop: pxToDp(12) }}>
              立即购买
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CommodityDetail;
const styles = StyleSheet.create({
  banner_wrap: {
    alignItems: 'center',
    height: pxToDp(361),
    width: pxToDp(690),
    overflow: 'hidden',
    position: 'relative',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignSelf: 'center',
    backgroundColor: '#999',
  },
  banner_footer: {
    width: pxToDp(690),
    height: pxToDp(72),
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
  },
  banner_footer_text: {
    paddingLeft: pxToDp(30),
    ...fontStyle(28, 30, 30, 'normal', '#fff', 'left'),
  },
  icon_box: {
    width: pxToDp(55),
    height: pxToDp(55),
    borderRadius: 55 / 2,
    position: 'absolute',
    top: pxToDp(20),
    right: pxToDp(20),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    ...flexColumnCenter,
  },
  design_box: {},
  design_box_title: {
    ...fontStyle(32, 36, 36, 'bold', '#1C223A', 'left'),
    marginTop: pxToDp(50),
    marginLeft: pxToDp(30),
  },
  case_wrap: {
    ...margin(30, 49, 30, 0),
  },
  case_header: {
    ...flexRowSpb,
    marginBottom: pxToDp(40),
    height: pxToDp(36),
    overflow: 'hidden',
  },
  case_header_title: {
    ...fontStyle(32, 36, 36, 'bold', '#1C223A', 'left'),
  },
  case_header_title_right: {
    ...flexRowCenter,
  },
  case_text: {
    fontSize: pxToDp(24),
    lineHeight: pxToDp(40),
    color: '#666',
    marginBottom: pxToDp(50),
  },
  pages_wrap: {
    borderTopWidth: pxToDp(16),
    borderColor: '#F8F8F8',
    ...padding(30, 50, 30, 0),
  },
  pages_title: {
    ...fontStyle(32, 36, 36, 'bold', '#1C223A', 'left'),
    marginBottom: pxToDp(26),
  },
  commodity_footer: {
    width: deviceWidthDp,
    height: pxToDp(100),
    ...flexRowSpb,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  commodity_footer_but: {
    width: pxToDp(150),
    height: pxToDp(100),
    ...flexColumnCenter,
  },
  commodity_footer_but2: {
    width: pxToDp(300),
    height: pxToDp(100),
    backgroundColor: '#43B0F5',
    ...flexRowCenter,
  },
  commodity_footer_but3: {
    width: pxToDp(300),
    height: pxToDp(100),
    ...flexColumnCenter,
    backgroundColor: '#FE9E0E',
  },
  but_text: {
    ...fontStyle(22, 26, 26, 'normal', '#A1A3A5', 'center'),
  },
  but2_text: {
    ...fontStyle(28, 32, 32, 'bold', '#fff', 'center'),
  },
  but3_text: {
    ...fontStyle(28, 32, 32, 'bold', '#fff', 'center'),
  },
});

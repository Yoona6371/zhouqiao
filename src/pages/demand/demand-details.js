import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DemandCard from '../../components/bussiness/demandCard';
import Icon from '../../components/common/Icon';
import { flexRowCenter, fontStyle } from '../../utils/StyleUtils';
import { deviceWidthDp, pxToDp } from '../../utils/pxToDp';
import LabelCard from '../../components/bussiness/labelCard';
import { Image } from 'react-native-svg';
import TopTitle from '../../components/common/TopTitle';
import Toast from '../../components/common/Toast/Toast';
import Shimmer from 'react-native-shimmer';

// requirementId: 38719e6d4abb8464665e7908ba213b00
class DemandDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: true,
      urgent: 0,
      requirementTitle: ' ',
      publisherNick: ' ',
      expectedPrice: 0,
      requirementAbstract: ' ',
      createTime: [' ', ' ', ' '],
      category: ' ',
      content: ' ',
    };
  }

  componentDidMount() {
    // 获取需求详情
    this.requireDetail();
  }
  /**
   * {
  "code": 0,
  "msg": "操作成功",
  "data": {
    "requirementId": "38719e6d4abb8464665e7908ba213b00",
    "publisherId": "cfc241796dc3f8d4a86150a1131789d3",
    "publisherNick": "DAOKO",
    "categoryId": 1,
    "category": "ps",
    "requirementTitle": "页面前端开发",
    "requirementAbstract": "济南紫金玫瑰股份有限公司需要电商运营,网站前端开发",
    "communityNumber": 4,
    "communityNumberCurrent": 0,
    "status": 1,
    "createTime": [
      2021,
      2,
      20,
      10,
      24,
      26
    ],
    "updateTime": [
      2021,
      3,
      3,
      14,
      33,
      55
    ],
    "urgent": 1,
    "proficiency": 1,
    "expectedPrice": 5000,
    "expectedTime": 14,
    "accessory": "https://zhouqiao.oss-cn-beijing.aliyuncs.com/requirement/docs/fb30d9e7-f739-4a5f-95ad-e136e1850716.docx",
    "designerId": null,
    "content": "济南紫金玫瑰股份有限公司需要电商运营,网站前端开发",
    "contentHtml": "济南紫金玫瑰股份有限公司需要电商运营,网站前端开发"
  }
}
   */
  requireDetail = async () => {
    const detail = await Http.demandDetail(
      {},
      `/${this.props.route.params.requirementId}`,
    );

    console.log(detail);
    if (!(detail.status === 200)) {
      Toast.sad('加载失败');
      return;
    }

    const data = detail.data.data;
    this.setState({
      top: false,
      urgent: data.urgent,
      requirementTitle: data.requirementTitle,
      publisherNick: data.publisherNick,
      expectedPrice: data.expectedPrice,
      requirementAbstract: data.requirementAbstract,
      createTime: data.createTime,
      category: data.category,
      content: data.content,
    });
  };

  render() {
    const {
      top,
      urgent,
      requirementTitle,
      publisherNick,
      expectedPrice,
      requirementAbstract,
      createTime,
      category,
      content,
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {top ? (
          <Shimmer style={{ marginTop: pxToDp(30) }}>
            <View
              style={{
                height: pxToDp(45),
                width: deviceWidthDp,
                backgroundColor: '#eae8e8',
              }}
            />
          </Shimmer>
        ) : (
        <View>
        <TopTitle title={'需求详情'} showBtn={false} />
        <ScrollView style={{ backgroundColor: '#fff', paddingTop: pxToDp(20) }}>
          {/*demand卡片开始*/}
          <DemandCard
            type={urgent}
            project_contacts={publisherNick}
            project_budget={expectedPrice}
            project_escrow={expectedPrice}
            project_describe={requirementAbstract}
            project_Title={requirementTitle}
          />
          {/*demand卡片结束*/}
          {/*中间的盒子开始*/}
          <View
            style={{
              flexDirection: 'row',
              marginTop: pxToDp(59),
              marginLeft: pxToDp(31),
              position: 'relative',
            }}
          >
            {/*盒子左边部分开始*/}
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Text style={styles.demandBox_titleTxt}>需求详情</Text>
                </View>
                <View>
                  <Text style={styles.demandBox_dataText}>
                    {createTime[0]}-{createTime[1]}-{createTime[2]}发布
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: pxToDp(29) }}>
                <LabelCard typeText={category} />
              </View>
            </View>
            {/*盒子左边部分结束*/}
            {/*盒子右边-》附件部分开始*/}
            <TouchableOpacity style={styles.enclosure_btn}>
              <Icon
                name={'telUpdate'}
                style={{
                  color: '#fff',
                  fontSize: pxToDp(20),
                  paddingRight: pxToDp(10),
                }}
              />
              <Text style={styles.enclosure_btnText}>查看附件</Text>
            </TouchableOpacity>
            {/*盒子右边-》附件部分结束*/}
          </View>
          {/*中间的盒子结束*/}
          {/*长描述文本开始*/}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: pxToDp(40),
            }}
          >
            <View
              style={{
                width: pxToDp(683),
                height: pxToDp(224),
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              <Text
                style={{
                  color: '#666666FF',
                  fontSize: pxToDp(24),
                  lineHeight: pxToDp(40),
                }}
              >
                {content}
              </Text>
            </View>
          </View>
          {/*长描述文本结束*/}
          {/*底部图片开始*/}
          <View
            style={{
              marginTop: pxToDp(30),
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: pxToDp(8),
            }}
          >
            <View
              style={{
                width: pxToDp(690),
                height: pxToDp(300),
                // backgroundColor: 'red',
              }}
            >
              <Image />
            </View>
          </View>
          {/*底部图片结束*/}
          {/*底部按钮开始*/}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: pxToDp(166),
            }}
          >
            <TouchableOpacity
              onPress={() => NavigationHelper.replace('myDemand')}
            >
              <View style={styles.bottom_btn}>
                <Text style={{ color: '#FFFFFF' }}>确定</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/*底部按钮结束*/}
        </ScrollView>
        </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  demandBox_titleTxt: {
    ...fontStyle(32, 36, 36, 'bold', '#1B2439FF'),
  },
  demandBox_dataText: {
    ...fontStyle(24, 26, 26, 'normal', '#5F6575FF'),
    marginTop: pxToDp(10),
    marginLeft: pxToDp(39),
  },
  enclosure_btn: {
    ...flexRowCenter,
    width: pxToDp(167),
    height: pxToDp(50),
    backgroundColor: '#FE9E0EFF',
    borderRadius: pxToDp(25),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(253,128,10,0.3)',
    shadowOpacity: pxToDp(8),
    position: 'absolute',
    right: pxToDp(30),
    top: pxToDp(30),
  },
  enclosure_btnText: {
    ...fontStyle(24, 26, 26, 'normal', '#FFFFFF'),
  },
  long_text: {
    ...fontStyle(24, 26, 26, 'normal', '#666666FF'),
  },
  bottom_btn: {
    width: pxToDp(690),
    height: pxToDp(88),
    borderRadius: pxToDp(44),
    backgroundColor: '#FE9E0EFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pxToDp(96),
  },
});
export default DemandDetails;

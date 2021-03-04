import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Button,
} from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import {
  quotationMarks,
  under_quotationMarks,
  quotationMarks2,
  quotationMarks3,
  under_quotationMarks2,
  under_quotationMarks3,
} from '../../constants/svg';
import SvgUri from 'react-native-svg-uri';
import {
  fontStyle,
  padding,
  flexRowCenter,
  flexRowSpb,
  margin,
} from '../../utils/StyleUtils';
import Toast from '../common/Toast/Toast';

export class DemandList extends Component {
  // static propTypes = {
  // type: this.PropTypes.number
  // }
  constructor(props) {
    super(props);
    this.state = {
      typeText: '',
    };
    if (this.props.type === 1) {
      // this.setState({  typeText: this.props.type });
      // console.log(typeText,'constr')
    }
  }
  // 右上角类型切换
  // type=1是实训  type=2是公益  type=3是普通
  get typeStyle() {
    if (this.props.type === 0) {
      return {
        width: pxToDp(140),
        height: pxToDp(52),
        backgroundColor: '#F4D502',
        borderTopLeftRadius: pxToDp(0),
        borderTopRightRadius: pxToDp(10),
        borderBottomLeftRadius: pxToDp(26),
        borderBottomRightRadius: pxToDp(0),
        position: 'absolute',
        right: pxToDp(0),
        top: pxToDp(0),
      };
    } else if (this.props.type === 1) {
      return {
        width: pxToDp(140),
        height: pxToDp(52),
        backgroundColor: '#FE9E0E',
        borderTopLeftRadius: pxToDp(0),
        borderTopRightRadius: pxToDp(10),
        borderBottomLeftRadius: pxToDp(26),
        borderBottomRightRadius: pxToDp(0),
        position: 'absolute',
        right: pxToDp(0),
        top: pxToDp(0),
      };
    }
  }
  get left_gang() {
    if (this.props.type === 0) {
      return {
        width: pxToDp(6),
        height: pxToDp(24),
        backgroundColor: '#FE9E0E',
        borderRadius: pxToDp(3),
        ...margin(13, 33, 0, 0),
      };
    } else if (this.props.type === 1) {
      return {
        width: pxToDp(6),
        height: pxToDp(24),
        backgroundColor: '#14C2FB',
        borderRadius: pxToDp(3),
        ...margin(13, 33, 0, 0),
      };
    }
  }

  onEdit = () => {
    NavigationHelper.navigate('DemandSet', {
      expectedPrice: this.props.expectedPrice,
      expectedTime: this.props.expectedTime,
      urgent: this.props.urgent,
      communityNumber: this.props.communityNumber,
      proficiency: this.props.proficiency,
      categoryId: this.props.categoryId,
      requirementTitle: this.props.requirementTitle,
      requirementContentHtml: this.props.requirementContentHtml,
      requirementContent: this.props.requirementContent,
      requirementId: this.props.requirementId,
    });
  };

  onDelete = () => {
    Http.demandDelete({}, '/' + this.props.requirementId).then((res) => {
      if (res.status === 200) {
        Toast.success(res.data.msg, 1000, 'center');
      } else {
        Toast.fail(res.data.msg, 1000, 'center');
      }
    });
  };

  render() {
    const { type, text, date, requirementTitle } = this.props;
    const { typeText } = this.state;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          NavigationHelper.navigate('DemandDetails', {
            requirementId: this.props.requirementId,
          });
        }}
      >
        {/* 1.0需求列表最小单元开始 */}
        <View style={styles.borderStyle}>
          {/* 背景图片 */}
          <ImageBackground
            style={{
              height: pxToDp(184),
              width: pxToDp(241),
              position: 'absolute',
              top: pxToDp(45),
              left: pxToDp(11),
            }}
            source={
              type === 0 ? (
                require('../../asserts/images/shixun.png')
              ) : type === 1 ? (
                require('../../asserts/images/putong.png')
              ) : (
                <></>
              )
            }
          />
          {/* 背景图片 */}
          {/* 2.0右上角的标签开始 */}
          <View style={{ ...this.typeStyle }}>
            {type === 0 ? (
              <Text style={styles.labelText}>普通</Text>
            ) : type === 1 ? (
              <Text style={styles.labelText}>加急</Text>
            ) : (
              <></>
            )}
          </View>
          {/* 2.0右上角的标签结束 */}
          {/* 3.0左上角标题开始 */}
          <View style={styles.leftBox}>
            <View style={{ ...this.left_gang }} />
            {type === 0 ? (
              <Text style={styles.left_title}>{requirementTitle}</Text>
            ) : type === 1 ? (
              <Text style={styles.left_title}>{requirementTitle}</Text>
            ) : (
              <></>
            )}
          </View>
          {/* 3.0左上角标题结束 */}
          {/* 4.0中间内容部分 */}
          <View>
            <SvgUri
              svgXmlData={
                type === 0 ? (
                  quotationMarks
                ) : type === 1 ? (
                  quotationMarks3
                ) : (
                  <></>
                )
              }
              width={pxToDp(22)}
              height={pxToDp(14)}
              style={styles.quotationMarks}
            />
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {text}
            </Text>
            <SvgUri
              svgXmlData={
                type === 0 ? (
                  under_quotationMarks
                ) : type === 1 ? (
                  under_quotationMarks3
                ) : (
                  <></>
                )
              }
              width={pxToDp(32)}
              height={pxToDp(20)}
              style={styles.under_quotationMarks}
            />
          </View>
          {/* 4.0中间内容部分结束 */}
          {/* 5.0底部时间和按钮开始*/}
          <View style={styles.releaseTimeAndBtnBox}>
            <Text style={styles.releaseTime}>发布时间 : {date}</Text>
            <TouchableOpacity
              style={styles.delButtonStyle}
              onPress={this.onDelete}
            >
              <Text style={styles.delButtonStyleText}>删除</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButtonStyle}
              onPress={this.onEdit}
            >
              <Text style={styles.editButtonStyleText}>编辑</Text>
            </TouchableOpacity>
          </View>
          {/* 5.0底部时间和按钮结束*/}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  borderStyle: {
    alignContent: 'center',
    width: pxToDp(690),
    height: pxToDp(260),
    backgroundColor: '#FFFFFF',
    borderRadius: pxToDp(10),
    marginTop: pxToDp(20),
  },
  label: {
    width: pxToDp(140),
    height: pxToDp(52),
    // backgroundColor: '#F4D502',
    borderTopLeftRadius: pxToDp(0),
    borderTopRightRadius: pxToDp(10),
    borderBottomLeftRadius: pxToDp(26),
    borderBottomRightRadius: pxToDp(0),
    position: 'absolute',
    right: pxToDp(0),
    top: pxToDp(0),
  },
  labelText: {
    ...fontStyle(24, 42, 50, '700', '#FFFFFF', 'center'),
  },
  leftBox: {
    flexDirection: 'row',
  },
  left_gang: {
    width: pxToDp(6),
    height: pxToDp(24),
    backgroundColor: '#FE9E0E',
    borderRadius: pxToDp(3),
    ...margin(13, 33, 0, 0),
  },
  left_title: {
    ...fontStyle(32, 36, 42, '700', '#333333', 'left'),
    ...margin(12, 26, 0, 0),
  },
  quotationMarks: {
    ...margin(29, 40, 0, 0),
  },
  text: {
    marginLeft: pxToDp(70),
    width: pxToDp(510),
    ...fontStyle(22, 42, 42, '400', '#918D87', 'left'),
  },
  under_quotationMarks: {
    ...margin(581, 0, 0, 0),
  },
  releaseTimeAndBtnBox: {
    flexDirection: 'row',
  },
  releaseTime: {
    ...fontStyle(24, 42, 42, '500', '#999999', 'left'),
    ...margin(30, 20, 0, 0),
  },
  delButtonStyle: {
    alignItems: 'center',
    borderRadius: pxToDp(26),
    backgroundColor: '#FFEFF0',
    width: pxToDp(120),
    height: pxToDp(52),
    ...margin(120, 18, 0, 0),
  },
  delButtonStyleText: {
    ...fontStyle(24, 52, 48, '500', '#FF2B3A', 'left'),
  },
  editButtonStyle: {
    alignItems: 'center',
    borderRadius: pxToDp(26),
    backgroundColor: '#FFF7EA',
    width: pxToDp(120),
    height: pxToDp(52),
    ...margin(20, 18, 0, 0),
  },
  editButtonStyleText: {
    ...fontStyle(24, 52, 48, '500', '#FE9E0E', 'left'),
  },
});

export default DemandList;

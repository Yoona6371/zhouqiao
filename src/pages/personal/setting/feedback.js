import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { fontStyle, margin, padding } from '../../../utils/StyleUtils';
import { pxToDp } from '../../../utils/pxToDp';
import Icon from '../../../components/common/Icon';
import Avatar from '../../../components/common/Avatar';
import TopTitle from '../../../components/common/TopTitle';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
    };
  }
  render() {
    let { avatar } = this.state;
    return (
      <ScrollView style={styles.feedback__wrap}>
        <TopTitle
          returnBack={() => {
            this.props.navigation.goBack();
          }}
          title="资料编辑"
          showBtn={false}
          style={{ marginBottom: pxToDp(30) }}
        />
        <TextInput
          multiline={true}
          style={{ ...styles.feedback, height: pxToDp(251) }}
          placeholder={'请输入要反馈的问题（5-500字以内）'}
          textAlignVertical={'top'}
        />
        <View style={{ ...styles.feedback, ...styles.feedback_picture }}>
          <Text style={styles.picture_top}>请提供问题的截图或照片（选填）</Text>
          <View style={styles.picture_middle}>
            <Avatar image={{ uri: avatar }} size={80} />
          </View>
          <TouchableOpacity style={styles.pictrue_bottom}>
            <Icon
              name={'camera'}
              style={styles.pictrue_camera}
              width={pxToDp(80)}
              height={pxToDp(80)}
            />
            <Text style={{ alignSelf: 'center' }}>添加图片</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.tips}>
          您的反馈意见我们会尽快处理，但无法保证每一条反馈及时处
          理，如有紧急意见，请拨打客服电话400 265 5495
        </Text>
        <View style={styles.submit}>
          <Text style={styles.submit_text}>提交</Text>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  feedback__wrap: {
    flex: 1,
    ...padding(30, 0, 30, 0),
    backgroundColor: '#fff',
  },
  feedback: {
    backgroundColor: '#f8f8f8',
    borderRadius: pxToDp(10),
  },
  feedback_picture: {
    marginTop: pxToDp(20),
  },
  picture_top: {
    ...padding(30, 30, 0, 30),
    ...fontStyle(24, 83, 26, '500', '#333'),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#ddd',
  },
  picture_middle: {
    ...margin(30, 30, 30, 0),
    minHeight: pxToDp(160),
  },
  pictrue_bottom: {
    ...margin(30, 30, 0, 30),
    width: pxToDp(160),
    height: pxToDp(160),
    backgroundColor: '#f0f0f0',
  },
  pictrue_camera: {
    color: '#9d9d9d',
    alignSelf: 'center',
    marginTop: pxToDp(30),
  },
  tips: {
    fontSize: pxToDp(24),
    lineHeight: pxToDp(40),
    fontWeight: '500',
    color: '#999',
  },
  submit: {
    backgroundColor: '#ff9900',
    // ...padding(315, 26, 315, 26),
    ...margin(30, 96, 30, 434),
    borderRadius: pxToDp(10),
  },
  submit_text: {
    ...margin(0, 26, 0, 26),
    ...fontStyle(30, 32, 32, 'bold', '#fff', 'center'),
  },
});

export default Test;

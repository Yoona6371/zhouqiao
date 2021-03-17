import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  Button,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';

// 文件操作库
var RNFS = require('react-native-fs');

// 引入接口
import { inject } from 'mobx-react';
import axios from 'axios';
import Overlay from '../../components/common/Overlay/Overlay';
import Toast from '../../components/common/Toast/Toast';
import { pxToDp } from '../../utils/pxToDp';
import DocumentPicker from 'react-native-document-picker';

// 聊天UI库
import IMUI from 'aurora-imui-react-native';
import { margin, padding, fontStyle } from '../../utils/StyleUtils';
const InputView = IMUI.ChatInput;
const MessageListView = IMUI.MessageList;
const AuroraIController = IMUI.AuroraIMUIController;
const window = Dimensions.get('window');

// 创建各种类型消息
function constructNormalMessage() {
  var message = {};
  message.msgId = '';
  message.status = 'send_succeed';
  message.isOutgoing = true;
  message.timeString = '';
  message.fromUser = {
    userId: '',
    displayName: '',
    avatarPath: '',
  };

  return message;
}

@inject('RootStore')
class TestRNIMUI extends Component {
  constructor(props) {
    super(props);
    let initHeight;
    if (Platform.OS === 'ios') {
      initHeight = 46;
    } else {
      initHeight = 100;
    }
    this.state = {
      inputLayoutHeight: initHeight,
      messageListLayout: { flex: 1, width: window.width, margin: 0 },
      inputViewLayout: { width: window.width, height: initHeight },
      isAllowPullToRefresh: true,
      navigationBar: {},
      page: 2,
    };
    this.updateLayout = this.updateLayout.bind(this);
    this.onMsgClick = this.onMsgClick.bind(this);
    this.messageListDidLoadEvent = this.messageListDidLoadEvent.bind(this);
  }

  async componentDidMount() {
    /**
     * Android only
     * Must set menu height once, the height should be equals with the soft keyboard height so that the widget won't flash.
     * 在别的界面计算一次软键盘的高度，然后初始化一次菜单栏高度，如果用户唤起了软键盘，则之后会自动计算高度。
     */
    if (Platform.OS === 'android') {
      this.refs.ChatInput.setMenuContainerHeight(316);
    }
    this.resetMenu();
    if (
      this.props.RootStore.globalStore.allData.Socket._callbacks
        .$messageptop === undefined
    ) {
      console.log('添加监听');
      this.props.RootStore.globalStore.allData.Socket.on(
        'messageptop',
        (data) => {
          this.onReceiveText(
            JSON.parse(data).msgContent,
            JSON.parse(data).contentType,
            JSON.parse(data).fromAvatar,
          );
        },
      );
    }
    AuroraIController.addMessageListDidLoadListener(
      this.messageListDidLoadEvent,
    );
  }

  messageListDidLoadEvent() {
    this.getHistoryMessage();
  }

  // 获取历史消息
  async getHistoryMessage() {
    // console.log(111111111111111, this.props.RootStore.userStore);
    AuroraIController.removeAllMessage();
    let res = await Http.messageDetail({
      formId: this.props.route.params.fromId,
      megType: 1,
      page: 1,
      size: 20,
      // toId: this.props.route.params.toId,
    });
    // console.log(res.data.data.records);
    const messagesHistory = res.data.data.records;
    const messages = [];
    let messageIds = '';
    messagesHistory.forEach((v, i) => {
      if (v.status === 0) {
        if (messageIds === '') {
          messageIds += JSON.stringify(v.massage_id);
        } else {
          messageIds = messageIds + ',' + JSON.stringify(v.massage_id);
        }
      }
      const message = constructNormalMessage();
      message.msgId = v.massage_id;
      if (v.content_type === 0) {
        message.msgType = 'text';
        message.text = v.msg_content;
      } else if (v.content_type === 1) {
        message.msgType = 'image';
        message.mediaPath = v.msg_content;
      }
      message.timeString = new Date(v.create_time).toLocaleTimeString();
      message.contentSize = { height: 100, width: 200 };
      // 修改
      if (this.props.route.params.fromId !== v.from_id) {
        // 修改
        message.isOutgoing = true;
        message.fromUser.avatarPath = this.props.route.params.avatar_self;
      } else {
        message.isOutgoing = false;
        // 修改
        message.fromUser.avatarPath = this.props.route.params.avatar_opposite;
      }
      messages.push(message);
    });
    if (messageIds !== '') {
      Http.ifRead({
        messageIds,
      }).then((res) => {
        console.log(res);
      });
    }

    AuroraIController.appendMessages(messages);
    AuroraIController.scrollToBottom(true);
  }

  onInputViewSizeChange = (size) => {
    console.log(
      'onInputViewSizeChange height: ' + size.height + ' width: ' + size.width,
    );
    if (this.state.inputLayoutHeight !== size.height) {
      this.setState({
        inputLayoutHeight: size.height,
        inputViewLayout: { width: window.width, height: size.height },
        messageListLayout: { flex: 1, width: window.width, margin: 0 },
      });
    }
  };

  componentWillUnmount() {
    AuroraIController.removeMessageListDidLoadListener(
      this.messageListDidLoadEvent,
    );
    console.log('进入willunmount');
    // this.props.RootStore.globalStore.allData.Socket.close(
    //   'messageptop',
    //   (data) => {
    //     console.log('进入取消监听');
    //     console.log(data);
    //   },
    // );
    console.log('取消监听结束');
  }

  resetMenu() {
    if (Platform.OS === 'android') {
      this.refs.ChatInput.showMenu(false);
      this.setState({
        messageListLayout: { flex: 1, width: window.width, margin: 0 },
        navigationBar: { height: 64, justifyContent: 'center' },
      });
      this.forceUpdate();
    } else {
      AuroraIController.hidenFeatureView(true);
    }
  }

  /**
   * Android need this event to invoke onSizeChanged
   */
  onTouchEditText = () => {
    this.refs.ChatInput.showMenu(false);
  };

  onFullScreen = () => {
    console.log('on full screen');
    this.setState({
      messageListLayout: { flex: 0, width: 0, height: 0 },
      inputViewLayout: { flex: 1, width: window.width, height: window.height },
      navigationBar: { height: 0 },
    });
  };

  onRecoverScreen = () => {
    // this.setState({
    //   inputLayoutHeight: 100,
    //   messageListLayout: { flex: 1, width: window.width, margin: 0 },
    //   inputViewLayout: { flex: 0, width: window.width, height: 100 },
    //   navigationBar: { height: 64, justifyContent: 'center' }
    // })
  };

  onAvatarClick = (message) => {
    Alert.alert();
    AuroraIController.removeMessage(message.msgId);
  };

  onMsgClick(message) {
    console.log(message);
    Alert.alert('message', JSON.stringify(message));
  }

  onMsgLongClick = (message) => {
    // console.log(message);
    let overlayView = (
      <Overlay.PopView
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            minWidth: 180,
            minHeight: 100,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              ...fontStyle(32, 60, 60, 'bold', '#333', 'center'),
              paddingBottom: pxToDp(20),
            }}
          >
            确定撤回此条消息？
          </Text>
          <TouchableOpacity
            onPress={() => {
              Overlay.hide(key);
              this.messageRevoke(message);
            }}
            style={{
              flex: 0.4,
              ...fontStyle(24, 40, 40, '500', '#FFF', 'center'),
            }}
          >
            <Text
              style={{
                width: pxToDp(320),
                height: pxToDp(80),
                backgroundColor: '#ffb340',
                borderRadius: pxToDp(20),
                lineHeight: pxToDp(80),
                textAlign: 'center',
              }}
            >
              草率了，坚持撤回!
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay.PopView>
    );
    let key = Overlay.show(overlayView);
    // Alert.alert('message bubble on long press', 'message bubble on long press');
  };
  messageRevoke = (message) => {
    let msgId = message.msgId;
    // console.log(message);
    Http.revoke({ messageId: msgId }).then((res) => {
      // console.log(res);
      if (res.data.data === msgId) {
        Toast.success('撤销成功', 1000, 'center');
        AuroraIController.removeMessage(msgId);
      } else {
        Toast.fail(res.data.data, 1000, 'center');
      }
    });
  };

  onStatusViewClick = (message) => {
    message.status = 'send_succeed';
    AuroraIController.updateMessage(message);
  };

  onBeginDragMessageList = () => {
    this.resetMenu();
    AuroraIController.hidenFeatureView(true);
  };

  onTouchMsgList = () => {
    AuroraIController.hidenFeatureView(true);
  };

  onPullToRefresh = async () => {
    let messages = [];
    let res = await Http.messageDetail({
      formId: this.props.route.params.fromId,
      megType: 1,
      page: this.state.page,
      size: 10,
      // toId: this.props.route.params.toId,
    });
    // console.log(res.data.data.records);
    this.setState({ page: this.state.page + 1 });
    res.data.data.records.forEach((v, i) => {
      var message = constructNormalMessage();
      if (v.content_type === 0) {
        message.msgType = 'text';
        message.text = v.msg_content;
      } else if (v.content_type === 1) {
        message.msgType = 'image';
        message.mediaPath = v.msg_content;
      }
      message.timeString = new Date(v.create_time).toLocaleTimeString();
      message.contentSize = { height: 100, width: 200 };
      // message.extras = { extras: 'fdfsf' };
      if (this.props.route.params.fromId === v.from_id) {
        message.isOutgoing = true;
        message.fromUser.avatarPath = this.state.avatar;
      } else {
        message.isOutgoing = false;
        message.fromUser.avatarPath = v.from_avatar;
      }
      messages.push(message);
    });
    AuroraIController.insertMessagesToTop(messages);
    if (Platform.OS === 'android') {
      this.refs.MessageList.refreshComplete();
    }
  };

  // 发送文本消息
  onSendText = (text) => {
    let message = constructNormalMessage();
    message.msgType = 'text';
    message.text = text;
    Http.send({
      contentType: 0,
      formId: this.props.route.params.toId,
      message: text,
      msgType: 1,
      toId: this.props.route.params.fromId,
    }).then((res) => {
      console.log(123123, res);
      if (res.data.code === 0) {
        AuroraIController.appendMessages([message]);
      } else {
        Toast.fail(res.data.msg);
      }
    });
  };
  // 接收消息
  onReceiveText = (text, type, avatar) => {
    let message = constructNormalMessage();
    if (type === 0) {
      message.msgType = 'text';
      message.text = text;
    } else if (type === 1) {
      message.msgType = 'image';
      message.mediaPath = text;
    }
    message.fromUser.avatarPath = avatar;
    message.isOutgoing = false;
    AuroraIController.appendMessages([message]);
  };

  onTakePicture = (media) => {
    console.log('media ' + JSON.stringify(media));
    let message = constructNormalMessage();
    message.msgType = 'image';
    message.mediaPath = media.mediaPath;
    this.onSendGalleryFiles([message]);
    AuroraIController.appendMessages([message]);
    this.resetMenu();
    AuroraIController.scrollToBottom(true);
  };

  onStartRecordVoice = (e) => {
    console.log('on start record voice');
  };

  onFinishRecordVoice = async (mediaPath, duration) => {
    // console.log(mediaPath);
    let message = constructNormalMessage();
    message.msgType = 'voice';
    message.mediaPath = mediaPath;
    message.timeString = new Date().toLocaleTimeString();
    message.duration = duration;
    let formData = new FormData();
    let path = mediaPath.split('/');
    let uri = '';
    for (let i = 0; i < path.length - 1; i++) {
      uri += '/' + path[i];
    }
    formData.append('file', {
      uri: 'file:' + uri,
      duration: duration,
      type: 'voice',
      name: path[path.length - 1],
    });
    formData.append('contentType', 1);
    formData.append('msgType', 1);
    formData.append('toId', this.props.route.params.fromId);
    // console.log(formData);
    AuroraIController.appendMessages([message]);
    let res = await axios.post(
      'http://www.zhouqiao.art:8080/api/message/chat/upimg',
      formData,
      {
        headers: {
          Authorization: `Bearer ${this.props.RootStore.userStore.allData.accessToken}`,
          'Content-Type': 'multiple/form-data',
        },
      },
    );
    console.log('on finish record voice');
  };

  onCancelRecordVoice = () => {
    console.log('on cancel record voice');
  };

  onStartRecordVideo = () => {
    console.log('on start record video');
  };

  onFinishRecordVideo = (video) => {
    // var message = constructNormalMessage()
    // message.msgType = "video"
    // message.mediaPath = video.mediaPath
    // message.duration = video.duration
    // AuroraIController.appendMessages([message])
  };

  // 发送图片
  onSendGalleryFiles = (mediaFiles) => {
    // 由于图片大小需要做裁剪
    // console.log(mediaFiles);
    // Alert.alert('fas', JSON.stringify(mediaFiles));
    // mediaFiles.forEach((v, i) => {
    //   let message = constructNormalMessage();
    //   if (v.mediaType === 'image') {
    //     message.msgType = 'image';
    //     message.status = 'send_going';
    //     message.mediaPath = v.mediaPath;
    //     AuroraIController.appendMessages([message]);
    //     AuroraIController.scrollToBottom(true);
    //     let arr = v.mediaPath.split('/');
    //     let last = arr[arr.length - 1];
    //     let file = {
    //       uri: 'file://' + v.mediaPath,
    //       type: v.mediaType,
    //       size: v.size,
    //       width: v.width,
    //       height: v.height,
    //       name: last,
    //     };
    //     let formData = new FormData();
    //     formData.append('file', v);
    //     formData.append('contentType', 0);
    //     formData.append('msgType', 0);
    //     formData.append('toId', 0);
    //     axios
    //       .post(
    //         'http://www.zhouqiao.art:8080/api/message/chat/upimg',
    //         formData,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${this.props.RootStore.userStore.allData.accessToken}`,
    //           },
    //         },
    //       )
    //       .then((res) => {
    //         console.log(1111111111111, res);
    //       })
    //       .catch((err) => {
    //         console.log(22222222222222222, err);
    //       });
    //     console.log('11111111111111111');
    //   } else {
    //     message.msgType = 'video';
    //     message.duration = v.duration;
    //     message.mediaPath = v.mediaPath;
    //     message.status = 'send_going';
    //     AuroraIController.appendMessages([message]);
    //     AuroraIController.scrollToBottom(true);
    //   }
    //   // message.timeString = '8:00';
    // });
    // this.resetMenu();
  };

  onSwitchToMicrophoneMode = () => {
    AuroraIController.scrollToBottom(true);
  };

  onSwitchToEmojiMode = () => {
    AuroraIController.scrollToBottom(true);
  };
  onSwitchToGalleryMode = async () => {
    let message = constructNormalMessage();
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      let formData = new FormData();
      formData.append('file', res);
      formData.append('contentType', 1);
      formData.append('msgType', 2);
      formData.append('toId', this.props.route.params.fromId);
      message.msgType = 'image';
      message.status = 'send_going';
      message.mediaPath = res.uri;
      AuroraIController.appendMessages([message]);
      AuroraIController.scrollToBottom(true);
      let res2 = await axios.post(
        'http://www.zhouqiao.art:8080/api/message/chat/upimg',
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.props.RootStore.userStore.allData.accessToken}`,
          },
        },
      );
      if (res2.data.code === 0) {
        AuroraIController.updateMessage({ ...message, status: 'send_succeed' });
      } else {
        Toast.fail(res.data.msg);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('cancleErr', err);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log(err);
        throw err;
      }
    }
    // AuroraIController.scrollToBottom(true);
  };

  onSwitchToCameraMode = () => {
    AuroraIController.scrollToBottom(true);
  };

  onShowKeyboard = (keyboard_height) => {};

  updateLayout(layout) {
    this.setState({ inputViewLayout: layout });
  }

  onInitPress() {
    console.log('on click init push ');
    this.updateAction();
  }

  onClickSelectAlbum = () => {
    console.log('on click select album');
  };

  onCloseCamera = () => {
    console.log('On close camera event');
    this.setState({
      inputLayoutHeight: 100,
      messageListLayout: { flex: 1, width: window.width, margin: 0 },
      inputViewLayout: { flex: 0, width: window.width, height: 100 },
      navigationBar: { height: 64, justifyContent: 'center' },
    });
  };

  /**
   * Switch to record video mode or not
   */
  switchCameraMode = (isRecordVideoMode) => {
    console.log(
      'Switching camera mode: isRecordVideoMode: ' + isRecordVideoMode,
    );
    // If record video mode, then set to full screen.
    if (isRecordVideoMode) {
      this.setState({
        messageListLayout: { flex: 0, width: 0, height: 0 },
        inputViewLayout: {
          flex: 1,
          width: window.width,
          height: window.height,
        },
        navigationBar: { height: 0 },
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={this.state.navigationBar} ref="NavigatorView">
          <Text
            style={{
              ...padding(20, 50, 20, 50),
              ...fontStyle(34, 136, 36, '500', '#000'),
              backgroundColor: '#F5FCFF',
              zIndex: 1,
            }}
          >
            {this.props.route.params.nickName}
          </Text>
        </View>
        <MessageListView
          style={this.state.messageListLayout}
          ref="MessageList"
          isAllowPullToRefresh={true}
          onAvatarClick={this.onAvatarClick}
          // onMsgClick={this.onMsgClick}
          onStatusViewClick={this.onStatusViewClick}
          onTouchMsgList={this.onTouchMsgList}
          onTapMessageCell={this.onTapMessageCell}
          onBeginDragMessageList={this.onBeginDragMessageList}
          onPullToRefresh={this.onPullToRefresh}
          onMsgLongClick={this.onMsgLongClick}
          avatarSize={{ width: 50, height: 50 }}
          avatarCornerRadius={25}
          messageListBackgroundColor={'#f3f3f3'}
          sendBubbleTextSize={18}
          sendBubbleTextColor={'#000000'}
          sendBubblePadding={{ left: 10, top: 10, right: 15, bottom: 10 }}
          datePadding={{ left: 5, top: 5, right: 5, bottom: 5 }}
          dateBackgroundColor={'#F3F3F3'}
          photoMessageRadius={5}
          maxBubbleWidth={0.7}
          videoDurationTextColor={'#ffffff'}
        />
        <InputView
          style={this.state.inputViewLayout}
          ref="ChatInput"
          onSendText={this.onSendText}
          onTakePicture={this.onTakePicture}
          onStartRecordVoice={this.onStartRecordVoice}
          onFinishRecordVoice={this.onFinishRecordVoice}
          onCancelRecordVoice={this.onCancelRecordVoice}
          onStartRecordVideo={this.onStartRecordVideo}
          onFinishRecordVideo={this.onFinishRecordVideo}
          onSendGalleryFiles={this.onSendGalleryFiles}
          onSwitchToEmojiMode={this.onSwitchToEmojiMode}
          onSwitchToMicrophoneMode={this.onSwitchToMicrophoneMode}
          onSwitchToGalleryMode={this.onSwitchToGalleryMode}
          onSwitchToCameraMode={this.onSwitchToCameraMode}
          onShowKeyboard={this.onShowKeyboard}
          onTouchEditText={this.onTouchEditText}
          onFullScreen={this.onFullScreen}
          onRecoverScreen={this.onRecoverScreen}
          onSizeChange={this.onInputViewSizeChange}
          closeCamera={this.onCloseCamera}
          switchCameraMode={this.switchCameraMode}
          showSelectAlbumBtn={false}
          showRecordVideoBtn={false}
          onClickSelectAlbum={this.onClickSelectAlbum}
          inputPadding={{ left: 30, top: 10, right: 10, bottom: 10 }}
          galleryScale={0.6} //default = 0.5
          compressionQuality={0.6}
          cameraQuality={0.7} //default = 0.5
          customLayoutItems={{
            left: [],
            right: ['send'],
            bottom: ['voice', 'gallery', 'emoji', 'camera'],
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sendCustomBtn: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: pxToDp(50),
  },
  inputView: {
    backgroundColor: 'green',
    width: window.width,
    height: 100,
  },
  btnStyle: {
    marginTop: 10,
    borderWidth: 3,
    borderColor: '#3e83d7',
    borderRadius: 8,
    backgroundColor: '#3e83d7',
  },
});
export default TestRNIMUI;

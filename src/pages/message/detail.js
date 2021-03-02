import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  Button,
  Platform,
} from 'react-native';

// 文件操作库
var RNFS = require('react-native-fs');

// 引入接口
import { inject } from 'mobx-react';

// 聊天UI库
import IMUI from 'aurora-imui-react-native';
const InputView = IMUI.ChatInput;
const MessageListView = IMUI.MessageList;
const AuroraIController = IMUI.AuroraIMUIController;
const window = Dimensions.get('window');

let themsgid = 1;

// 创建各种类型消息
function constructNormalMessage() {
  var message = {};
  message.msgId = themsgid.toString();
  themsgid += 1;
  message.status = 'send_succeed';
  message.isOutgoing = true;
  message.timeString = new Date().getFullYear().toString();
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
    AuroraIController.addMessageListDidLoadListener(
      this.messageListDidLoadEvent,
    );
  }

  messageListDidLoadEvent() {
    this.getHistoryMessage();
  }

  // 获取历史消息
  async getHistoryMessage() {
    // console.log(this.props.route.params.fromId);
    // console.log(this.props.route.params.toId);
    let res = await Http.messageDetail({
      formId: this.props.route.params.fromId,
      megType: 1,
      page: 1,
      size: 20,
      toId: this.props.route.params.toId,
    });
    // isArr = Object.prototype.toString.call(data) == '[object Array]';
    const messagesHistory = res.data.data.records;
    const messages = [];
    // console.log(res.data.data.records);
    // console.log(typeof res.data.data.records);
    messagesHistory.forEach((v, i) => {
      const message = constructNormalMessage();
      if (v.msg_type === 1) {
        message.msgType = 'text';
        message.text = v.msg_content;
      } else if (v.msg_type === 2) {
        message.msgType = 'image';
        message.mediaPath = '';
      }
      message.timeString = new Date(v.create_time).toLocaleTimeString();
      message.contentSize = { height: 100, width: 200 };
      // message.extras = { extras: 'fdfsf' };
      // 修改
      if (this.props.route.params.fromId === v.from_id) {
        // 修改
        message.isOutgoing = true;
        message.fromUser.avatarPath = this.state.avatar;
      } else {
        message.isOutgoing = false;
        // 修改
        message.fromUser.avatarPath = v.from_avatar;
      }
      messages.push(message);
    });
    AuroraIController.appendMessages(messages);
    AuroraIController.scrollToBottom(true);
  }

  onInputViewSizeChange = (size) => {
    console.log(
      'onInputViewSizeChange height: ' + size.height + ' width: ' + size.width,
    );
    if (this.state.inputLayoutHeight != size.height) {
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
    Alert.alert('message bubble on long press', 'message bubble on long press');
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

  onPullToRefresh = () => {
    console.log('on pull to refresh');
    var messages = [];
    for (var i = 0; i < 14; i++) {
      var message = constructNormalMessage();
      // if (index%2 == 0) {
      message.msgType = 'text';
      message.text = '' + i;
      // }

      if (i % 3 == 0) {
        message.msgType = 'video';
        message.text = '' + i;
        message.mediaPath =
          '/storage/emulated/0/ScreenRecorder/screenrecorder.20180323101705.mp4';
        message.duration = 12;
      }
      messages.push(message);
    }
    AuroraIController.insertMessagesToTop(messages);
    if (Platform.OS === 'android') {
      this.refs.MessageList.refreshComplete();
    }
  };

  // 发送文本消息
  onSendText = (text) => {
    const message = constructNormalMessage();
    message.msgType = 'text';
    message.text = text;
    const messages = [];
    Http.send({
      contentType: 1,
      formId: this.props.route.params.fromId,
      message: text,
      msgType: 1,
      toId: this.props.route.params.toId,
    }).then((res) => {
      if (res.status === 200) {
        AuroraIController.appendMessages([message]);
      }
    });
  };

  onTakePicture = (media) => {
    console.log('media ' + JSON.stringify(media));
    var message = constructNormalMessage();
    message.msgType = 'image';
    message.mediaPath = media.mediaPath;
    AuroraIController.appendMessages([message]);
    this.resetMenu();
    AuroraIController.scrollToBottom(true);
  };

  onStartRecordVoice = (e) => {
    console.log('on start record voice');
  };

  onFinishRecordVoice = (mediaPath, duration) => {
    var message = constructNormalMessage();
    message.msgType = 'voice';
    message.mediaPath = mediaPath;
    message.timeString = 'safsdfa';
    message.duration = duration;
    AuroraIController.appendMessages([message]);
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
    Alert.alert('fas', JSON.stringify(mediaFiles));
    mediaFiles.forEach((v, i) => {
      var message = constructNormalMessage();
      if (v.mediaType === 'image') {
        message.msgType = 'image';
        message.status = 'send_going';
        message.mediaPath = v.mediaPath;
        AuroraIController.appendMessages([message]);
        AuroraIController.scrollToBottom(true);
        // Http.upimg(
        //   {
        //     file: {
        //       msg_type: 2,
        //       url: v.mediaPath,
        //       size: v.size,
        //       height: v.height,
        //       width: v.width,
        //     },
        //   },
        //   '',
        //   true,
        //   {
        //     contentType: 2,
        //     msgType: 1,
        //     toId: this.props.route.params.toId,
        //   },
        // ).then((res) => {
        //   console.log(res);
        //   if (res.status === 200) {
        //     alert('发送成功');
        AuroraIController.updateMessage({
          ...message,
          status: 'send_succeed',
        });
        // } else {
        //   alert('发送失败');
        // }
        // });
      } else {
        message.msgType = 'video';
        message.duration = v.duration;
        message.status = 'send_going';
        AuroraIController.appendMessages([message]);
        AuroraIController.scrollToBottom(true);
      }
      // message.timeString = '8:00';
    });

    this.resetMenu();
  };

  onSwitchToMicrophoneMode = () => {
    AuroraIController.scrollToBottom(true);
  };

  onSwitchToEmojiMode = () => {
    AuroraIController.scrollToBottom(true);
  };
  onSwitchToGalleryMode = () => {
    AuroraIController.scrollToBottom(true);
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
          <Button
            style={styles.sendCustomBtn}
            title={this.props.route.params.nickName}
            onPress={() => {
              if (Platform.OS === 'ios') {
                var message = constructNormalMessage();
                message.msgType = 'custom';
                message.content = `
                <h5>This is a custom message. </h5>
                <img src="file://${RNFS.MainBundlePath}/default_header.png"/>
                `;
                console.log(message.content);
                message.contentSize = { height: 100, width: 200 };
                message.extras = { extras: 'fdfsf' };
                AuroraIController.appendMessages([message]);
                AuroraIController.scrollToBottom(true);
              } else {
                const message = constructNormalMessage();
                message.msgType = 'custom';
                message.msgId = '10';
                message.status = 'send_going';
                message.isOutgoing = true;
                message.content = `
                <body bgcolor="#ff3399">
                  <h5>This is a custom message. </h5>
                  <img src="/storage/emulated/0/XhsEmoticonsKeyboard/Emoticons/wxemoticons/icon_040_cover.png"></img>
                </body>`;
                message.contentSize = { height: 100, width: 200 };
                message.extras = { extras: 'fdfsf' };
                var user = {
                  userId: '1',
                  displayName: '',
                  avatarPath: '',
                };
                user.displayName = '0001';
                user.avatarPath = 'ironman';
                message.fromUser = user;
                AuroraIController.appendMessages([message]);
              }
            }}
          />
        </View>
        <MessageListView
          style={this.state.messageListLayout}
          ref="MessageList"
          isAllowPullToRefresh={true}
          onAvatarClick={this.onAvatarClick}
          onMsgClick={this.onMsgClick}
          onStatusViewClick={this.onStatusViewClick}
          onTouchMsgList={this.onTouchMsgList}
          onTapMessageCell={this.onTapMessageCell}
          onBeginDragMessageList={this.onBeginDragMessageList}
          onPullToRefresh={this.onPullToRefresh}
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
          showSelectAlbumBtn={true}
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
  },
  inputView: {
    backgroundColor: 'green',
    width: window.width,
    height: 100,
  },
  btnStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3e83d7',
    borderRadius: 8,
    backgroundColor: '#3e83d7',
  },
});
export default TestRNIMUI;

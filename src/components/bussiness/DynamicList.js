import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { pxToDp } from '../../utils/pxToDp';
import Avatar from '../common/Avatar';
import { fontStyle } from '../../utils/StyleUtils';
import Icon from '../common/Icon';

class DynamicList extends React.Component {
  static navigationOptions = { title: null };
  constructor(props) {
    super(props);
    this.state = {
      CollectionNum: props.CollectionNum,
      CommentNum: props.CommentNum,
      FabulousNum: props.FabulousNum,
      //是否关注
      isFollow: false,
      //是否喜欢
      isLove: false,
      //是否点赞
      isLike: false,
    };
  }
  static propTypes = {
    AvatarImage: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    DynamicListImages: PropTypes.array,
    DynamicUserName: PropTypes.string,
    DynamicText: PropTypes.string,
    DynamicLabel: PropTypes.array,
    CollectionNum: PropTypes.number,
    CommentNum: PropTypes.number,
    FabulousNum: PropTypes.number,
    timeGo: PropTypes.string,
    DynamicPhone: PropTypes.string,
    isFollowProps: PropTypes.bool,
  };

  static defaultProps = {
    DynamicUserName: '阿甘',
    DynamicText:
      '宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，宋老狗，',
    DynamicLabelLists: ['突发奇想', '宋老狗'],
    CollectionNum: 700,
    CommentNum: 665,
    FabulousNum: 664,
    timeGo: '一分钟',
    DynamicPhone: 'One Plus 7T',
    isFollowProps: false,
  };
  render() {
    const {
      DynamicListImages,
      DynamicUserName,
      DynamicText,
      DynamicLabelLists,
      timeGo,
      DynamicPhone,
    } = this.props;
    const { CollectionNum, CommentNum, FabulousNum, isFollow } = this.state;

    return (
      <View style={styles.DynamicList_box}>
        {/*上部开始*/}
        <View style={styles.DynamicList_top}>
          {/*用户信息，和关注按钮*/}
          <View>
            <View style={styles.Avatar_box}>
              <Avatar size={80} />
            </View>
          </View>
          <View style={styles.Avatar_right}>
            <Text style={styles.Avatar_name}>{DynamicUserName}</Text>
            <Text style={styles.Avatar_phone}>{DynamicPhone}在线</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={this.changFollowBtn}>
            {isFollow ? (
              <View style={styles.Avatar_followBox}>
                <Text style={styles.Avatar_followText}>已关注</Text>
              </View>
            ) : (
              <View style={styles.Avatar_unfollowBox}>
                <Text style={styles.Avatar_unfollowText}>关注</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/*上部结束*/}
        {/*动态文本开始*/}
        <View style={styles.Dynamic_TextBox}>
          <Text style={styles.Dynamic_TextText}>{DynamicText}</Text>
        </View>
        {/*动态文本结束*/}
        {/*动态图片开始*/}
        <View style={styles.DynamicImagesBox}>
          <Image
            source={require('../../asserts/images/DynamicImages.png')}
            style={styles.DynamicImage}
          />
          <Image
            source={require('../../asserts/images/DynamicImages.png')}
            style={styles.DynamicImage}
          />
          <Image
            source={require('../../asserts/images/DynamicImages.png')}
            style={styles.DynamicImage}
          />
          <Image
            source={require('../../asserts/images/DynamicImages.png')}
            style={styles.DynamicImage}
          />
        </View>
        {/*动态图片结束*/}

        {/*动态标签开始*/}
        <View style={styles.LabelBox}>
          {DynamicLabelLists.map((i, v) => {
            return <DynamicLabel text={DynamicLabelLists[v]} />;
          })}
        </View>
        {/*动态标签结束*/}
        {/*收藏点赞评论和发布时间开始*/}
        <View style={styles.Icon_Box}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.IconStyle}
            onPress={() => this.changeCollectionNum()}
          >
            <Icon
              name={'love'}
              style={{
                marginRight: pxToDp(19),
                color: this.state.isLove ? '#FE9E0EFF' : '#D4D9E1FF',
              }}
            />
            <Text style={styles.IconFont}>{CollectionNum}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.IconStyle}
            onPress={() => this.changeCommentNum()}
          >
            <Icon
              name={'consult'}
              style={{ marginRight: pxToDp(19), color: '#D4D9E1FF' }}
            />
            <Text style={styles.IconFont}>{CommentNum}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.IconStyle}
            onPress={() => this.changeFabulousNum()}
          >
            <Icon
              name={'like2'}
              style={{
                marginRight: pxToDp(19),
                color: this.state.isLike ? '#FE9E0EFF' : '#D4D9E1FF',
              }}
            />
            <Text style={styles.IconFont}>{FabulousNum}</Text>
          </TouchableOpacity>
          <Text style={styles.timeAgo}>{timeGo}以前</Text>
        </View>
        {/*收藏点赞评论和发布时间结束*/}
      </View>
    );
  }
  //点爱心
  changeCollectionNum = () => {
    if (!this.state.isLove) {
      this.setState({ CollectionNum: this.state.CollectionNum + 1 });
      this.setState({
        isLove: true,
      });
    } else {
      this.setState({ CollectionNum: this.state.CollectionNum - 1 });
      this.setState({
        isLove: false,
      });
    }
  };
  //点评论
  changeCommentNum = () => {
    this.setState({ CommentNum: this.state.CommentNum + 1 });
  };
  //点棒棒
  changeFabulousNum = () => {
    if (!this.state.isLike) {
      this.setState({ FabulousNum: this.state.FabulousNum + 1 });
      this.setState({
        isLike: true,
      });
    } else {
      this.setState({ FabulousNum: this.state.FabulousNum - 1 });
      this.setState({
        isLike: false,
      });
    }
  };

  // 关注按钮
  changFollowBtn = () => {
    this.setState({ isFollow: !this.state.isFollow });
  };
}

const styles = StyleSheet.create({
  DynamicList_box: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingBottom: pxToDp(40),
    height: pxToDp(880),
  },
  DynamicList_top: {
    width: pxToDp(690),
    height: pxToDp(80),
    flexDirection: 'row',
    alignItems: 'center',
  },
  Avatar_box: {
    width: pxToDp(80),
    height: pxToDp(80),
    backgroundColor: 'red',
    borderRadius: pxToDp(40),
  },
  Avatar_right: {
    marginLeft: pxToDp(24),
  },
  Avatar_name: {
    marginTop: pxToDp(15),
    ...fontStyle(30, 38, 38, 'bold', '#333333FF'),
  },
  Avatar_phone: {
    marginTop: pxToDp(16),
    ...fontStyle(24, 27, 27, 'normal', '#999999FF'),
  },
  Avatar_followBox: {
    width: pxToDp(130),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    borderColor: '#FE9E0EFF',
    borderStyle: 'solid',
    borderWidth: pxToDp(1),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: pxToDp(275),
    backgroundColor: '#FE9E0EFF',
  },
  Avatar_unfollowBox: {
    width: pxToDp(130),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    borderColor: '#FE9E0EFF',
    borderStyle: 'solid',
    borderWidth: pxToDp(1),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: pxToDp(275),
  },
  Avatar_followText: {
    ...fontStyle(28, 40, 40, 'bold', 'white'),
  },

  Avatar_unfollowText: {
    ...fontStyle(28, 40, 40, 'bold', '#FE9E0EFF'),
  },
  Dynamic_TextBox: {
    width: pxToDp(688),
    marginTop: pxToDp(28),
    display: 'flex',
  },
  Dynamic_TextText: {
    ...fontStyle(26, 100, 44, 'normal', '#666666FF'),
  },
  DynamicImagesBox: {
    width: pxToDp(690),
    height: pxToDp(450),
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  DynamicImage: {
    width: pxToDp(210),
    height: pxToDp(210),
    marginTop: pxToDp(20),
  },
  LabelBox: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: pxToDp(23),
    marginLeft: pxToDp(-10),
  },
  Icon_Box: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    // marginLeft: pxToDp(30),
    marginTop: pxToDp(31),
    position: 'relative',
    width: pxToDp(688),
    borderBottomColor: '#dddddd',
    borderBottomWidth: pxToDp(1),
    paddingBottom: pxToDp(40),
    marginBottom: pxToDp(46),
  },
  IconStyle: { marginRight: pxToDp(49), flexDirection: 'row' },
  IconFont: {
    ...fontStyle(24, 26, 26, 'normal', '#989CA7FF'),
  },
  timeAgo: {
    ...fontStyle(24, 26, 26, 'normal', '#A5A8ADFF'),
    position: 'absolute',
    right: pxToDp(0),
  },
});

export default DynamicList;

//动态的标签小组件
class DynamicLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: '设计领悟',
  };
  render() {
    const { text } = this.props;
    return (
      <View style={{ marginRight: pxToDp(20) }}>
        <View
          style={{
            width: pxToDp(160),
            height: pxToDp(46),
            backgroundColor: '#E6FCF5FF',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: pxToDp(23),
          }}
        >
          <Text style={{ ...fontStyle(22, 24, 24, 'normal', '#33D5A0FF') }}>
            # {text}
          </Text>
        </View>
      </View>
    );
  }
}

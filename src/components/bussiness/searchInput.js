import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import Icon from '../common/Icon';
import { pxToDp } from '../../utils/pxToDp';

// style 样式
//onChangeText
//onSubmitEditing 提交方法
//value值

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { value } = this.props;
    return (
      <View
        style={{
          width: pxToDp(484),
          height: pxToDp(74),
          backgroundColor: '#f7f8f9',
          position: 'relative',
          ...this.props.style,
        }}
      >
        <TextInput
          onFocus={this.props.onFocus}
          onChangeText={this.props.onChangeText}
          onSubmitEditing={this.props.onSubmitEditing}
          value={value}
          placeholder="请输入您要搜索的内容"
          placeholderTextColor="#999999"
          style={{ fontSize: pxToDp(24), paddingLeft: pxToDp(60) }}
        />
        <Icon
          name="search"
          style={{
            fontSize: pxToDp(22),
            position: 'absolute',
            top: pxToDp(20),
            left: pxToDp(22),
            color: '#999999',
          }}
        />
      </View>
    );
  }
}

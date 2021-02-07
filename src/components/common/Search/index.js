import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { pxToDp } from '../../../utils/pxToDp';
import Icon from '../../common/Icon';
export class index extends Component {
  static propTypes = {
    onEndEditing: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  state = {
    txt: '',
  };
  setTxt = (txt) => {
    this.setState({ txt });
    this.props.callBack(txt);
  };
  render() {
    const { onPress, onEndEditing } = this.props;
    return (
      <View style={styles.border}>
        <TouchableOpacity onPress={onPress}>
          <Icon
            name="back"
            style={{
              marginTop: pxToDp(106),
            }}
          />
        </TouchableOpacity>

        <View style={{ marginLeft: pxToDp(30) }}>
          <TextInput
            onEndEditing={onEndEditing}
            onChangeText={this.setTxt.bind(this)}
            placeholder="请输入搜索的关键词"
            style={styles.input}
          />
          <Icon
            name="search2"
            style={{
              fontSize: pxToDp(22),
              position: 'absolute',
              top: pxToDp(108),
              right: pxToDp(32),
            }}
          />
        </View>
        <View />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  border: {
    width: '100%',
    backgroundColor: '#FFF',
    height: pxToDp(160),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  input: {
    marginTop: pxToDp(90),
    height: pxToDp(62),
    width: pxToDp(630),
    borderRadius: pxToDp(30),
    backgroundColor: '#F5F5F5',
    fontSize: pxToDp(28),
    paddingVertical: 0,
    paddingLeft: pxToDp(39),
    paddingTop: pxToDp(10),
    paddingBottom: pxToDp(10),
  },
});
export default index;

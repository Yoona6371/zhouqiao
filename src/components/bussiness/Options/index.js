import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../common/Icon';
import { file } from '../../../constants/svg';
import Svg from 'react-native-svg-uri';
import { pxToDp } from '../../../utils/pxToDp';

class Index extends Component {
  constructor(props) {
    super(props);
  }
  static PropTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    svg: PropTypes.string,
    text_left: PropTypes.string,
    text_right: PropTypes.string,
    text: PropTypes.string,
  };
  render() {
    let { type, title, text_left, text_right, svg, text, style } = this.props;
    return (
      <View
        style={
          type == 2
            ? [styles.options__wrap, style]
            : [styles.options__wrap, styles.options__line, style]
        }
      >
        {type === 0 ? (
          <View style={styles.options}>
            <View style={{ alignSelf: 'center' }}>
              <Svg svgXmlData={file} width={pxToDp(43)} height={pxToDp(53)} />
            </View>
            <View style={styles.center}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.transcript}>
                <Text style={styles.transcript_text}>{text_left}</Text>
                <Text style={styles.transcript_line}>|</Text>
                <Text style={styles.transcript_text}>{text_right}</Text>
              </View>
            </View>
          </View>
        ) : type === 1 ? (
          <View style={styles.options}>
            <View style={{ alignSelf: 'center' }}>
              <Svg svgXmlData={svg} />
            </View>
            <Text style={styles.title_type02}>{title}</Text>
          </View>
        ) : (
          <View style={styles.options}>
            <View style={{ alignSelf: 'center' }}>
              <Svg svgXmlData={svg} width={pxToDp(74)} height={pxToDp(74)} />
            </View>
            <View style={styles.center_type03}>
              <Text style={styles.title_type03}>{title}</Text>
              <Text style={styles.transcript_text_type03}>{text}</Text>
            </View>
          </View>
        )}
        <View style={styles.options}>
          {type == 1 ? <Text style={styles.more}>去完善</Text> : <></>}
          <Icon
            name={'more'}
            width={pxToDp(16)}
            height={pxToDp(27)}
            style={styles.more_icon}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  options__wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: pxToDp(30),
    height: pxToDp(138),
    backgroundColor: '#ffffff',
  },
  options__line: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: pxToDp(1),
  },
  options: {
    flexDirection: 'row',
  },
  more: {
    lineHeight: pxToDp(138),
    fontSize: pxToDp(24),
    color: '#999999',
    marginRight: pxToDp(23),
  },
  more_icon: {
    lineHeight: pxToDp(138),
    color: '#999999',
    marginRight: pxToDp(30),
  },
  center: {
    marginLeft: pxToDp(40),
    alignSelf: 'center',
  },
  center_type03: {
    marginLeft: pxToDp(30),
    alignSelf: 'center',
  },
  title: {
    color: '#333333',
    fontSize: pxToDp(30),
    fontWeight: 'bold',
  },
  title_type02: {
    color: '#333333',
    fontSize: pxToDp(28),
    fontWeight: 'bold',
    marginLeft: pxToDp(25),
    alignSelf: 'center',
  },
  title_type03: {
    color: '#333333',
    fontSize: pxToDp(34),
    fontWeight: 'bold',
  },
  transcript: {
    flexDirection: 'row',
    lineHeight: pxToDp(18),
  },
  transcript_text: {
    marginTop: pxToDp(10),
    color: '#888888',
    fontSize: pxToDp(24),
  },
  transcript_text_type03: {
    marginTop: pxToDp(5),
    fontSize: pxToDp(26),
    color: '#999999',
  },
  transcript_line: {
    color: '#e5e5e5',
    fontSize: pxToDp(24),
    marginLeft: pxToDp(29),
    marginRight: pxToDp(30),
  },
});
export default Index;

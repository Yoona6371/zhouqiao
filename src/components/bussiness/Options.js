import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../common/Icon';
import { file } from '../../constants/svg';
import Svg from 'react-native-svg-uri';
import { pxToDp } from '../../utils/pxToDp';
import { fontStyle } from '../../utils/StyleUtils';
import LinearGradient from 'react-native-linear-gradient';

class Index extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    svg: PropTypes.string,
    text_left: PropTypes.string,
    text_right: PropTypes.string,
    text: PropTypes.string,
    router: PropTypes.string,
    navigation: PropTypes.object.isRequired,
    colors: PropTypes.array,
  };
  render() {
    let {
      type,
      title,
      text_left,
      text_right,
      svg,
      text,
      text_more,
      colors,
      style,
    } = this.props;
    return (
      <TouchableOpacity
        style={
          type === 2 ? { backgroundColor: '#fff', marginTop: pxToDp(20) } : {}
        }
        onPress={() => {
          this.props.navigation.navigate('Tabbar');
        }}
      >
        <View
          style={
            type === 2
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
                <Svg svgXmlData={svg} width={pxToDp(30)} height={pxToDp(30)} />
              </View>
              <Text style={styles.title_type02}>{title}</Text>
            </View>
          ) : (
            <View style={styles.options}>
              <View style={{ alignSelf: 'center' }}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={colors}
                  style={styles.linear}
                >
                  <Icon
                    name={svg}
                    width={pxToDp(74)}
                    height={pxToDp(74)}
                    style={styles.svg_type03}
                  />
                </LinearGradient>
              </View>
              <View style={styles.center_type03}>
                <Text style={styles.title_type03}>{title}</Text>
                <Text style={styles.transcript_text_type03}>{text}</Text>
              </View>
            </View>
          )}
          <View style={styles.options}>
            {type === 1 ? <Text style={styles.more}>{text_more}</Text> : <></>}
            <Icon
              name={'more'}
              width={pxToDp(16)}
              height={pxToDp(27)}
              style={styles.more_icon}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  options__wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: pxToDp(138),
    marginLeft: pxToDp(30),
  },
  options__line: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: pxToDp(1),
  },
  options: {
    flexDirection: 'row',
  },
  svg_type03: {
    color: '#fff',
    alignSelf: 'center',
    lineHeight: pxToDp(74),
  },
  linear: {
    width: pxToDp(74),
    height: pxToDp(74),
    borderRadius: pxToDp(37),
  },
  more: {
    lineHeight: pxToDp(138),
    marginRight: pxToDp(23),
    ...fontStyle(24, 138, 138, '500', '#999999', 'right'),
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
    ...fontStyle(30, 32, 32, 'bold', '#333333', 'left'),
    maxWidth: pxToDp(580),
  },
  title_type02: {
    maxWidth: pxToDp(500),
    color: '#333333',
    fontSize: pxToDp(28),
    fontWeight: 'bold',
    marginLeft: pxToDp(25),
    alignSelf: 'center',
    ...fontStyle(28, 30, 30, 'bold', '#333'),
  },
  title_type03: {
    ...fontStyle(34, 34, 36, 'bold', '#333'),
    maxWidth: pxToDp(550),
  },
  transcript: {
    flexDirection: 'row',
    lineHeight: pxToDp(18),
    marginTop: pxToDp(5),
  },
  transcript_text: {
    marginTop: pxToDp(10),
    ...fontStyle(24, 26, 26, 'bold', '#888888'),
  },
  transcript_text_type03: {
    marginTop: pxToDp(5),
    ...fontStyle(26, 34, 28, '500', '#999999'),
    maxWidth: pxToDp(550),
  },
  transcript_line: {
    color: '#e5e5e5',
    fontSize: pxToDp(24),
    marginLeft: pxToDp(29),
    marginRight: pxToDp(30),
  },
});
export default Index;

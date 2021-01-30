import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../common/Icon';
import { pxToDp } from '../../utils/pxToDp';
import PropTypes from 'prop-types';
import { fontStyle } from '../../utils/StyleUtils';

class Index extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    router: PropTypes.string,
    rightRemove: PropTypes.bool,
    IconRempve: PropTypes.bool,
  };
  press = () => {
    this.props.navigation.navigate('Index');
  };
  render() {
    return (
      <View style={this.props.style}>
        <View style={styles.container__wrap}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.title}>
              <Text style={styles.title_text}>{this.props.title}</Text>
            </View>
            <Icon
              style={
                this.props.iconRemove ? { display: 'none' } : { ...styles.icon }
              }
              name={'container_icon'}
            />
          </View>
          <TouchableOpacity
            style={this.props.rightRemove ? { display: 'none' } : {}}
            onPress={this.press}
          >
            <Icon name={'right2'} width={pxToDp(32)} height={pxToDp(20)} />
          </TouchableOpacity>
        </View>
        <View style={styles.children}>{this.props.children}</View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container__wrap: {
    marginLeft: pxToDp(30),
    marginRight: pxToDp(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  title: {
    alignItems: 'center',
    height: pxToDp(34),
  },
  title_text: {
    ...fontStyle(36, 34, 38, '600', '#1c2439', 'left'),
  },
  icon: {
    color: '#fe9e0e',
    marginLeft: pxToDp(10),
    fontSize: pxToDp(10),
    lineHeight: pxToDp(35),
  },
  children: {
    marginLeft: pxToDp(30),
    marginRight: pxToDp(30),
  },
});

export default Index;

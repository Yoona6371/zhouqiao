import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Icon from '../common/Icon';
import { pxToDp } from '../../utils/pxToDp';
import PropTypes from 'prop-types';

class Index extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    router: PropTypes.string.isRequired,
  };
  press = () => {
    this.props.navigation.navigate(this.props.router);
  };
  render() {
    return (
      <View style={this.props.stle}>
        <TouchableOpacity onPress={this.press} style={styles.container__wrap}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.title}>
              <Text>{this.props.title}</Text>
            </View>
            <Icon style={styles.icon} name={'container_icon'} />
          </View>
          <View>
            <Text>··></Text>
          </View>
        </TouchableOpacity>
        <View style={styles.children}>{this.props.children}</View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container__wrap: {
    marginLeft: pxToDp(30),
    marginRight: pxToDp(30),
    marginBottom: pxToDp(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    height: pxToDp(35),
    alignItems: 'center',
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
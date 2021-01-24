import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { pxToDp } from '../../utils/pxToDp';

class Index extends Component {
  constructor(props) {
    super(props);
  }
  onLeft = () => {};
  onRight = () => {};
  render() {
    let str = '<··';
    return (
      <View style={styles.pagination__wrap}>
        <TouchableOpacity onPress={this.onLeft} style={styles.pagination}>
          <Text>{str}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onRight} style={styles.pagination}>
          <Text>··></Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  pagination__wrap: {
    marginLeft: pxToDp(295),
    marginRight: pxToDp(295),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pagination: {
    lineHeight: pxToDp(20),
  },
});
export default Index;

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { pxToDp } from '../../../utils/pxToDp';
import PropTypes from 'prop-types';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNow: 0,
    };
  }
  static PropTypes = {
    pages: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
  };
  onLeft = () => {
    let pages = this.props.pages;
    if (this.state.pageNow === 0) {
      this.props.navigation.navigate(pages[pages.length - 1].name);
      this.setState({
        pageNow: pages.length - 1,
      });
      return;
    }
    this.props.navigation.navigate(pages[this.state.pageNow - 1].name);
    this.setState({
      pageNow: --this.state.pageNow,
    });
  };
  onRight = () => {
    let pages = this.props.pages;
    if (this.state.pageNow === pages.length - 1) {
      this.props.navigation.navigate(pages[0].name);
      this.setState({
        pageNow: 0,
      });
      return;
    }
    this.props.navigation.navigate(pages[this.state.pageNow + 1].name);
    this.setState({
      pageNow: ++this.state.pageNow,
    });
  };
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

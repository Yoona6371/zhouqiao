import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import PropTypes from 'prop-types';
import Icon from '../common/Icon';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNow: 0,
    };
  }
  static propTypes = {
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
    return (
      <View style={styles.pagination__wrap}>
        <TouchableOpacity onPress={this.onLeft} style={styles.pagination}>
          <Icon
            name={'left2'}
            width={pxToDp(30)}
            height={pxToDp(21)}
            color="#1b2439"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onRight} style={styles.pagination}>
          <Icon
            name={'right2'}
            width={pxToDp(30)}
            height={pxToDp(21)}
            color="#1b2439"
          />
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

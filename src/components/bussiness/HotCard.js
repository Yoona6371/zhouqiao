import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import { like } from '../../constants/svg';
import { pxToDp } from '../../utils/pxToDp';
import {
  fontStyle,
  padding,
  flexRowCenter,
  flexRowSpb,
} from '../../utils/StyleUtils';
import { activeOpacity } from '../../constants/config';

class HotCard extends Component {
  static propTypes = {
    item: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      imageUri: this.props.item.cover,
      title: this.props.item.case_name,
      number: this.props.item.purchase_num,
    };
  }

  render() {
    const { imageUri, title, number } = this.state;
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={() => this.handleClick()}
        style={styles.HotCard__wrap}
      >
        <View style={styles.HotCard__container}>
          <View style={styles.HotCard__left}>
            <Text style={styles.HotCardTitle}>{title}</Text>
            <View style={styles.HotCard__leftFooter}>
              <SvgUri
                svgXmlData={like}
                width={pxToDp(24)}
                height={pxToDp(28)}
              />
              <Text style={styles.leftFooter__Text}>{number}</Text>
            </View>
          </View>
          <Image source={{ uri: imageUri }} style={styles.HotCard__right} />
        </View>
      </TouchableOpacity>
    );
  }
  handleClick() {
    NavigationHelper.navigate('CommodityDetail', {
      caseId: this.props.item.case_id,
    });
  }
}

const styles = StyleSheet.create({
  HotCard__wrap: {
    width: pxToDp(420),
    height: pxToDp(150),
    marginLeft: pxToDp(30),
    marginBottom: pxToDp(50),
    marginTop: pxToDp(30),
    ...padding(24, 12, 12, 20),
    borderRadius: pxToDp(10),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  HotCard__container: {
    ...flexRowSpb,
    alignItems: 'stretch',
  },
  HotCardTitle: {
    width: pxToDp(231),
    paddingTop: pxToDp(8),
    ...fontStyle(28, 74, 36, '400', '#333', 'left'),
    overflow: 'hidden',
    textAlignVertical: 'top',
  },
  HotCard__left: {
    width: pxToDp(200),
    justifyContent: 'space-between',
  },
  HotCard__leftFooter: {
    ...flexRowCenter,
    justifyContent: 'flex-start',
  },
  leftFooter__Text: {
    ...fontStyle(26, 40, 40, '400', '#999', 'left'),
    marginLeft: pxToDp(14),
    overflow: 'hidden',
  },
  HotCard__right: {
    width: pxToDp(126),
    height: pxToDp(126),
    borderRadius: pxToDp(10),
    backgroundColor: '#171717',
  },
});

export default HotCard;

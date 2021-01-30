import React, { Component } from 'react';
import {
  ScrollView,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { deviceWidthDp, pxToDp } from '../../../utils/pxToDp';
import SliderEntry from './SliderEntry';

const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F03%2F20190203161419_yerng.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614417723&t=5907bf967350d3d3230702a176ec8381',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F03%2F20190203161419_yerng.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614417723&t=5907bf967350d3d3230702a176ec8381',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F03%2F20190203161419_yerng.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614417723&t=5907bf967350d3d3230702a176ec8381',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F03%2F20190203161419_yerng.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614417723&t=5907bf967350d3d3230702a176ec8381',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F03%2F20190203161419_yerng.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614417723&t=5907bf967350d3d3230702a176ec8381',
  },
  {
    title: 'Middle Earth, Germany',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F03%2F20190203161419_yerng.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614417723&t=5907bf967350d3d3230702a176ec8381',
  },
];
const SLIDER_1_FIRST_ITEM = 0;

export default class MyCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

  layoutExample(type) {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={styles.exampleContainer}>
        <Carousel
          ref={(c) => (this._slider1Ref = c)}
          data={ENTRIES1}
          renderItem={this._renderItem}
          sliderWidth={deviceWidthDp}
          sliderHeight={pxToDp(320)}
          itemWidth={pxToDp(660)}
          itemHeight={pxToDp(320)}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          activeSlideAlignment={'start'}
          layout={type}
          loop={true}
          autoplay={true}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotContainerStyle={styles.dotContainerStyle}
          dotColor={'#FE9E0E'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={'#DDDDDD'}
          inactiveDotOpacity={0.4} // 不活动点的不透明度效果的值
          inactiveDotScale={0.6} // 比例 变换的值应用于无效点
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }

  render() {
    const example3 = this.layoutExample('stack');

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example3}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  exampleContainer: {
    width: deviceWidthDp,
  },
  paginationContainer: {
    height: 15,
  },
  paginationDot: {
    width: 16,
    height: 4,
  },
});

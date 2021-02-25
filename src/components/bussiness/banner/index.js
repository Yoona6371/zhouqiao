import React, { PureComponent } from 'react';
import {
  ScrollView,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';
import { deviceWidthDp, pxToDp } from '../../../utils/pxToDp';

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

export default class MyCarousel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }

  static propTypes = {
    type: PropTypes.number,
  };
  static defaultProps = {
    type: 1,
    slideList: ENTRIES1,
  };

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={false} type={1} />;
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        type={2}
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  layoutExample(type) {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={styles.exampleContainer}>
        <Carousel
          ref={(c) => (this._slider1Ref = c)}
          data={this.props.slideList}
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
          loopClonesPerSide={this.props.slideList.length}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
        />
      </View>
    );
  }

  mainExample(number) {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={{ ...styles.exampleContainer, width: pxToDp(691) }}>
        <Carousel
          ref={(c) => (this._slider1Ref = c)}
          data={this.props.slideList}
          renderItem={this._renderItemWithParallax}
          sliderWidth={pxToDp(691)}
          sliderHeight={pxToDp(361)}
          itemWidth={pxToDp(691)}
          itemHeight={pxToDp(361)}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          autoplay={true}
          loopClonesPerSide={this.props.slideList.length}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={this.props.slideList.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer2}
          dotColor={'#FE9E0E'}
          dotContainerStyle={{ padding: 0 }}
          dotStyle={styles.paginationDot2}
          inactiveDotColor={'#DDDDDD'}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {this.props.type === 1
              ? this.layoutExample('stack')
              : this.mainExample(1)}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  exampleContainer: {
    width: deviceWidthDp,
    position: 'relative',
  },
  paginationContainer: {
    height: 15,
  },
  paginationDot: {
    width: 16,
    height: 4,
    margin: pxToDp(10),
  },
  paginationContainer2: {
    position: 'absolute',
    zIndex: 10,
    bottom: pxToDp(30),
    right: pxToDp(0),
    height: 15,
  },
  paginationDot2: {
    width: pxToDp(10),
    height: pxToDp(10),
    margin: pxToDp(8),
  },
});
